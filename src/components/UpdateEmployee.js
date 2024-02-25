import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateEmployee() {
  const [updates, setupdates] = useState({
    id: "",
    company_name: "",
    role: "",
    date_of_joining: "",
    last_date: "",
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const onchangeupdate = (e) => {
    setupdates({ ...updates, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/pages/get-user/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updates),
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setupdates(resp);
      });
  }, []);

  const Onsubmitupdate = async (
    e,
    company_name,
    role,
    date_of_joining,
    last_date
  ) => {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:8000/api/pages/get-user/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updates),
    });
    let json = await res.json();

    console.log(updates.id);

    let updatebody = JSON.parse(JSON.stringify(updates));
    for (let index = 0; index < updatebody.length; index++) {
      const element = updates[index];
      if (element.id === id) {
        updatebody[index].company_name = company_name;
        updatebody[index].role = role;
        updatebody[index].date_of_joining = date_of_joining;
        updatebody[index].last_date = last_date;
        break;
      }
    }
    setupdates(updatebody);
    console.log("updates", json);
    navigate("/");
  };

  return (
    <div>
      <div className="container my-3" style={{ fontFamily: "forte" }}>
        <form className="col-mg-4 card my-3" onSubmit={Onsubmitupdate}>
          <div className="card-body my-3">
            <h3 className="my-3 text-center">Update Details</h3>
            <div className="form my-3">
              <label htmlFor="Company Name">Company Name</label>
              <input
                type="text"
                className="form-control"
                onChange={onchangeupdate}
                name="company_name"
                value={updates.company_name}
              />
            </div>
            <div className="form my-3">
              <label htmlFor="Company Name">role</label>
              <input
                type="text"
                className="form-control"
                onChange={onchangeupdate}
                name="role"
                value={updates.role}
              />
            </div>
            <div className="form my-3">
              <label htmlFor="Company Name">Date Of Joining</label>
              <input
                type="text"
                className="form-control"
                onChange={onchangeupdate}
                name="date_of_joining"
                value={updates.date_of_joining}
              />
            </div>
            <div className="form my-3">
              <label htmlFor="Company Name">Last Date</label>
              <input
                type="text"
                className="form-control"
                onChange={onchangeupdate}
                name="last_date"
                value={updates.last_date}
              />
            </div>
            <div className="form my-3">
              <button className="btn btn-success">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
