import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [emplist, setemplist] = useState([]);

  let navigate = useNavigate()

  useEffect(() => {
    try {
      if (localStorage.getItem("token")) {
        fetch("http://127.0.0.1:8000/api/pages/get-user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Token ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            console.log(resp);
            setemplist(resp);
          });
      } else {
        navigate("/login")
      }
    } catch (error) {
      console.log(error, 'something went wrong')
    }


  }, []);
  
  const OnClickDelete = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/pages/get-user/${id}/`, {
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Token ${localStorage.getItem("token")}`,
        },
      })
      const json = await res.json()
      const emp_id = emplist.filter((empid)=>{
         return empid.id !== id
      })
      setemplist(emp_id)
    } catch (error) {
      console.log(error, 'something went wrong..')
    }
  
  }
  

  return (
    <div>
      <div className="container my-3" style={{fontFamily : 'cursive'}}>
        <div className="card my-3 mx-3">
          <h2 className="my-3 text-center">Employee List</h2>
        </div>
        <div className="card-body my-3">
            <Link to='/page' className="btn btn-primary my-3">Add New Employee (+)</Link>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Company name</td>
                <td>Role</td>
                <td>Date of Joining</td>
                <td>Last Date</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {emplist.map((note) => (
                  <tr key={note.id}>
                    <td>{note.company_name}</td>
                    <td>{note.role}</td>
                    <td>{note.date_of_joining}</td>
                    <td>{note.last_date}</td>
                    <td>
                        <Link className="btn btn-success mx-1" to={`/edit/${note.id}`}>Edit</Link>
                        <button className="btn btn-danger mx-1"  onClick={(()=>{OnClickDelete(note.id)})}>Delete</button>
                        </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
