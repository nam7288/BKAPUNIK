package nl.xservices.plugins.accessor;

import android.Manifest;
import android.accounts.Account;
import android.accounts.AccountManager;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.provider.CalendarContract;
import android.support.v4.app.ActivityCompat;
import android.text.TextUtils;
import android.util.Log;

import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONArray.*;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.*;

import static android.provider.CalendarContract.Events;
import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;

import android.provider.CalendarContract.Instances;

public abstract class AbstractCalendarAccessor {

  public static final String LOG_TAG = "Calendar";
  public static final String CONTENT_PROVIDER = "content://com.android.calendar";
  public static final String CONTENT_PROVIDER_PRE_FROYO = "content://calendar";

  public static final String CONTENT_PROVIDER_PATH_CALENDARS = "/calendars";
  public static final String CONTENT_PROVIDER_PATH_EVENTS = "/events";
  public static final String CONTENT_PROVIDER_PATH_REMINDERS = "/reminders";
  public static final String CONTENT_PROVIDER_PATH_INSTANCES_WHEN = "/instances/when";
  public static final String CONTENT_PROVIDER_PATH_ATTENDEES = "/attendees";

  protected static class Event {
    String id;
    String event_id;
    String original_id;
    String original_sync_id;
    String message;
    String location;
    String title;
    String startDate;
    String endDate;
    String recurrenceFreq;
    String recurrenceInterval;
    String recurrenceWeekstart;
    String recurrenceByDay;
    String recurrenceByMonthDay;
    String recurrenceUntil;
    String recurrenceCount;
    String reminder;
    String canModify;
    String availability;
    String duration;
    String access_level;
    String calendar_id;
    //attribute DOMString status;
    // attribute DOMString transparency;
    // attribute CalendarRepeatRule recurrence;
    // attribute DOMString reminder;

    String eventId;
    boolean recurring = false;
    boolean allDay;
    ArrayList<Attendee> attendees;

    public JSONObject toJSONObject() {
      JSONObject obj = new JSONObject();
      try {
        obj.put("id", this.eventId);
        obj.putOpt("message", this.message);
        obj.putOpt("location", this.location);
        obj.putOpt("title", this.title);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        sdf.setTimeZone(TimeZone.getDefault());
        if (this.startDate != null) {
          obj.put("startDate", sdf.format(new Date(Long.parseLong(this.startDate))));
        }
        if (this.endDate != null) {
          obj.put("endDate", sdf.format(new Date(Long.parseLong(this.endDate))));
        }
        obj.put("allday", this.allDay);
        obj.put("reminder", this.reminder);
        obj.put("original_id", this.original_id);
        obj.put("canModify", this.canModify);
        obj.put("availability", this.availability);
        obj.put("original_sync_id", this.original_sync_id);
        obj.put("duration", this.duration);
        obj.put("event_id", this.event_id);
        obj.put("eventId", this.eventId);
        obj.put("access_level", this.access_level);
        obj.put("calendar_id", this.calendar_id);
        if (this.attendees != null) {
          JSONArray arr = new JSONArray();
          for (Attendee attendee : this.attendees) {
            arr.put(attendee.toJSONObject());
          }
          obj.put("attendees", arr);
        }
        if (this.recurring) {
          JSONObject objRecurrence = new JSONObject();

          objRecurrence.putOpt("freq", this.recurrenceFreq);
          objRecurrence.putOpt("interval", this.recurrenceInterval);
          objRecurrence.putOpt("wkst", this.recurrenceWeekstart);
          objRecurrence.putOpt("byday", this.recurrenceByDay);
          objRecurrence.putOpt("bymonthday", this.recurrenceByMonthDay);
          objRecurrence.putOpt("until", this.recurrenceUntil);
          objRecurrence.putOpt("count", this.recurrenceCount);

          obj.put("recurrence", objRecurrence);
        }
      } catch (JSONException e) {
        throw new RuntimeException(e);
      }
      return obj;
    }
  }

  protected static class Attendee {
    String id;
    String name;
    String email;
    String status;

    public JSONObject toJSONObject() {
      JSONObject obj = new JSONObject();
      try {
        obj.put("id", this.id);
        obj.putOpt("name", this.name);
        obj.putOpt("email", this.email);
        obj.putOpt("status", this.status);
      } catch (JSONException e) {
        throw new RuntimeException(e);
      }
      return obj;
    }
  }

  protected CordovaInterface cordova;

  private EnumMap<KeyIndex, String> calendarKeys;

  public AbstractCalendarAccessor(CordovaInterface cordova) {
    this.cordova = cordova;
    this.calendarKeys = initContentProviderKeys();
  }

  protected enum KeyIndex {
    CALENDARS_ID,
    IS_PRIMARY,
    CALENDARS_NAME,
    CALENDARS_VISIBLE,
    CALENDARS_DISPLAY_NAME,
    CALENDAR_ACCESS_LEVEL,
    CAL_ACCESS_OWNER,
    EVENTS_ID,
    EVENTS_CALENDAR_ID,
    EVENTS_DESCRIPTION,
    EVENTS_LOCATION,
    EVENTS_SUMMARY,
    EVENTS_START,
    EVENTS_END,
    EVENTS_RRULE,
    EVENTS_ALL_DAY,
    INSTANCES_ID,
    INSTANCES_EVENT_ID,
    INSTANCES_BEGIN,
    INSTANCES_END,
    ATTENDEES_ID,
    ATTENDEES_EVENT_ID,
    ATTENDEES_NAME,
    ATTENDEES_EMAIL,
    ATTENDEES_STATUS,
    GUESTS_CAN_MODIFY,
    ORIGINAL_ID,
    AVAILABILITY,
    ORIGINAL_SYNC_ID,
    DURATION,
    ACCESS_LEVEL
  }

