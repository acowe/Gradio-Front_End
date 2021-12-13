import Enzyme, {mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {useState} from "react";


Enzyme.configure({ adapter: new Adapter() });

// Default values for max score, grade weight, and deadline
// (for tasks which don't have those defined)

const DEFAULT_MAX_SCORE = 0;
const DEFAULT_GRADE_WEIGHT = 0;
const DEFAULT_DEADLINE = [];
const num_tasks_to_display = 3;

// Dummy/Placeholder Data

const initialDummyTaskData = [
    {course: "Course 0",
        tasks: [
            {task_name: "Course 0 Assignment #6", max_score: "5", grade_weight: 0.05, deadline: [16,11, 2021, 23, 59]},
            {task_name: "Course 0 Assignment #5", max_score: "5", grade_weight: 0.05, deadline: [9,11, 2021, 23, 59]},
            {task_name: "Course 0 Assignment #4", max_score: "5", grade_weight: 0.05, deadline: [2,11, 2021, 23, 59]},
            {task_name: "Course 0 Assignment #3", max_score: "5", grade_weight: 0.05, deadline: [26,10, 2021, 23, 59]},
            {task_name: "Course 0 Assignment #2", max_score: "5", grade_weight: 0.05, deadline: [19,10, 2021, 23, 59]},
            {task_name: "Course 0 Assignment #1", max_score: "5", grade_weight: 0.05, deadline: [12,10, 2021, 23, 59]}],
    },

    {course: "Course 1",
        tasks: [
            {task_name: "Study for Course 1 Exam", max_score: DEFAULT_MAX_SCORE, grade_weight: DEFAULT_GRADE_WEIGHT, deadline: DEFAULT_DEADLINE}
        ],
    }
];

const dummyDisplayPref = "default";


function Tasks(props){

    // Data Storing (state) Variables

    const[taskData, setTaskData] = useState(initialDummyTaskData);
    const [taskDisplayPreference, setTaskDisplayPreference] = useState(dummyDisplayPref);


    // Helper/Functionality Variables

    const[show, setShow] = useState([props.showOverview,props.showAllTasksForSelected]);
    const[gradeGoalText, setGradeGoalText] = useState("");
    const selectCourseIndex = courseIndexer(props.select_course);


    // Helper/UI functionality Functions

    function courseIndexer(course) {    //helper function for finding index of course within allCourseGrades
        for(let i = 0; i < taskData.length; i++){
            if(taskData[i].course === course){
                return i;
            }
        }
        return -1;
    }

    function taskOutputHelper(courseIndex, numTasksToShow) {    //helper function for formatting tasks for display of
                                                                // #numTasksToShow tasks

        return (taskData[courseIndex].tasks.map((c, c_index) =>
            {if (c_index < numTasksToShow){
                return(
                    <p> {"Task Name: " + c.task_name + ", Score: " + c.max_score
                    + ", Weight: " + c.grade_weight + ", Due Date & Time: " + c.deadline } </p>
                );
            }
            })
        );

    }


    // Output Methods

    function TasksOverview(){       // Displays user's #(num_tasks_to_display = 10 ) most recent tasks for all courses
        if (taskData === null || taskData.length === 0){
            return(
                <div>
                    <p>Task Overview Display Error: No Task Data Available</p>
                </div>
            );
        }
        else{
            let overall_task_output = taskData.map(
                (t, t_ind) =>
                {return taskOutputHelper(t_ind,num_tasks_to_display);});
            return (
                <div>
                    <h3>Tasks Overview</h3>
                    {overall_task_output}
                </div>
            );
        }
    }

    function CourseTasks(){   // Displays all of a user's tasks for a selected course, select_course

        if (taskData === null || taskData.length === 0){
            return(
                <div>
                    <p>Course Task Display Error: No Task Data Available</p>
                </div>
            );
        }

        else if (props.select_course === null || selectCourseIndex === -1){
            return(
                <div>
                    <p>Course Task Display Error: No or Invalid Course Selected</p>
                </div>
            );
        }
        else{

            let course_tasks_output = taskOutputHelper(selectCourseIndex, taskData[selectCourseIndex].tasks.length);

            return (
                <div>
                    <h3>All Tasks for {props.select_course}:</h3>
                    <div>
                        {course_tasks_output}
                    </div>
                </div>
            );
        }
    }


    // Input Methods

    function changeTaskDisplayPreferences(displayOption){   // Changes display layout of tasks based on displayOption inputted by user
        setTaskDisplayPreference(displayOption);
    }


    //  Final Display for Tasks Component

    return(
        <div>

            <div>
                {(show[0] && TasksOverview())} <br/>
                {(show[1] && CourseTasks())} <br/>
            </div>

            <div>
                <label htmlFor="taskDisplayOption"> Task Display Option ({taskDisplayPreference}): </label>
                <select name="taskDisplayOption" id="taskDisplayOption" className={"displayOp_"+taskDisplayPreference}
                        onChange={(event)=>
                            changeTaskDisplayPreferences(event.target.value)}>
                    <option value="default">Default</option>
                    <option value="alt_1">Alternate 1</option>
                    <option value="alt_2">Alternate 2</option>
                </select>
            </div>

        </div>

    );


}

export default Tasks;