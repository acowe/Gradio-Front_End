import {useState} from "react";

// Dummy/Placeholder Data

const initialDummyUserData = {
    courses: ["c0", "c1"],
    accountInfo: ["Test User", "testuser@test.org", "testuser", "Harvey Mudd College"],
    };

// Dummy course code list to add and/or remove from course list
const dummyCourseCodes = ["c0", "c1", "c2", "c3", "c4","c5"];


function User (){

    // Data Storing (state) Variables

    const LIST_OF_AVAIL_COURSES = dummyCourseCodes;
    const[userData, setUserData] = useState(initialDummyUserData);

    // Helper/Functionality Variables

    const[addCourseText, setAddCourseText] = useState("");
    const[removeCourseText, setRemoveCourseText] = useState("");
    const[nameChangeText, setNameChangeText] = useState("");
    const[emailChangeText, setEmailChangeText] = useState("");
    const[usernameChangeText, setUsernameChangeText] = useState("");


    // Helper/UI functionality functions

    function onCourseAddEnter(key){     // Upon pressing enter in add course textbox, calls upon addCourse
        if (key === 'Enter'){
            addCourse(addCourseText);
            setAddCourseText("");
        }
    }

    function onCourseRemoveEnter(key){      // Upon pressing enter in remove course textbox, calls upon removeCourse
        if (key === 'Enter'){
            removeCourse(removeCourseText);
            setRemoveCourseText("");
        }
    }

    function onChangeInfoEnter(key){          // Upon pressing enter in change user info textboxes
                                              // calls upon changeUserInfo
        if (key === 'Enter'){
            changeUserInfo(nameChangeText, emailChangeText, usernameChangeText);
            setNameChangeText("");
            setEmailChangeText("");
            setUsernameChangeText("");
        }
    }


    // Output Methods

    function UserInfo(){        // Displays user's account information based on contents of user's accountInfo array
       return(
           <div>
               <div>
                   <p>Name: {userData.accountInfo[0]} </p> <br/>
                   <p>Email: {userData.accountInfo[1]} </p> <br/>
                   <p>Username: {userData.accountInfo[2]} </p> <br/>
                   <p>School: {userData.accountInfo[3]} </p>  <br/>
               </div>

               <div>
                   <h4>Courses:</h4>
                   {userData.courses.map(c => {return(<p> {c}</p>)})}<br/>
               </div>
           </div>

        );

   }


    // Input Methods

   function addCourse(courseCode)  {        // Given a valid course code input, adds the code to the courseList array
        if(!(userData.courses.includes(courseCode)) && LIST_OF_AVAIL_COURSES.includes(courseCode)){
            const newCourseList = userData.courses.concat(courseCode);
            const newUserData = {...userData, courses: newCourseList};
            setUserData(newUserData);
            return(
                "Course " + courseCode + " added."
            );
        }
        else{
            return(
                "Add Course Error: course {courseCode} does not exist."
            );
        }

   }

   function removeCourse(courseCode)  {     // Given a course code input that exists within the current course list
                                            // removes the code from the courseList array
       if(userData.courses.includes(courseCode)){
           const newCourseList = userData.courses.filter(c => (c !== courseCode));
           const newUserData = {...userData, courses: newCourseList};
           setUserData(newUserData);
           return(
               "Course " + courseCode + " added."
           );
       }
       else{
           return(
               "Remove Course Error: course {courseCode} does not exist in list"
           );
       }

   }

   function changeUserInfo(name, email, username){      // Given a new name, email, and/or username changes
                                                        // the appropriate information within the accountInfo array

        let newName = userData.accountInfo[0];
        let newEmail = userData.accountInfo[1];
        let newUsername= userData.accountInfo[2];
        const school = userData.accountInfo[3];

        if(name !== ""){
            newName = name;
        }

        if(email !== ""){
            newEmail = email;
        }

        if(username !== ""){
            newUsername = username;
        }

        const newUserData = { ...userData, accountInfo: [newName, newEmail, newUsername, school]};
        setUserData(newUserData);
   }

    function changeUserPass(){
        // TBD, much of password change might be done outside of this component
    }




    // Variables to support input testing
    let courses = userData.courses.toString().replaceAll(",","_")
    let name = userData.accountInfo[0].replace(" ", "_");

    let email = userData.accountInfo[1].slice(0,-4).replace("@","_")
        + userData.accountInfo[1].slice(-3);

    let username = userData.accountInfo[2].replace(" ", "_");


    //  Final Display for User Component

    return(
        <div>
            {UserInfo()}

            <div>
                <div>
                    <label htmlFor="userAddCourseText"> Add Course: </label>
                    <input  type = "text" id = "userAddCourseText" name="userAddCourseText"
                            className={courses}
                            onKeyPress={(e)=>onCourseAddEnter(e.key)}
                            onChange={(event)=>setAddCourseText(event.target.value)}
                            value={addCourseText}/>

                    <label htmlFor="userRemoveCourseText"> Remove Course: </label>
                    <input  type = "text" id = "userRemoveCourseText" name="userRemoveCourseText"
                            onKeyPress={(e)=>onCourseRemoveEnter(e.key)}
                            onChange={(event)=>setRemoveCourseText(event.target.value)}
                            value={removeCourseText}/>  <br/>
                </div> <br/>


                <div><label htmlFor="changeNameText"> Change name to: </label>
                    <input  type = "text" id = "changeNameText" name="changeNameText"
                            className={name}
                            onChange={(event)=>setNameChangeText(event.target.value)}
                            onKeyPress={(e)=> onChangeInfoEnter(e.key)}
                            value={nameChangeText}/>

                    <label htmlFor="changeEmailText"> Change Email to: </label>
                    <input  type = "text"  id = "changeEmailText" name="changeEmailText"
                            className={email}
                            onKeyPress={(e)=>onChangeInfoEnter(e.key)}
                            onChange={(event)=>setEmailChangeText(event.target.value)}
                            value={emailChangeText}/>

                    <label htmlFor="changeUsernameText" > Change Username to: </label>
                    <input  type = "text" id = "changeUsernameText" name="changeUsernameText"
                            className={username}
                            onKeyPress={(e)=>onChangeInfoEnter(e.key)}
                            onChange={(event)=>setUsernameChangeText(event.target.value)}
                            value={usernameChangeText}/></div>
            </div>

        </div>
    );

}

export default User;