  protected abstract EnumMap<KeyIndex, String> initContentProviderKeys();

  protected String getKey(KeyIndex index) {
    return this.calendarKeys.get(index);
  }

  protected abstract Cursor queryAttendees(String[] projection,
                                           String selection, String[] selectionArgs, String sortOrder);

  protected abstract Cursor queryCalendars(String[] projection,
                                           String selection, String[] selectionArgs, String sortOrder);

  protected abstract Cursor queryEvents(String[] projection,
                                        String selection, String[] selectionArgs, String sortOrder);

  protected abstract Cursor queryEventInstances(long startFrom, long startTo,
                                                String[] projection, String selection, String[] selectionArgs,
                                                String sortOrder);

  private Event[] fetchEventInstances(String eventId, String title, String location, String notes, long startFrom, long startTo) {
    String[] projection = {
      this.getKey(KeyIndex.INSTANCES_ID),
      this.getKey(KeyIndex.INSTANCES_EVENT_ID),
      this.getKey(KeyIndex.INSTANCES_BEGIN),
      this.getKey(KeyIndex.INSTANCES_END),
      this.getKey(KeyIndex.GUESTS_CAN_MODIFY),
      this.getKey(KeyIndex.ORIGINAL_ID),
      this.getKey(KeyIndex.AVAILABILITY),
      this.getKey(KeyIndex.ORIGINAL_SYNC_ID),
      this.getKey(KeyIndex.DURATION),
      this.getKey(KeyIndex.EVENTS_ID),
      this.getKey(KeyIndex.ACCESS_LEVEL)
    };

    String sortOrder = this.getKey(KeyIndex.INSTANCES_BEGIN) + " ASC, " + this.getKey(KeyIndex.INSTANCES_END) + " ASC";
    // Fetch events from instances table in ascending order by time.

    // filter
    String selection = "";
    List<String> selectionList = new ArrayList<String>();

    if (eventId != null) {
      selection += CalendarContract.Instances.EVENT_ID + " = ?";
      selectionList.add(eventId);
    } else {
      if (title != null) {
        //selection += Events.TITLE + "=?";
        selection += Events.TITLE + " LIKE ?";
        selectionList.add("%" + title + "%");
      }
      if (location != null && !location.equals("")) {
        if (!"".equals(selection)) {
          selection += " AND ";
        }
        selection += Events.EVENT_LOCATION + " LIKE ?";
        selectionList.add("%" + location + "%");
      }
      if (notes != null && !notes.equals("")) {
        if (!"".equals(selection)) {
          selection += " AND ";
        }
        selection += Events.DESCRIPTION + " LIKE ?";
        selectionList.add("%" + notes + "%");
      }
    }


    String[] selectionArgs = new String[selectionList.size()];

    Cursor cursor;
    ContentResolver cr = cordova.getActivity().getContentResolver();

    Uri.Builder uriBuilder = CalendarContract.Instances.CONTENT_URI.buildUpon();
    ContentUris.appendId(uriBuilder, startFrom);
    ContentUris.appendId(uriBuilder, startTo);

    Uri uri = uriBuilder.build();
    cursor = cr.query(uri, projection, selection, selectionList.toArray(selectionArgs), sortOrder);
//    Cursor cursor = queryEventInstances(startFrom, startTo, projection, selection, selectionList.toArray(selectionArgs), sortOrder);
    if (cursor == null) {
      return null;
    }
    Event[] instances = null;
    if (cursor.moveToFirst()) {
      int idCol = cursor.getColumnIndex(this.getKey(KeyIndex.INSTANCES_ID));
      int eventIdCol = cursor.getColumnIndex(this.getKey(KeyIndex.INSTANCES_EVENT_ID));
      int beginCol = cursor.getColumnIndex(this.getKey(KeyIndex.INSTANCES_BEGIN));
      int endCol = cursor.getColumnIndex(this.getKey(KeyIndex.INSTANCES_END));
      int modifyCol = cursor.getColumnIndex(this.getKey(KeyIndex.GUESTS_CAN_MODIFY));
      int original_idCol = cursor.getColumnIndex(this.getKey(KeyIndex.ORIGINAL_ID));
      int availability_idCol = cursor.getColumnIndex(this.getKey(KeyIndex.AVAILABILITY));
      int original_sync_idCol = cursor.getColumnIndex(this.getKey(KeyIndex.ORIGINAL_SYNC_ID));
      int durationCol = cursor.getColumnIndex(this.getKey(KeyIndex.DURATION));
      int eventCol = cursor.getColumnIndex(this.getKey(KeyIndex.EVENTS_ID));
      int access_levelCol = cursor.getColumnIndex(this.getKey(KeyIndex.ACCESS_LEVEL));
      int count = cursor.getCount();
      int i = 0;
      instances = new Event[count];
      do {
        // Use the startDate/endDate time from the instances table. For recurring
        // events the events table contain the startDate/endDate time for the
        // origin event (as you would expect).
        instances[i] = new Event();
        instances[i].id = cursor.getString(idCol);
        instances[i].eventId = cursor.getString(eventIdCol);
        instances[i].startDate = cursor.getString(beginCol);
        instances[i].endDate = cursor.getString(endCol);
        instances[i].canModify = cursor.getString(modifyCol);
        instances[i].original_id = cursor.getString(original_idCol);
        instances[i].availability = cursor.getString(availability_idCol);
        instances[i].original_sync_id = cursor.getString(original_sync_idCol);
        instances[i].duration = cursor.getString(durationCol);
        instances[i].event_id = cursor.getString(eventCol);
        instances[i].access_level = cursor.getString(access_levelCol);

        i += 1;
      } while (cursor.moveToNext());
    }

    // if we don't find the event by id, try again by title etc - inline with iOS logic
    if ((instances == null || instances.length == 0) && eventId != null) {
      return fetchEventInstances(null, title, location, notes, startFrom, startTo);
    } else {
      return instances;
    }
  }

