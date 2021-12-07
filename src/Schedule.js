import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

// Default event field values (for events which do not have a predetermined duration, grade weight, associated task
// due date, or due time)

const DEFAULT_EVENT_TYPE= "progress";
const DEFAULT_DURATION= [1,0];
const DEFAULT_TASK = "";
const DEFAULT_DUE_DATE= [];
const DEFAULT_DUE_TIME= [];
const DEFAULT_COLOR = "blue";

// Available schedule display preferences

const ACCEPTED_DISPLAY_PREFS=["default", "one_day", "checklist"]


// Dummy/Placeholder data

const initialDummyScheduleData =
    [
        ["Sunday", []],
        ["Monday",
            [
                {event_id: "e123", event_type:"progress", event_name: "Course 1 Homework",
                start_time: [15,0], duration: [2,0], course: "Course 1", task: "Course 1 Homework #1",
                due_date:[12,10,2021], due_time:[23,59], color:"green", notes:"", repeat:"none"}
            ]
        ],
        ["Tuesday", []],
        ["Wednesday", []],
        ["Thursday", []],
        ["Friday", []] ,
        ["Saturday", []]
    ]
const dummyDisplayPref = "default";


function Schedule(props) {

    // Data Storing (state) Variables

    const [scheduleData, setScheduleData] = useState(initialDummyScheduleData);
    const [scheduleDisplayPreference, setScheduleDisplayPreference] = useState(dummyDisplayPref);
    const [editable, setEditable] = useState(props.editOn)


    // Helper Functions

    function eventOutputter(dayIndex) {     // Lists the events for a given day using its index, dayIndex
                                            // (See dayToDay_ind for indexing reference)
        if (scheduleData[dayIndex].length > 1) {
            const eventsForDay = scheduleData[dayIndex][1].map(d =>
                <p>{d.event_name} at {d.start_time[0]}:{d.start_time[1]}</p>);
            return (
                <div>
                    <h4>{scheduleData[dayIndex][0]}:</h4>
                    {eventsForDay}
                </div>
            );
        } else {
            return (
                <div>
                    <p>Events for {scheduleData[dayIndex][0]}:</p>
                </div>
            );
        }
    }

    function dayToDay_ind(day) {    // Converts days of the week to a corresponding index number
        switch(day) {
            case "Sunday":
                return 0;
                break;
            case "Monday":
                return 1;
                break;
            case "Tuesday":
                return 2;
                break;
            case "Wednesday":
                return 3;
                break;
            case "Thursday":
                return 4;
                break;
            case "Friday":
                return 5;
                break;
            case "Saturday":
                return 6;
                break;
        }
    }

    function addScheduleEventHelper(event_ID, name, day, startTime, duration, course, // Helper function for
                                    task, dueDate, dueTime, color, notes, repeat){    // adding/changing events
        const day_ind = dayToDay_ind(day);
        const newEventAddon =
            {
                event_id: "eNew",
                event_type: DEFAULT_EVENT_TYPE,
                event_name: name,
                start_time: startTime,
                duration: duration,
                course: course,
                task: task,
                due_date: dueDate,
                due_time: dueTime,
                color: color,
                notes: notes,
                repeat: repeat
            };
        const newScheduleDay = scheduleData[day_ind][1].concat(newEventAddon);
        let newSchedule = scheduleData.map((s) => s)
        newSchedule[day_ind][1] = newScheduleDay;
        setScheduleData(newSchedule);
        console.log(newSchedule);
    }


    // Output Methods

    function ScheduleDisplay() {     // Displays a 7-day schedule with each day a list of associated events
                                     // with their names and start times (in miltary time)

        if (scheduleData === null || scheduleData.length === 0) {
            return (
                <div>
                    <p>Schedule Display Error: No Schedule Available</p>
                </div>
            );
        } else {
            const scheduleOutput = scheduleData.map((s, s_ind) => eventOutputter(s_ind))
            return (scheduleOutput);

        }

    }


    // Input Methods

    function changeScheduleDisplayPreferences(displayOption) {   // Changes display layout of tasks based on displayOption inputted by user
        setScheduleDisplayPreference(displayOption);
    }


    function addScheduleEvent(name, day, startTime,       // Adds schedule event to current schedule with inputs for
                              duration, notes, repeat) {  // name, day, start time, duration, notes, and repeating status
        if(editable){
            const newEventID = generateUniqueID();
            addScheduleEventHelper(newEventID, name, day, startTime, duration, "", DEFAULT_TASK , DEFAULT_DUE_DATE,
                DEFAULT_DUE_TIME, DEFAULT_COLOR, notes, repeat);
        }
        else{
            console.log("Not Editable");
        }

    }


    function deleteScheduleEvent(event_ID){     // Given a selected event ID, event_ID,schedule, removes that event
                                                // from the schedule should the ID exist in the data
        if(editable) {
            let eventIndex = [];
            for (let d = 0; d < scheduleData.length; d++) {
                for (let e = 0; e < scheduleData[d][1].length; e++) {
                    if (scheduleData[d][1][e].event_id === event_ID) {
                        eventIndex = [d, e];
                    }
                }
            }
            if (eventIndex.length !== 0) {
                const newScheduleDay = scheduleData[eventIndex[0]][1].filter(s => s !== scheduleData[eventIndex[0]][1][eventIndex[1]]);
                let newSchedule = scheduleData.map((s) => s);
                newSchedule[eventIndex[0]][1] = newScheduleDay;
                setScheduleData(newSchedule);
                console.log(newSchedule);
            } else {
                console.log("No such event exists");
            }
        }
        else{
            console.log("Not Editable");
        }
    }


    function changeScheduleEvent(event_ID, new_name, new_day,      // Given a selected event ID, event_ID,schedule
                                 new_startTime, new_duration,      // and new field values (or "",[] for no change)
                                 new_notes, new_repeat, new_color){   // changes the schedule so those fields reflect the
                                                                      // desired new values

        let eventIndex = [];
        if(editable) {
            for (let d = 0; d < scheduleData.length; d++) {
                for (let e = 0; e < scheduleData[d][1].length; e++) {
                    if (scheduleData[d][1][e].event_id === event_ID) {
                        eventIndex = [d, e];
                    }

                }
            }
            if (eventIndex.length !== 0) {
                let scheduleDaytoChange = scheduleData[eventIndex[0]][1][eventIndex[1]];
                console.log(scheduleDaytoChange);


                let name = scheduleDaytoChange.name;
                let day = scheduleData[eventIndex[0]][0];
                let start_time = scheduleDaytoChange.start_time;
                let duration = scheduleDaytoChange.duration;
                let notes = scheduleDaytoChange.notes;
                let repeat = scheduleDaytoChange.repeat;
                let color = scheduleDaytoChange.color

                const id = scheduleDaytoChange.event_id
                const course = scheduleDaytoChange.course;
                const task = scheduleDaytoChange.task;
                const due_date = scheduleDaytoChange.due_date;
                const due_time = scheduleDaytoChange.due_time;

                if (new_name !== "") {
                    name = new_name;
                }
                if (new_day !== "") {
                    day = new_day;
                }
                if (new_startTime.length !== 0) {
                    start_time = new_startTime;
                }
                if (new_duration.length !== 0) {
                    duration = new_duration;
                }
                if (new_notes !== "") {
                    notes = new_notes
                }
                if (new_repeat !== "") {
                    repeat = new_repeat
                }
                if (new_color !== "") {
                    color = new_color
                }
                deleteScheduleEvent(id);
                addScheduleEventHelper(id, name, day, start_time, duration, course, task, due_date,
                    due_time, color, notes, repeat);

            } else {
                console.log("No such event exists");
            }
        } else {
            console.log("Not editable")
        }

    }


    // Final Display for Schedule Component

    return(
        <div>
            {ScheduleDisplay()}

            <br/>

            <div>
                <label htmlFor="scheduleDisplayOption"> Schedule Display Option ({scheduleDisplayPreference}): </label>
                <select name="scheduleDisplayOption" id="scheduleDisplayOption"
                        onChange={(event)=>
                            changeScheduleDisplayPreferences(event.target.value)}>
                    <option value={ACCEPTED_DISPLAY_PREFS[0]}>Default</option>
                    <option value={ACCEPTED_DISPLAY_PREFS[1]}>One-Day</option>
                    <option value={ACCEPTED_DISPLAY_PREFS[2]}>Checklist</option>
                </select><br/>

                <button name="addScheduleEvent" id ="addScheduleEvent"
                        onClick={(e)=> addScheduleEvent(
                            "Tuesday Event",
                            "Tuesday",
                            [15,0],
                            DEFAULT_DURATION,
                            "",
                            "none")}>
                Add "New Event" to Tuesday </button>

                <button name="deleteScheduleEvent" id ="deleteScheduleEvent"
                        onClick={(e)=>
                            deleteScheduleEvent("eNew")}>
                    Delete Event from Tuesday </button> <br/>

                <button name="changeScheduleEvent" id ="changeScheduleEvent"
                        onClick={(e)=>
                            changeScheduleEvent("eNew","Changed event","Wednesday",[14,0],[2,0],"This is a changed event","")}>
                    Change Tuesday's Event to "Changed Event" event on Wednesday </button>


            </div> <br/>

        </div>
    );

}

export default Schedule;