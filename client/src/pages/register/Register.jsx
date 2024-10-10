import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  })
  const [err, setErr] = useState(null)

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  console.log(inputs)
  const handleClick = async e => {
    e.preventDefault()

    // Validasi di sisi klien
    if (!inputs.username || !inputs.email || !inputs.password || !inputs.name) {
      setErr("All columns must be filled in.");
      return;
    }

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs)
    } catch (err) {
      setErr(err.response.data)
    }
  }

  // console.log(err)

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h2>terkoneksi</h2>
          <p>
            Welcome to our platform! Please fill in the information below to create an account and connect with friends and communities. Join now and enjoy an unlimited social media experience!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              required
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