  private String[] getActiveCalendarIds() {
    Cursor cursor = queryCalendars(new String[]{
        this.getKey(KeyIndex.CALENDARS_ID)
      },
      this.getKey(KeyIndex.CALENDARS_VISIBLE) + "=1", null, null);
    String[] calendarIds = null;
    if (cursor.moveToFirst()) {
      calendarIds = new String[cursor.getCount()];
      int i = 0;
      do {
        int col = cursor.getColumnIndex(this.getKey(KeyIndex.CALENDARS_ID));
        calendarIds[i] = cursor.getString(col);
        i += 1;
      } while (cursor.moveToNext());
      cursor.close();
    }
    return calendarIds;
  }

  public final JSONArray getActiveCalendars() throws JSONException {
    Cursor cursor = queryCalendars(
      new String[]{
        this.getKey(KeyIndex.CALENDARS_ID),
        this.getKey(KeyIndex.CALENDARS_NAME),
        this.getKey(KeyIndex.CALENDARS_DISPLAY_NAME),
        this.getKey(KeyIndex.IS_PRIMARY),
        this.getKey(KeyIndex.CALENDAR_ACCESS_LEVEL)
      },
      this.getKey(KeyIndex.CALENDARS_VISIBLE) + "=1", null, null
    );
    if (cursor == null) {
      return null;
    }
    JSONArray calendarsWrapper = new JSONArray();
    int primaryColumnIndex;
    if (cursor.moveToFirst()) {
      do {
        JSONObject calendar = new JSONObject();
        calendar.put("id", cursor.getString(cursor.getColumnIndex(this.getKey(KeyIndex.CALENDARS_ID))));
        calendar.put("name", cursor.getString(cursor.getColumnIndex(this.getKey(KeyIndex.CALENDARS_NAME))));
        calendar.put("displayname", cursor.getString(cursor.getColumnIndex(this.getKey(KeyIndex.CALENDARS_DISPLAY_NAME))));
        calendar.put("access_level", cursor.getString(cursor.getColumnIndex(this.getKey(KeyIndex.CALENDAR_ACCESS_LEVEL))));
        primaryColumnIndex = cursor.getColumnIndex(this.getKey((KeyIndex.IS_PRIMARY)));
        if (primaryColumnIndex == -1) {
          primaryColumnIndex = cursor.getColumnIndex("COALESCE(isPrimary, ownerAccount = account_name)");
        }
        calendar.put("isPrimary", "1".equals(cursor.getString(primaryColumnIndex)));
        calendarsWrapper.put(calendar);
      } while (cursor.moveToNext());
      cursor.close();
    }
    return calendarsWrapper;
  }

