import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Tasks from './Tasks';
import User from "./User";
import {mount} from "enzyme";

// Display (Output) Tests w/ Dummy Data

test("Given data from initialDummyTaskData, is able to display first 5 most recent tasks for each course (courses 0 and 1)",
    () => {
      render(<Tasks showOverview ={true} showAllTasksForSelected ={false}/>);
      const course_0_task1 = screen.getByText("Task Name:Course 0 Assignment #6, Score: 5, Weight: 0.05, Due Date & Time:16,11,2021,23,59");
      const course_0_task2 = screen.getByText("Task Name:Course 0 Assignment #5, Score: 5, Weight: 0.05, Due Date & Time:9,11,2021,23,59");
      const course_0_task3 = screen.getByText("Task Name:Course 0 Assignment #4, Score: 5, Weight: 0.05, Due Date & Time:2,11,2021,23,59");
      const course_0_task4 = screen.getByText("Task Name:Course 0 Assignment #3, Score: 5, Weight: 0.05, Due Date & Time:26,10,2021,23,59");
      const course_0_task5 = screen.getByText("Task Name:Course 0 Assignment #2, Score: 5, Weight: 0.05, Due Date & Time:19,10,2021,23,59");
      const course_1_task1 = screen.getByText("Task Name:Study for Course 1 Exam, Score: 0, Weight: 0, Due Date & Time:");
      expect(course_0_task1).toBeInTheDocument();
      expect(course_0_task2).toBeInTheDocument();
      expect(course_0_task3).toBeInTheDocument();
      expect(course_0_task4).toBeInTheDocument();
      expect(course_0_task5).toBeInTheDocument();
});

test("Given data from initialDummyTaskData and course 0 as the selected course, display all (6) tasks for selected course",
    () => {
    render(<Tasks showOverview ={false} showAllTasksForSelected ={true} select_course="Course 0"/>);
      const course_0_task1 = screen.getByText("Task Name:Course 0 Assignment #6, Score: 5, Weight: 0.05, Due Date & Time:16,11,2021,23,59");
      const course_0_task2 = screen.getByText("Task Name:Course 0 Assignment #5, Score: 5, Weight: 0.05, Due Date & Time:9,11,2021,23,59");
      const course_0_task3 = screen.getByText("Task Name:Course 0 Assignment #4, Score: 5, Weight: 0.05, Due Date & Time:2,11,2021,23,59");
      const course_0_task4 = screen.getByText("Task Name:Course 0 Assignment #3, Score: 5, Weight: 0.05, Due Date & Time:26,10,2021,23,59");
      const course_0_task5 = screen.getByText("Task Name:Course 0 Assignment #2, Score: 5, Weight: 0.05, Due Date & Time:19,10,2021,23,59");
      const course_0_task6 = screen.getByText("Task Name:Course 0 Assignment #1, Score: 5, Weight: 0.05, Due Date & Time:12,10,2021,23,59");
      expect(course_0_task1).toBeInTheDocument();
      expect(course_0_task2).toBeInTheDocument();
      expect(course_0_task3).toBeInTheDocument();
      expect(course_0_task4).toBeInTheDocument();
      expect(course_0_task5).toBeInTheDocument();
      expect(course_0_task6).toBeInTheDocument();

});

test("Given data from initialDummyTaskData and course 1 as the selected course, display all (1) tasks for selected course",
    () => {
          render(<Tasks showOverview ={false} showAllTasksForSelected ={true} select_course="Course 1"/>);
          const course_1_task1 = screen.getByText("Task Name:Study for Course 1 Exam, Score: 0, Weight: 0, Due Date & Time:");
          expect(course_1_task1).toBeInTheDocument();
    });



// Post-Input Display Tests (manual tests over automated ones?)

test("Task Display Change Input test",
    () => {
        const page = <Tasks showOverview ={false} showAllTasksForSelected ={false} select_course="Course 0"/>;
        const pageMounted = mount(page);
        expect(pageMounted.find(".displayOp_default").length).toEqual(1);
        pageMounted.find("#taskDisplayOption").simulate('change', { target: { value: "alt_1" } });
        pageMounted.update();
        expect(pageMounted.find(".displayOp_alt_1").length).toEqual(1);
    });





