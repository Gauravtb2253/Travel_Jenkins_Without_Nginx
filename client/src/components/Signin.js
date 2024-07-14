import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Google from "./Google";
import { registerValidation } from "../validations/RegisterValidation";

function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      await registerValidation.validate(
        { name, email, password, phone },
        { abortEarly: false }
      );
      setErrors({});
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
        // newErrors[err.path] = err.errors[0];
      });

      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost/api/register", {
        name,
        email,
        password,
        phone,
      });
      alert("Registration successful");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
    } catch (error) {
      if (error.response) {
        alert("Registration failed: " + error.response.data.message);
      } else {
        alert("Registration failed: " + error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="my-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Sign Up</div>
              <div className="card-body">
                <form onSubmit={registerUser}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="form-control"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="form-control"
                      placeholder="abc@gmail.com"
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
                      id="password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="form-control"
                      placeholder="*****"
                    />
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="form-control"
                      placeholder="9999999999"
                    />
                    {errors.phone && (
                      <div className="text-danger">{errors.phone}</div>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button type="submit" className="gradient-button mx-2">
                      Sign Up
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

export default Signin;