  private Map<String, Event> fetchEventsAsMap(Event[] instances, String calendarId) {
    // Only selecting from active calendars, no active calendars = no events.
    List<String> activeCalendarIds = Arrays.asList(getActiveCalendarIds());
    if (activeCalendarIds.isEmpty()) {
      return null;
    }

    List<String> calendarsToSearch;

    if (calendarId != null) {
      calendarsToSearch = new ArrayList<String>();
      if (activeCalendarIds.contains(calendarId)) {
        calendarsToSearch.add(calendarId);
      }

    } else {
      calendarsToSearch = activeCalendarIds;
    }

    if (calendarsToSearch.isEmpty()) {
      return null;
    }


    String[] projection = new String[]{
      this.getKey(KeyIndex.EVENTS_ID),
      this.getKey(KeyIndex.EVENTS_DESCRIPTION),
      this.getKey(KeyIndex.EVENTS_LOCATION),
      this.getKey(KeyIndex.EVENTS_SUMMARY),
      this.getKey(KeyIndex.EVENTS_START),
      this.getKey(KeyIndex.EVENTS_END),
      this.getKey(KeyIndex.EVENTS_RRULE),
      this.getKey(KeyIndex.EVENTS_ALL_DAY),
      this.getKey(KeyIndex.ORIGINAL_ID),
      this.getKey(KeyIndex.EVENTS_CALENDAR_ID),
      this.getKey(KeyIndex.GUESTS_CAN_MODIFY),
      Events.OWNER_ACCOUNT
    };
    // Get all the ids at once from active calendars.
    StringBuffer select = new StringBuffer();
    select.append(this.getKey(KeyIndex.EVENTS_ID) + " IN (");
    select.append(instances[0].eventId);
    for (int i = 1; i < instances.length; i++) {
      select.append(",");
      select.append(instances[i].eventId);
    }
    select.append(") AND " + this.getKey(KeyIndex.EVENTS_CALENDAR_ID) +
      " IN (");

    String prefix = "";
    for (String calendarToFilterId : calendarsToSearch) {
      select.append(prefix);
      prefix = ",";
      select.append(calendarToFilterId);
    }

    select.append(")");
    Cursor cursor = queryEvents(projection, select.toString(), null, null);
    Map<String, Event> eventsMap = new HashMap<String, Event>();
    if (cursor.moveToFirst()) {
      int[] cols = new int[projection.length];
      for (int i = 0; i < cols.length; i++) {
        cols[i] = cursor.getColumnIndex(projection[i]);
      }

      do {
        Event event = new Event();
        event.id = cursor.getString(cols[0]);
        event.message = cursor.getString(cols[1]);
        event.location = cursor.getString(cols[2]);
        event.title = cursor.getString(cols[3]);
        event.startDate = cursor.getString(cols[4]);
        event.endDate = cursor.getString(cols[5]);

        String rrule = cursor.getString(cols[6]);
        if (!TextUtils.isEmpty(rrule)) {
          event.recurring = true;
          String[] rrule_rules = cursor.getString(cols[6]).split(";");
          for (String rule : rrule_rules) {
            String rule_type = rule.split("=")[0];
            if (rule_type.equals("FREQ")) {
              event.recurrenceFreq = rule.split("=")[1];
            } else if (rule_type.equals("INTERVAL")) {
              event.recurrenceInterval = rule.split("=")[1];
            } else if (rule_type.equals("WKST")) {
              event.recurrenceWeekstart = rule.split("=")[1];
            } else if (rule_type.equals("BYDAY")) {
              event.recurrenceByDay = rule.split("=")[1];
            } else if (rule_type.equals("BYMONTHDAY")) {
              event.recurrenceByMonthDay = rule.split("=")[1];
            } else if (rule_type.equals("UNTIL")) {
              event.recurrenceUntil = rule.split("=")[1];
            } else if (rule_type.equals("COUNT")) {
              event.recurrenceCount = rule.split("=")[1];
            } else {
              Log.d(LOG_TAG, "Missing handler for " + rule);
            }
          }
        } else {
          event.recurring = false;
        }
        event.allDay = cursor.getInt(cols[7]) != 0;
        event.original_id = cursor.getString(cols[8]);
        event.calendar_id = cursor.getString(cols[9]);
        event.canModify = cursor.getString(cols[10]);
        String oa = cursor.getString(cols[11]);
        event.reminder = getContentProviderPathReminders(event.id);


        eventsMap.put(event.id, event);
      } while (cursor.moveToNext());
      cursor.close();
    }
    return eventsMap;
  }

  private String getContentProviderPathReminders(String EVENT_ID) {

    ContentResolver cr = this.cordova.getActivity().getApplicationContext().getContentResolver();
    String[] mProjection =
      {
        CalendarContract.Reminders.METHOD,
        CalendarContract.Reminders.MINUTES,
      };

    Uri uri = CalendarContract.Reminders.CONTENT_URI;
    String selection = CalendarContract.Reminders.EVENT_ID + " = " + EVENT_ID + " ";
    String[] selectionArgs = new String[]{"2"};

    if (ActivityCompat.checkSelfPermission(this.cordova.getActivity().getApplicationContext(), Manifest.permission.READ_CALENDAR) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(this.cordova.getActivity(), new String[]{Manifest.permission.READ_CALENDAR}, 1);
    }

    Cursor cursor = cr.query(Uri.parse(CONTENT_PROVIDER + CONTENT_PROVIDER_PATH_REMINDERS), mProjection, selection, null, null);


    while (cursor.moveToNext()) {
      String minut = cursor.getString(cursor.getColumnIndex(CalendarContract.Reminders.MINUTES));
      return minut;
    }
    return "";
  }

  private Map<String, ArrayList<Attendee>> fetchAttendeesForEventsAsMap(
    String[] eventIds) {
    // At least one id.
    if (eventIds.length == 0) {
      return null;
    }
    String[] projection = new String[]{
      this.getKey(KeyIndex.ATTENDEES_EVENT_ID),
      this.getKey(KeyIndex.ATTENDEES_ID),
      this.getKey(KeyIndex.ATTENDEES_NAME),
      this.getKey(KeyIndex.ATTENDEES_EMAIL),
      this.getKey(KeyIndex.ATTENDEES_STATUS)
    };
    StringBuffer select = new StringBuffer();
    select.append(this.getKey(KeyIndex.ATTENDEES_EVENT_ID) + " IN (");
    select.append(eventIds[0]);
    for (int i = 1; i < eventIds.length; i++) {
      select.append(",");
      select.append(eventIds[i]);
    }
    select.append(")");
    // Group the events together for easy iteration.
    Cursor cursor = queryAttendees(projection, select.toString(), null,
      this.getKey(KeyIndex.ATTENDEES_EVENT_ID) + " ASC");
    Map<String, ArrayList<Attendee>> attendeeMap =
      new HashMap<String, ArrayList<Attendee>>();
    if (cursor.moveToFirst()) {
      int[] cols = new int[projection.length];
      for (int i = 0; i < cols.length; i++) {
        cols[i] = cursor.getColumnIndex(projection[i]);
      }
      ArrayList<Attendee> array = null;
      String currentEventId = null;
      do {
        String eventId = cursor.getString(cols[0]);
        if (currentEventId == null || !currentEventId.equals(eventId)) {
          currentEventId = eventId;
          array = new ArrayList<Attendee>();
          attendeeMap.put(currentEventId, array);
        }
        Attendee attendee = new Attendee();
        attendee.id = cursor.getString(cols[1]);
        attendee.name = cursor.getString(cols[2]);
        attendee.email = cursor.getString(cols[3]);
        attendee.status = cursor.getString(cols[4]);
        array.add(attendee);
      } while (cursor.moveToNext());
      cursor.close();
    }
    return attendeeMap;
  }

