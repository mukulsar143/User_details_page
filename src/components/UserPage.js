import { useState } from "react";

const WorkExperience = () => {

  const [addex, setaddex] = useState({company_name : '',  last_date : '', date_of_joining : '', role : ''});

  const handleExperienceChange = (e) => {
    setaddex({...addex, [e.target.name] : e.target.value}) 
  };

  const addExperience = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://127.0.0.1:8000/api/pages/get-user/", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(addex)
      })    
      let json = await res.json()
      console.log("Experiences:", json);
      setaddex(json)
      setaddex({company_name : '',  last_date : '', date_of_joining : '', role : ''})    
    } catch (error) {
      console.log(error, 'something wrong')
    }

  };


  return (
    <div className="container my-3" style={{fontFamily :'forte'}}>
        <h2 className="my-3 text-center">Add Employee</h2>
          <div className="card-body">
            <form className="row g-4">
              <div className="row-md-2">
                <label htmlFor="company_name" className="form-label">
                  Company Name
                </label>
                <input
                  name="company_name"
                  className="form-control"
                  id="company_name"
                  type="text"
                  placeholder="company_name "
                  value={addex.company_name}
                  onChange={handleExperienceChange}
                />
              </div>
              <div className="row-mg-1">
                <label htmlFor="position" className="form-label">
                  Role
                </label>
                <input
                  name="role"
                  className="form-control"
                  type="text"
                  placeholder="role"
                  value={addex.role}
                  onChange={handleExperienceChange}
                  id="position"
                />
              </div>
              <div className="row-md-2">
                <label htmlFor="date_of_joining" className="form-label">
                  Date Of Joining
                </label>
                <input
                  name="date_of_joining"
                  className="form-control"
                  type="text"
                  placeholder="Date Of Joning"
                  value={addex.date_of_joining}
                  onChange={handleExperienceChange}
                  id="date_of_joining"
                />
              </div>
              <div className="row-md-2">
                <label htmlFor="last_date" className="form-label">
                  Last Date
                </label>
                <input
                  name="last_date"
                  className="form-control"
                  type="text"
                  placeholder="Last Date"
                  value={addex.last_date}
                  onChange={handleExperienceChange}
                  id="last_date"
                />
              </div>    
              <div className="my-3"><button className="btn btn-primary" onClick={addExperience} style={{marginTop : '20px'}}>Save</button></div>

            </form>     
             
          </div>
    </div>
  );
};

export default WorkExperience;
