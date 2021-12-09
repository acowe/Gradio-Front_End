import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Schedule from './Schedule';

// Display (Output) Tests w/ Dummy Data

test("Given data from initialDummyScheduleData, is able to display a 7 day schedule " +
    "with associated events",
    () => {
        render(<Schedule editOn ={false} />);
        const event = screen.getByText("Course 1 Homework at 15:0");
        expect(event).toBeInTheDocument();

});


// Post-Input Display Tests (manual tests over automated ones?)

// Manual Test Checklist