  public JSONArray findEvents(String eventId, String title, String location, String notes, long startFrom, long startTo, String calendarId) {
    JSONArray result = new JSONArray();
    // Fetch events from the instance table.
    Event[] instances = fetchEventInstances(eventId, title, location, notes, startFrom, startTo);
    if (instances == null) {
      return result;
    }

    JSONArray active_CLD = new JSONArray();
    try {
      active_CLD = getActiveCalendars();
    } catch (JSONException e) {
      e.printStackTrace();
    }
    List<String> holiday_cld_id = new ArrayList<String>();
    for (int i = 0 ; i < active_CLD.length(); i++) {
      JSONObject obj = null;
      try {
        obj = active_CLD.getJSONObject(i);
//        String A = obj.getString("name");
//        if (A.toLowerCase().contains("holiday") || A.toLowerCase().contains("lễ")){
//          holiday_cld_id.add(obj.getString("id"));
//        }

        String B = obj.getString("access_level");
        if (!B.equals("700")){
          holiday_cld_id.add(obj.getString("id"));
        }
      }

      catch (JSONException e) {
        e.printStackTrace();
      }
    }

    // Fetch events from the events table for more event info.
    Map<String, Event> eventMap = fetchEventsAsMap(instances, calendarId);
    // Fetch event attendees
    Map<String, ArrayList<Attendee>> attendeeMap =
      fetchAttendeesForEventsAsMap(eventMap.keySet().toArray(new String[0]));
    // Merge the event info with the instances and turn it into a JSONArray.
        /*for (Event event : eventMap.values()) {
            result.put(event.toJSONObject());
        }*/

    for (Event instance : instances) {
      Event event = eventMap.get(instance.eventId);
      if (event != null) {
        if (holiday_cld_id.contains(event.calendar_id)){
          instance.canModify = "0";
        }
        else {
          instance.canModify = "1";
          if (instance.access_level.equals("3")) instance.canModify = "0";
        }
        instance.message = event.message;
        instance.location = event.location;
        instance.title = event.title;
        if (!event.recurring) {
          instance.startDate = event.startDate;
          instance.endDate = event.endDate;
        }

        instance.recurring = event.recurring;
        instance.recurrenceFreq = event.recurrenceFreq;
        instance.recurrenceInterval = event.recurrenceInterval;
        instance.recurrenceWeekstart = event.recurrenceWeekstart;
        instance.recurrenceByDay = event.recurrenceByDay;
        instance.recurrenceByMonthDay = event.recurrenceByMonthDay;
        instance.recurrenceUntil = event.recurrenceUntil;
        instance.recurrenceCount = event.recurrenceCount;

        instance.allDay = event.allDay;
        instance.reminder = event.reminder;
        instance.original_id = event.original_id;
        instance.attendees = attendeeMap.get(instance.eventId);
        result.put(instance.toJSONObject());
      }
    }

    return result;
  }

  public boolean deleteEvent(Uri eventsUri, long startFrom, long startTo, String title, String location, String notes) {
    ContentResolver resolver = this.cordova.getActivity().getApplicationContext().getContentResolver();
    Event[] events = fetchEventInstances(null, title, location, notes, startFrom, startTo);
    int nrDeletedRecords = 0;
    if (events != null) {
      for (Event event : events) {
        Uri eventUri = ContentUris.withAppendedId(eventsUri, Integer.parseInt(event.eventId));
        nrDeletedRecords = resolver.delete(eventUri, null, null);
      }
    }
    return nrDeletedRecords > 0;
  }

