import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import User from './User';

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



// Post-Input Display Tests (manual tests over automated ones?)

// Manual Test Checklist




