import React, { useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import { Button, Checkbox, Form, Message } from "semantic-ui-react";
import { useNavigate } from "react-router";
import "./style.css";
import axios from "axios";
function Register() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleRegister = () => {
    setLoading(true);
    axios
      .post("/blog/api/register", userData)
      .then((res) => {
        setLoading(false);
        navigate("/login")
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });
  };

  return (
    <div className="register-container">
      <PublicNavbar />
      <div className="register-subcontainer">
        <h1>Create your account .</h1>
        <Form className="register-form">
          <Form.Field>
            {/* <label>Username</label> */}
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUserData({ ...userData, userName: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            {/* <label>Last Name</label> */}
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            {/* <label>Last Name</label> */}
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Show password"
              onClick={() => {
                setShow(!show);
              }}
            />
          </Form.Field>
          {error && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{error}</p>
            </Message>
          )}
          <Button
            type="submit"
            onClick={() => {
              handleRegister();
            }}
            loading={loading}
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
