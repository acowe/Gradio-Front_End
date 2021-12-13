import Enzyme, {mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Schedule from './Schedule';
import Tasks from "./Tasks";


Enzyme.configure({ adapter: new Adapter() });

// Display (Output) Tests w/ Dummy Data

test("Given data from initialDummyScheduleData, is able to display a 7 day schedule " +
    "with associated events",
    () => {
        render(<Schedule editOn ={false} />);
        const event = screen.getByText("Course 1 Homework at 15:0");
        expect(event).toBeInTheDocument();

});

// Input Tests w/ Dummy Data

test("Adding an event causes change to the scheduleData with the addition of event of id eNew ", () => {
        const page = <Schedule editOn={true}/>;
        const pageMounted = mount(page);
        pageMounted.find("#addScheduleEvent").simulate('click');
        pageMounted.update();
        expect(pageMounted.find(".eNew_existstrue").length).toEqual(1);
});

test("Given id eNew, and thus the associated event, exists within scheduleData deleting an event" +
    "should cause scheduleData to change so the event eNew no longer exists",
    () => {
        const page = <Schedule editOn={true}/>;
        const pageMounted = mount(page);
        pageMounted.find("#addScheduleEvent").simulate('click');
        pageMounted.update();
        expect(pageMounted.find(".eNew_existstrue").length).toEqual(1);
        pageMounted.find("#deleteScheduleEvent").simulate('click');
        pageMounted.update();
        expect(pageMounted.find(".eNew_existsfalse").length).toEqual(1);
});

test("Given id eNew, and thus the associated event, exists within scheduleData, changing an event" +
    "should cause scheduleData to change so the event eNew falls on Wednesday",
    () => {
        const page = <Schedule editOn={true}/>;
        const pageMounted = mount(page);
        pageMounted.find("#addScheduleEvent").simulate('click');
        pageMounted.update();
        expect(pageMounted.find(".eNew_existstrue").length).toEqual(1);
        expect(pageMounted.find(".eNew_onTuesday").length).toEqual(1);
        pageMounted.find("#changeScheduleEvent").simulate('click');
        pageMounted.update();
        expect(pageMounted.find(".eNew_existstrue").length).toEqual(1);
        expect(pageMounted.find(".eNew_onWednesday").length).toEqual(1);

});


test("Schedule Display Change Input test",
    () => {
            const page = <Schedule editOn={true}/>;
            const pageMounted = mount(page);
            expect(pageMounted.find(".displayOp_default").length).toEqual(1);
            pageMounted.find("#scheduleDisplayOption").simulate('change', { target: { value: "one_day" } });
            pageMounted.update();
            expect(pageMounted.find(".displayOp_one_day").length).toEqual(1);
    });