  public boolean deleteEventById(Uri eventsUri, long id, long fromTime) {
    long time = fromTime;

    if (id == -1)
      throw new IllegalArgumentException("Event id not specified.");

    // Find event
    long evDtStart = -1;
    String calenar_name = "";
    String evRRule = null;
    {
      Cursor cur = queryEvents(new String[] { Events.DTSTART, Events.RRULE, Events.CALENDAR_DISPLAY_NAME },
        Events._ID + " = ?",
        new String[] { Long.toString(id) },
        Events.DTSTART);
      if (cur.moveToNext()) {
        evDtStart = cur.getLong(0);
        evRRule = cur.getString(1);
        calenar_name = cur.getString(2);
      }
      cur.close();
    }
    if (evDtStart == -1)
      throw new RuntimeException("Could not find event.");

    // If targeted, delete initial event
    if (time == -1 || evDtStart >= time) {
      ContentResolver resolver = this.cordova.getActivity().getContentResolver();
      int deleted = this.cordova.getActivity().getContentResolver()
        .delete(ContentUris.withAppendedId(eventsUri, id), null, null);
      return deleted > 0;
    }

    // Find target instance
    long targDtStart = -1;
    {
      // Scans just over a year.
      // Not using a wider range because it can corrupt the Calendar Storage state! https://issuetracker.google.com/issues/36980229
      Cursor cur = queryEventInstances(time,
        time + 1000L * 60L * 60L * 24L * 367L,
        new String[] { Instances.DTSTART },
        Instances.EVENT_ID + " = ?",
        new String[] { Long.toString(id) },
        Instances.DTSTART);
      if (cur.moveToNext()) {
        targDtStart = cur.getLong(0);
      }
      cur.close();
    }
    if (targDtStart == -1) {
      // Nothing to delete
      return false;
    }

    // Set UNTIL
    if (evRRule == null)
      evRRule = "";

    // Remove any existing COUNT or UNTIL
    List<String> recurRuleParts = new ArrayList<String>(Arrays.asList(evRRule.split(";")));
    Iterator<String> iter = recurRuleParts.iterator();
    while (iter.hasNext()) {
      String rulePart = iter.next();
      if (rulePart.startsWith("COUNT=") || rulePart.startsWith("UNTIL=")) {
        iter.remove();
      }
    }

    evRRule = TextUtils.join(";", recurRuleParts) + ";UNTIL=" + nl.xservices.plugins.Calendar.formatICalDateTime(new Date(fromTime - 1000));

    // Update event
    ContentValues values = new ContentValues();
    values.put(Events.RRULE, evRRule);

    int updated = this.cordova.getActivity().getContentResolver()
      .update(ContentUris.withAppendedId(eventsUri, id), values, null, null);
    return updated > 0;
//    Uri uri = Uri.withAppendedPath(eventsUri, String.valueOf(id));
//
//      uri = asSyncAdapter(uri, calenar_name, CalendarContract.ACCOUNT_TYPE_LOCAL);
//
//    int count = this.cordova.getActivity().getContentResolver().update(uri, values, null, null);
//
//    assertEquals(1, count);
//    verifyEvent(values, id);
//    return count > 0;
  }

  private void verifyEvent(ContentValues values, long eventId) {
    String[] EVENTS_PROJECTION = new String[] {
      Events._ID,
      Events.ACCOUNT_NAME,
      Events.ACCOUNT_TYPE,
      Events.OWNER_ACCOUNT,
      // Events.ORGANIZER_CAN_RESPOND, from Calendars
      // Events.CAN_CHANGE_TZ, from Calendars
      // Events.MAX_REMINDERS, from Calendars
      Events.CALENDAR_ID,
      // Events.CALENDAR_DISPLAY_NAME, from Calendars
      // Events.CALENDAR_COLOR, from Calendars
      // Events.CALENDAR_ACL, from Calendars
      // Events.CALENDAR_VISIBLE, from Calendars
      Events.SYNC_DATA3,
      Events.SYNC_DATA6,
      Events.TITLE,
      Events.EVENT_LOCATION,
      Events.DESCRIPTION,
      Events.STATUS,
      Events.SELF_ATTENDEE_STATUS,
      Events.DTSTART,
      Events.DTEND,
      Events.EVENT_TIMEZONE,
      Events.EVENT_END_TIMEZONE,
      Events.EVENT_COLOR,
      Events.EVENT_COLOR_KEY,
      Events.DURATION,
      Events.ALL_DAY,
      Events.ACCESS_LEVEL,
      Events.AVAILABILITY,
      Events.HAS_ALARM,
      Events.HAS_EXTENDED_PROPERTIES,
      Events.RRULE,
      Events.RDATE,
      Events.EXRULE,
      Events.EXDATE,
      Events.ORIGINAL_ID,
      Events.ORIGINAL_SYNC_ID,
      Events.ORIGINAL_INSTANCE_TIME,
      Events.ORIGINAL_ALL_DAY,
      Events.LAST_DATE,
      Events.HAS_ATTENDEE_DATA,
      Events.GUESTS_CAN_MODIFY,
      Events.GUESTS_CAN_INVITE_OTHERS,
      Events.GUESTS_CAN_SEE_GUESTS,
      Events.ORGANIZER,
      Events.DELETED,
      Events._SYNC_ID,
      Events.SYNC_DATA4,
      Events.SYNC_DATA5,
      Events.DIRTY,
      Events.SYNC_DATA8,
      Events.SYNC_DATA2,
      Events.SYNC_DATA1,
      Events.SYNC_DATA2,
      Events.SYNC_DATA3,
      Events.SYNC_DATA4,
    };
    Uri eventUri = ContentUris.withAppendedId(Events.CONTENT_URI, eventId);
    // Verify
    Cursor c = this.cordova.getActivity().getContentResolver()
      .query(eventUri, EVENTS_PROJECTION, null, null, null);
    assertEquals(1, c.getCount());
    assertTrue(c.moveToFirst());
    assertEquals(eventId, c.getLong(0));
    for (String key : values.keySet()) {
      int index = c.getColumnIndex(key);
      assertEquals(key, values.getAsString(key), c.getString(index));
    }
    c.close();
  }

  static Uri asSyncAdapter(Uri uri, String account, String accountType) {
    return uri.buildUpon()
      .appendQueryParameter(android.provider.CalendarContract.CALLER_IS_SYNCADAPTER,
        "true")
      .appendQueryParameter(CalendarContract.Calendars.ACCOUNT_NAME, account)
      .appendQueryParameter(CalendarContract.Calendars.ACCOUNT_TYPE, accountType).build();
  }

