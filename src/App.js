import Navbar from "./components/Navbar";
import { Routes, Route, HashRouter } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
// import Alerts from "./components/Alerts";
// import { useState } from "react";
import WorkExperience from "./components/UserPage";
import EmployeeList from "./components/EmployeeList";
import UpdateEmployee from "./components/UpdateEmployee";


function App() {
    // const [alert, setalert] = useState("");
    // const showAlert = (message, type) => {
    //   setalert({
    //     msg: message,
    //     type: type,
    //   });
    //   setTimeout(() => {
    //     setalert(null);
    //   }, 1200);
    // };
    return (
      <>
          <HashRouter>
            <Navbar />
            <div className="container">
              <Routes>
                <Route
                  exact
                  path="/page"
                  element={<WorkExperience />}
                ></Route>
                 <Route
                  exact
                  path="/"
                  element={<EmployeeList />}
                ></Route>
                 <Route
                  exact
                  path="/edit/:id"
                  element={<UpdateEmployee />}
                ></Route>
                <Route
                  exact
                  path="/signin"
                  element={<Signin />}
                ></Route>
                <Route
                  exact
                  path="/login"
                  element={<Login />}
                ></Route>
              </Routes>
            </div>
          </HashRouter>
      </>
  );
}

export default App;
