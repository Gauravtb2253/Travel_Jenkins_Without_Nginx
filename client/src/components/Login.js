import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Usercontext";
import Navbar from "./Navbar";
import Google from "./Google";
import { loginValidation } from "../validations/LoginValidation";

function Login() {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      await loginValidation.validate(
        { email, password },
        { abortEarly: false }
      );
      setErrors({});
      // console.log("Form Submitted", formData);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        alert("Login successful");
        setRedirect(true);
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  if (redirect) {
    return <Navigate to={user ? "/dashboard" : "/login"} />;
  }

  return (
    <>
      <Navbar />
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="abc@gmail.com"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="*****"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                  <div style={{ display: "flex" }}>
                    <button type="submit" className="gradient-button mx-2">
                      Login
                    </button>
                    <Google />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
