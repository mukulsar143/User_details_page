import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login(props) {
  const [creadiantials, setCrediantials] = useState({
    username: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleonSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: creadiantials.username,
        password: creadiantials.password,
      }),
    });

    let json = await res.json();
    if (json.success) {
      localStorage.setItem("token", json.token)
        navigate("/");
        alert('Login successfully')
    } else {
      alert("something went wrong")
    }
  };

  const handleonChange = (e) => {
    setCrediantials({ ...creadiantials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3" style={{fontFamily : 'forte'}}>
       <h5 className="card-title mx-3">Log In to Continue Home Page.. </h5>
      <div className="card-body">
        <form onSubmit={handleonSubmit}>
          <div className="row mb-3 my-3">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="username"
                value={creadiantials.username}
                onChange={handleonChange}
                required
                id="username"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                minLength={4}
                required
                value={creadiantials.password}
                onChange={handleonChange}
                type="text"
                className="form-control"
                id="inputPassword"
                name="password"
              />
            </div>
          </div>

          <div className="text-center">
            <button disabled = {creadiantials.password.length < 4} type="submit" className="btn btn-primary my-3">
              Submit
            </button>
          </div>
          <p className="my-3 align-left">
            {" "}
            If Doesn't Account <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
