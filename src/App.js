import logo from './logo.svg';
import './App.css';
import { GradesOverview, CourseGrades, Report } from './Grades';

function App() {
  return (
    <div className="App">
      <GradesOverview />
        <CourseGrades select_course = "Course 0"/>
        <Report select_course = "Course 1" viewFormat="text"/>
    </div>
  );
}

export default App;