  public String createEvent(Uri eventsUri, String title, long startTime, long endTime, String description,
                            String location, Long firstReminderMinutes, Long secondReminderMinutes,
                            String recurrence, int recurrenceInterval, String recurrenceWeekstart,
                            String recurrenceByDay, String recurrenceByMonthDay, Long recurrenceEndTime, Long recurrenceCount,
                            String allday,
                            Integer calendarId, String url) {
    ContentResolver cr = this.cordova.getActivity().getContentResolver();
    ContentValues values = new ContentValues();
//    final boolean allDayEvent = "true".equals(allday) && isAllDayEvent(new Date(startTime), new Date(endTime));
    final boolean allDayEvent = "true".equals(allday);
    if (allDayEvent) {
      //all day events must be in UTC time zone per Android specification, getOffset accounts for daylight savings time
      values.put(Events.EVENT_TIMEZONE, "UTC");
      values.put(Events.DTSTART, startTime + TimeZone.getDefault().getOffset(startTime));
      if (recurrence == null) {
        values.put(Events.DTEND, endTime + TimeZone.getDefault().getOffset(endTime));
      }
    } else {
      values.put(Events.EVENT_TIMEZONE, TimeZone.getDefault().getID());
      values.put(Events.DTSTART, startTime);
      if (recurrence == null) {
        values.put(Events.DTEND, endTime);
      }
    }
    values.put(Events.ALL_DAY, allDayEvent ? 1 : 0);
    values.put(Events.TITLE, title);
    // there's no separate url field, so adding it to the notes
    if (url != null) {
      if (description == null) {
        description = url;
      } else {
        description += " " + url;
      }
    }
    values.put(Events.DESCRIPTION, description);
    values.put(Events.HAS_ALARM, firstReminderMinutes > -1 || secondReminderMinutes > -1 ? 1 : 0);
    String ExistCalendarId =  checkExistCalendarId(calendarId);
    if (ExistCalendarId.equals(Integer.toString(calendarId))){
      values.put(Events.CALENDAR_ID, calendarId);
    }else{
      values.put(Events.CALENDAR_ID, ExistCalendarId);
    }

    values.put(Events.EVENT_LOCATION, location);

    if (recurrence != null) {
      long duration = (endTime - startTime) / 1000;
      values.put("duration","P"+duration+"S");
//      values.put("duration","P3600S");
      String rrule = "FREQ=" + recurrence.toUpperCase() +
        ((recurrenceInterval > -1) ? ";INTERVAL=" + recurrenceInterval : "") +
        ((recurrenceWeekstart != null) ? ";WKST=" + recurrenceWeekstart : "") +
        ((recurrenceByDay != null) ? ";BYDAY=" + recurrenceByDay : "") +
        ((recurrenceByMonthDay != null) ? ";BYMONTHDAY=" + recurrenceByMonthDay : "") +
        ((recurrenceEndTime > -1) ? ";UNTIL=" + nl.xservices.plugins.Calendar.formatICalDateTime(new Date(recurrenceEndTime)) : "") +
        ((recurrenceCount > -1) ? ";COUNT=" + recurrenceCount : "");
      values.put(Events.RRULE, rrule);
    }

    String createdEventID = null;
    try {
      Uri uri = cr.insert(eventsUri, values);
      createdEventID = uri.getLastPathSegment();
      Log.d(LOG_TAG, "Created event with ID " + createdEventID);

      if (firstReminderMinutes > -1) {
        ContentValues reminderValues = new ContentValues();
        reminderValues.put("event_id", Long.parseLong(uri.getLastPathSegment()));
        reminderValues.put("minutes", firstReminderMinutes);
        reminderValues.put("method", 1);
        cr.insert(Uri.parse(CONTENT_PROVIDER + CONTENT_PROVIDER_PATH_REMINDERS), reminderValues);
      }

      if (secondReminderMinutes > -1) {
        ContentValues reminderValues = new ContentValues();
        reminderValues.put("event_id", Long.parseLong(uri.getLastPathSegment()));
        reminderValues.put("minutes", secondReminderMinutes);
        reminderValues.put("method", 1);
        cr.insert(Uri.parse(CONTENT_PROVIDER + CONTENT_PROVIDER_PATH_REMINDERS), reminderValues);
      }
    } catch (Exception e) {
      Log.e(LOG_TAG, "Creating reminders failed, ignoring since the event was created.", e);
    }
    return createdEventID;
  }
  public  String checkExistCalendarId(long id){

    String my_id = Long.toString(id);
    JSONArray active_CLD = new JSONArray();
    try {
      active_CLD = getActiveCalendars();
    } catch (JSONException e) {
      e.printStackTrace();
    }
    String holiday_cld_id = "-1";
    for (int i = 0 ; i < active_CLD.length(); i++) {
      JSONObject obj = null;
      try {
        obj = active_CLD.getJSONObject(i);
        String A = obj.getString("id");
        String B = obj.getString("access_level");
        if (A.equals(Long.toString(id)) && B.equals("700")){
          return Long.toString(id);
        }

        if (B.equals("700")){
          my_id = A;
        }
//        String B = obj.getString("isPrimary");
//        if (B.contains("true")){
//          my_id = A;
//        }
      }
      catch (JSONException e) {
        e.printStackTrace();
        return "-1";
      }
    }
    return my_id;
  }
  @SuppressWarnings("MissingPermission") // already requested in calling method
  public String createCalendar(String calendarName, String calendarColor) {
    try {
      // don't create if it already exists
      Uri evuri = CalendarContract.Calendars.CONTENT_URI;
      final ContentResolver contentResolver = cordova.getActivity().getContentResolver();
      Cursor result = contentResolver.query(evuri, new String[]{CalendarContract.Calendars._ID, CalendarContract.Calendars.NAME, CalendarContract.Calendars.CALENDAR_DISPLAY_NAME}, null, null, null);
      if (result != null) {
        while (result.moveToNext()) {
          if ((result.getString(1) != null && result.getString(1).equals(calendarName)) || (result.getString(2) != null && result.getString(2).equals(calendarName))) {
            result.close();
            return null;
          }
        }
        result.close();
      }

      // doesn't exist yet, so create
      Uri calUri = CalendarContract.Calendars.CONTENT_URI;
      ContentValues cv = new ContentValues();
      cv.put(CalendarContract.Calendars.ACCOUNT_NAME, "AccountName");
      cv.put(CalendarContract.Calendars.ACCOUNT_TYPE, CalendarContract.ACCOUNT_TYPE_LOCAL);
      cv.put(CalendarContract.Calendars.NAME, calendarName);
      cv.put(CalendarContract.Calendars.CALENDAR_DISPLAY_NAME, calendarName);
      if (calendarColor != null) {
        cv.put(CalendarContract.Calendars.CALENDAR_COLOR, Color.parseColor(calendarColor));
      }
      cv.put(CalendarContract.Calendars.VISIBLE, 1);
      cv.put(CalendarContract.Calendars.CALENDAR_ACCESS_LEVEL, CalendarContract.Calendars.CAL_ACCESS_OWNER);
      cv.put(CalendarContract.Calendars.OWNER_ACCOUNT, "AccountName" );
      cv.put(CalendarContract.Calendars.SYNC_EVENTS, 0);

      calUri = calUri.buildUpon()
        .appendQueryParameter(CalendarContract.CALLER_IS_SYNCADAPTER, "true")
        .appendQueryParameter(CalendarContract.Calendars.ACCOUNT_NAME, "AccountName")
        .appendQueryParameter(CalendarContract.Calendars.ACCOUNT_TYPE, CalendarContract.ACCOUNT_TYPE_LOCAL)
        .build();

      Uri created = contentResolver.insert(calUri, cv);
      if (created != null) {
        return created.getLastPathSegment();
      }
    } catch (Exception e) {
      Log.e(LOG_TAG, "Creating calendar failed.", e);
    }
    return null;
  }

