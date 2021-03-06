import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Grades from './Grades';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Schedule from "./Schedule";


Enzyme.configure({ adapter: new Adapter() });

// Display (Output) Tests w/ Dummy Data

test("Given data from initialDummyGradeData, is able to display overall grades for all courses",
    () => {
      const view = render(<Grades showOverview ={true} showAllGradesForSelected ={false} showReport ={false}/>);
      const overallGrade0 = view.getByText("Course 0: 84.5");
      const overallGrade1 = view.getByText("Course 1: 90");
      expect(overallGrade0).toBeInTheDocument();
      expect(overallGrade1).toBeInTheDocument();
});

test("Given data from initialDummyGradeData and course 0 as the selected course, is able to display all task grades"
    + "grade status report based on grade goal (90) for the selected course",
    () => {
      render(<Grades showOverview={false} showAllGradesForSelected={true} showReport={false} select_course="Course 0"/>);
      const course_0_OverallGrade = screen.getByText("Overall grade for Course 0 is: 84.5");
      const course_0_task1 = screen.getByText("Course 0 Assignment #1: 80");
      const course_0_task2 = screen.getByText("Course 0 Assignment #2: 80");
      const course_0_quick_report = screen.getByText("Could be improved");
      expect(course_0_OverallGrade).toBeInTheDocument();
      expect(course_0_task1).toBeInTheDocument();
      expect(course_0_task2).toBeInTheDocument();
      expect(course_0_quick_report).toBeInTheDocument()
});

test("Given data from initialDummyGradeData and course 1 as the selected course, is able to display all task grades and grade status report" +
    "based on grade goal (80) for selected course",
    () => {
      render(<Grades showOverview={false} showAllGradesForSelected={true} showReport={false} select_course="Course 1"/>);
      const course_1_task1 = screen.getByText("Course 1 Exam: 90");
      const course_1_quick_report = screen.getByText("On track");
      expect(course_1_task1).toBeInTheDocument();
      expect(course_1_quick_report).toBeInTheDocument()
    });

test("Given data from initialDummyGradeData, course 0 as the selected course, and text as the viewFormat, display course 0 grade report on screen textually",
    () => {
      render(<Grades showOverview={false} showAllGradesForSelected={false} showReport={true} select_course="Course 0"
                     viewFormat="text"/>);
      const course_0_report = screen.getByText("Could be improved");
      expect(course_0_report).toBeInTheDocument();
    });

test("Given data from initialDummyGradeData, course 1 as the selected course, and text as the viewFormat, display course 1 grade report  on screen textually",
    () => {
      render(<Grades showOverview={false} showAllGradesForSelected={false} showReport={true} select_course="Course 1"
                     viewFormat="text"/>);
      const course_0_report = screen.getByText("On track");
      expect(course_0_report).toBeInTheDocument();
    });

test("Given data from initialDummyGradeData, course 0 as the selected course, and file as the viewFormat, indicate that file option has been chosen",
    () => {
      render(<Grades showOverview={false} showAllGradesForSelected={false} showReport={true} select_course="Course 0" viewFormat="file"/>);
      const course_0_report = screen.getByText("File");
      expect(course_0_report).toBeInTheDocument();
    });



// Input Test w/ Dummy Data (Success assumes the above tests pass as well as this test)

test("Given a change in the numerical grade goal, be able to display that new grade goal on the screen ", () => {
            const page = <Grades showOverview={false} showAllGradesForSelected={false} showReport={false} select_course="Course 0"
                                 viewFormat="text"/>;
            const pageMounted = mount(page);
            pageMounted.find("#gradeGoalChange(90)").simulate('click');
            pageMounted.update();
            expect(pageMounted.find("#gradeGoalChange(85)").length).toEqual(1);
});

test("Grade Display Change Input test",
    () => {
        const page = <Grades showOverview={false} showAllGradesForSelected={false} showReport={false} select_course="Course 0"
                                                      viewFormat="text"/>;
        const pageMounted = mount(page);
        expect(pageMounted.find(".displayOp_default").length).toEqual(1);
        pageMounted.find("#gradeDisplayOption").simulate('change', { target: { value: "alt_1" } });
        pageMounted.update();
        expect(pageMounted.find(".displayOp_alt_1").length).toEqual(1);
    });





