import Enzyme, {mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import User from './User';
import Schedule from "./Schedule";

Enzyme.configure({ adapter: new Adapter() });

// Display (Output) Tests w/ Dummy Data

test("Given data from initialDummyUserData, is able to display the account info which " +
    "includes the name, email, username, and school",
    () => {
        render(<User/>);
        const display_name = screen.getByText("Name: Test User");
        const display_email = screen.getByText("Email: testuser@test.org");
        const display_username = screen.getByText("Username: testuser");
        const display_school = screen.getByText("School: Harvey Mudd College");
        expect(display_name).toBeInTheDocument();
        expect(display_email).toBeInTheDocument();
        expect(display_username).toBeInTheDocument();
        expect(display_school).toBeInTheDocument();
});


test("Given data from initialDummyTaskData with, is able to display courses as course codes",
    () => {
          render(<User/>);
          const course_code_list_elem1 = screen.getByText("c0");
          const course_code_list_elem2 = screen.getByText("c1");
          expect(course_code_list_elem1).toBeInTheDocument();
          expect(course_code_list_elem2).toBeInTheDocument();
    });



// Input Tests w/ Dummy data (manual tests over automated ones?)

test("CourseList Add Course Input test",
    () => {
        const page = <User/>;
        const pageMounted = mount(page);
        expect(pageMounted.find(".c0_c1").length).toEqual(1);
        pageMounted.find("#userAddCourseText").simulate('change', { target: { value: 'c2' } });
        pageMounted.find("#userAddCourseText").simulate('keypress', {key: 'Enter'});
        pageMounted.update();
        expect(pageMounted.find(".c0_c1_c2").length).toEqual(1);
    });

test("CourseList Remove Course Input test",
    () => {
        const page = <User/>;
        const pageMounted = mount(page);
        expect(pageMounted.find(".c0_c1").length).toEqual(1);
        pageMounted.find("#userAddCourseText").simulate('change', { target: { value: 'c2' } });
        pageMounted.find("#userAddCourseText").simulate('keypress', {key: 'Enter'});
        pageMounted.update();
        expect(pageMounted.find(".c0_c1_c2").length).toEqual(1);
        pageMounted.find("#userRemoveCourseText").simulate('change', { target: { value: 'c2' } });
        pageMounted.find("#userRemoveCourseText").simulate('keypress', {key: 'Enter'});
        pageMounted.update();
        expect(pageMounted.find(".c0_c1").length).toEqual(1);

    });

test("Name Change Input test",
    () => {
        const page = <User/>;
        const pageMounted = mount(page);
        expect(pageMounted.find(".Test_User").length).toEqual(1);
        pageMounted.find("#changeNameText").simulate('change', { target: { value: 'Testt User' } });
        pageMounted.find("#changeNameText").simulate('keypress', {key: 'Enter'});
        pageMounted.update();
        expect(pageMounted.find(".Testt_User").length).toEqual(1);
    });

test("Email Change Input test",
    () => {
        const page = <User/>;
        const pageMounted = mount(page);
        expect(pageMounted.find(".testuser_testorg").length).toEqual(1);
        pageMounted.find("#changeEmailText").simulate('change', { target: { value: 'testuser2_test.org' } });
        pageMounted.find("#changeEmailText").simulate('keypress', {key: 'Enter'});
        pageMounted.update();
        expect(pageMounted.find(".testuser2_testorg").length).toEqual(1);
    });

test("Username Change Input test",
    () => {
        const page = <User/>;
        const pageMounted = mount(page);
        expect(pageMounted.find(".testuser").length).toEqual(1);
        pageMounted.find("#changeUsernameText").simulate('change', { target: { value: 'testuser1' } });
        pageMounted.find("#changeUsernameText").simulate('keypress', {key: 'Enter'});
        pageMounted.update();
        expect(pageMounted.find(".testuser1").length).toEqual(1);
    });