  ;

  @SuppressWarnings("MissingPermission") // already requested in calling method
  public void deleteCalendar(String calendarName) {
    try {
      Uri evuri = CalendarContract.Calendars.CONTENT_URI;
      final ContentResolver contentResolver = cordova.getActivity().getContentResolver();
      Cursor result = contentResolver.query(evuri, new String[]{CalendarContract.Calendars._ID, CalendarContract.Calendars.NAME, CalendarContract.Calendars.CALENDAR_DISPLAY_NAME}, null, null, null);
      if (result != null) {
        while (result.moveToNext()) {
          if (result.getString(1) != null && result.getString(1).equals(calendarName) || result.getString(2) != null && result.getString(2).equals(calendarName)) {
            long calid = result.getLong(0);
            Uri deleteUri = ContentUris.withAppendedId(evuri, calid);
            contentResolver.delete(deleteUri, null, null);
          }
        }
        result.close();
      }

      // also delete previously crashing calendars, see https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin/issues/241
      deleteCrashingCalendars(contentResolver);
    } catch (Throwable t) {
      System.err.println(t.getMessage());
      t.printStackTrace();
    }
  }

  @SuppressWarnings("MissingPermission") // already requested in calling method
  private void deleteCrashingCalendars(ContentResolver contentResolver) {
    // first find any faulty Calendars
    final String fixingAccountName = "FixingAccountName";
    String selection = CalendarContract.Calendars.ACCOUNT_NAME + " IS NULL";
    Uri uri = CalendarContract.Calendars.CONTENT_URI;
    uri = uri.buildUpon()
      .appendQueryParameter(CalendarContract.CALLER_IS_SYNCADAPTER, "true")
      .appendQueryParameter(CalendarContract.Calendars.ACCOUNT_NAME, fixingAccountName)
      .appendQueryParameter(CalendarContract.Calendars.ACCOUNT_TYPE, CalendarContract.ACCOUNT_TYPE_LOCAL)
      .build();
    ContentValues values = new ContentValues();
    values.put(CalendarContract.Calendars.ACCOUNT_NAME, fixingAccountName);
    values.put(CalendarContract.Calendars.ACCOUNT_TYPE, CalendarContract.ACCOUNT_TYPE_LOCAL);
    int count = contentResolver.update(uri, values, selection, null);

    // now delete any faulty Calendars
    if (count > 0) {
      Uri evuri = CalendarContract.Calendars.CONTENT_URI;
      Cursor result = contentResolver.query(evuri, new String[]{CalendarContract.Calendars._ID, CalendarContract.Calendars.ACCOUNT_NAME}, null, null, null);
      if (result != null) {
        while (result.moveToNext()) {
          if (result.getString(1) != null && result.getString(1).equals(fixingAccountName)) {
            long calid = result.getLong(0);
            Uri deleteUri = ContentUris.withAppendedId(evuri, calid);
            contentResolver.delete(deleteUri, null, null);
          }
        }
        result.close();
      }
    }
  }

  public static boolean isAllDayEvent(final Date startDate, final Date endDate) {
    return ((endDate.getTime() - startDate.getTime()) % (24 * 60 * 60 * 1000) == 0);
  }
}
