import logo from './logo.svg';
import './App.css';
import Grades from './Grades';
import Tasks from "./Tasks";
import User from "./User";
import Schedule from "./Schedule";
import {useState} from "react";


// Main display Component

function App() {

  const [showGrades, setShowGrades] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  let toShow = "";

  function showWhich(showComponent){
      switch(showComponent) {
          case "showGrades":
              setShowGrades(true);
              setShowTasks(false);
              setShowUser(false);
              setShowSchedule(false);
              break;
          case "showTasks":
              setShowGrades(false);
              setShowTasks(true);
              setShowUser(false);
              setShowSchedule(false);
              break;
          case "showUser":
              setShowGrades(false);
              setShowTasks(false);
              setShowUser(true);
              setShowSchedule(false);
              break;
          case "showSchedule":
              setShowGrades(false);
              setShowTasks(false);
              setShowUser(false);
              setShowSchedule(true);
              break;
      }
  }


  if(showGrades){
      toShow = <Grades
          showOverview ={showGrades}
          showAllGradesForSelected ={showGrades}
          showReport ={showGrades}
          select_course="Course 0"
          viewFormat = "text"/>
  }
  else if(showTasks){
      toShow = <Tasks
          showOverview ={showTasks}
          showAllTasksForSelected ={showTasks}
          select_course="Course 0"/>
  }
  else if(showUser){
      toShow = <User/>
  }
  else if (showSchedule){
      toShow = <Schedule editOn={true}/>
  }
  else{
      toShow = <span></span>
  }
  return (
   <div className="App" >

       <div>

           <button name="showGrades" id="showGrades"
                   onClick={(e)=>{showWhich(e.target.id)}}>
               Grades
           </button>

           <button name="showTasks" id="showTasks"
                   onClick={(e)=>{showWhich(e.target.id)}}>
               Tasks
           </button>

           <button name="showUser" id="showUser"
                   onClick={(e)=>{showWhich(e.target.id)}}>
               User
           </button>

           <button name="showSchedule" id="showSchedule"
                   onClick={(e)=>{showWhich(e.target.id)}}>
               Schedule
           </button>
       </div> <br/>

       {toShow}


    </div>
  );
}

export default App;

