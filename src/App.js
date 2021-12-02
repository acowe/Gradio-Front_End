import logo from './logo.svg';
import './App.css';
import Grades from './Grades';

function App() {
  return (
    <div className="App" >
      <Grades select_course = "Course 1" viewFormat="text"/>
    </div>
  );
}

export default App;
