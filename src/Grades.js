import {useState} from "react";

const initialDummyGradeData = [
    {course: "Course 0",
        overall_grade: 84.5,
        task_grades: [{task_name: "Course 0 Assignment #1", score: "4/5", grade: 80},
            {task_name: "Course 0 Assignment #2", score: "4/5", grade: 80}],
        grade_goal: 90},

    {course: "Course 1",
        overall_grade: 90,
        task_grades: [{task_name: "Course 1 Exam", score: "90/100", grade: 90}],
        grade_goal: 90}

];

const dummyGradeEvalReports =  [{course: "Course 0", report_text:"Could be improved"},
                                {course: "Course 1", report_text:"On track"}];



function Grades(props){

    const[gradeData, setGradeData] = useState(initialDummyGradeData);
    const[gradeEvalReports, setGradeEvalReports]= useState(dummyGradeEvalReports)
    const [gradeDisplayPreference, setGradeDisplayPreference] = useState("default");

    const[show, setShow] = useState([true,true,true]);
    const[gradeGoalText, setGradeGoalText] = useState("");
    const selectCourseIndex = courseIndexer(props.select_course);


    // Helper Functions

    function courseIndexer(course) {    //helper function for finding index of course within allCourseGrades
        for(let i = 0; i < gradeData.length; i++){
            if(gradeData[i].course === course){
                return i;
            }
        }
        return -1;
    }

    function onGoalChangeEnter(key){
        if (key === 'Enter'){
            changeGradeGoal("Course 0", gradeGoalText);
        }
    }


    // Output Methods

    function GradesOverview(){  // Displays the user’s overall grades for all courses
        if (gradeData === null || gradeData.length === 0){
            return(
                <div>
                    <p>Grade Overview Error: No Grades Found</p>
                </div>
            );
        }
        else{
            let overall_grade_output = gradeData.map(g => <p>{g.course + " grade: " + g.overall_grade}</p>);
            return (
                <div>
                    {overall_grade_output}
                </div>
            );
        }
    }

    function CourseGrades(){   // Displays the user’s overall grade for selected course, select_course,
        // the grades for all tasks from that course,
        //and the quick display of the grade report.

        if (gradeData === null || gradeData === []){
            return(
                <div>
                    <p>Course Grade Display Error: No Course Selected</p>
                </div>
            );
        }

        else if (props.select_course === null || selectCourseIndex === -1){
            return(
                <div>
                    <p>Course Grade Display Error: Invalid Course Selected</p>
                </div>
            );
        }
        else{
            let overall_course_grade =  gradeData[selectCourseIndex].overall_grade;
            let course_grades_output = gradeData[selectCourseIndex].task_grades
                .map(c => <p> {c.task_name + ": " + c.grade} </p>);
            let quick_report = gradeEvalReports[selectCourseIndex].report_text;

            return (
                <div>
                    <p>Overall grade for {props.select_course} is: {overall_course_grade}</p><br/>

                    <p>Coursework grades:</p>

                    <div>
                        {course_grades_output}
                    </div>

                    <p>Grade status (quick report) : {quick_report} </p><br/>
                </div>
            );
        }
    }

    function Report(){     // Return either a textual display of the user’s report for for selected course select_course,
        // if viewFormat = text OR a file with the report if viewFormat = file
        if (gradeData === null || gradeData === []) {
            return (
                <div>
                    <p>Grade Report Display Error: No Grades Found</p>
                </div>
            );
        }
        else if (props.select_course === null || selectCourseIndex === -1){
            return(
                <div>
                    <p>Grade Report Display Error: Invalid Course Selected</p>
                </div>
            );
        }
        else if (props.viewFormat !== "text" && props.viewFormat !== "file"){
            return(
                <div>
                    <p>Grade Report Display Error: No view format selected</p>
                </div>
            );
        }
        else{
            const course = props.select_course;
            const courseIndex = courseIndexer(course);
            const desired_report_view = props.viewFormat;
            if (desired_report_view  === "text") {
                return (
                    <div>
                        <p>Report for {course}: {gradeEvalReports[courseIndex].report_text}</p>
                    </div>
                );
            }
            else if (desired_report_view === "file"){
                return(
                    <div>
                        <p>File</p>
                    </div>
                );
            }
            else{
                return (
                    <div>
                        <p>Can't find it :(</p>
                    </div>
                );
            }

        }
    }

    // Input Methods

    function changeGradeDisplayPreferences(displayOption){
        setGradeDisplayPreference(displayOption);
    }

    function changeGradeGoal(courseName, goalPrefOption){
        let newGradeData = [...gradeData].map(g => {
            if(g.course === courseName){
                return {...g,
                grade_goal: goalPrefOption}
            }
            else{
                return g;
            }
        });
        setGradeData(newGradeData);
    }


    return(
        <div>

            <div>
                {(show[0] && GradesOverview())} <br/>
                {(show[1] && CourseGrades())} <br/>
                {(show[2] && Report())}<br/>
            </div>

            <div>
                <label htmlFor="gradeGoalChangeText"> Change Grade Goal ({!(gradeData.length === 0) && gradeData[0].grade_goal}) </label>
                <input  type = "text" id = "gradeGoalChangeText" name="gradeGoalChangeText"
                        onKeyPress={(e)=>onGoalChangeEnter(e.key)}
                        onChange={(event)=>setGradeGoalText(event.target.value)}
                        value={gradeGoalText}/>  <br/>

                <label htmlFor="gradeDisplayOption"> Grade Display Option ({gradeDisplayPreference}): </label>
                <select name="gradeDisplayOption" id="gradeDisplayOption"
                        onChange={(event)=>changeGradeDisplayPreferences(event.target.value)}>
                    <option value="default">Default</option>
                    <option value="alt_1">Alternate 1</option>
                    <option value="alt_2">Alternate 2</option>
                </select>


            </div>

        </div>

    );


}

export default Grades;
