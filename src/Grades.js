import {useState} from "react";

// Document-based Variables

const allCourseGrades =

    [
        {course: "Course 0", overall_grade: 84.5,
        task_grades: [{task_name: "Course 0 Assignment #1", score: "4/5", grade: 80},
        {task_name: "Course 0 Assignment #2", score: "4/5", grade: 80}]},

        {course: "Course 1", overall_grade: 90,
        task_grades: [{task_name: "Course 1 Exam", score: "90/100", grade: 90}]}

    ];

const gradeEvalReports =  [{course: "Course 0", report_text:"Could be improved"},
                           {course: "Course 1", report_text:"On track"}];

const gradeDisplayPreference = "default";




function courseIndexer(course) {    //helper function for finding index of course within allCourseGrades
    for(let i = 0; i < allCourseGrades.length; i++){
        if(allCourseGrades[i].course === course){
            return i;
        }
    }
}


// Helper functions

function GradesOverview(){  // Displays the user’s overall grades for all courses
    let overall_grade_output = allCourseGrades.map(g => <p>{g.course + " grade: " + g.overall_grade}</p>);
    return (
        <div>
            {overall_grade_output}
        </div>
    );
}

// Main Component Functions

function CourseGrades(props){   // Displays the user’s overall grade for selected course, select_course,
                                // the grades for all tasks from that course,
                                //and the quick display of the grade report.

    const course = props.select_course;
    const courseIndex = courseIndexer(course);

    let overall_course_grade =  allCourseGrades[courseIndex].overall_grade;
    let course_grades_output = allCourseGrades[courseIndex].task_grades
        .map(c => <p> {c.task_name + ": " + c.grade} </p>);
    let quick_report = gradeEvalReports[courseIndex].report_text;

    return (
        <div>
        <p>Overall grade for {course} is: {overall_course_grade}</p><br/>

        <p>Coursework grades:</p>

        <div>
            {course_grades_output}
        </div>

        <p>Grade status (quick report) : {quick_report} </p><br/>


        </div>
    );
}

function Report(props){     // Return either a textual display of the user’s report for for selected course select_course,
                            // if viewFormat = text OR a file with the report if viewFormat = file

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

export { GradesOverview, CourseGrades, Report }
