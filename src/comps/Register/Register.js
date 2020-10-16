import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Register.scss";

const Register = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "name":
        setName(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.log("Bad name selection", name, value);
    }
    // if (name === "email") {
    //   setEmail(value);
    // } else {
    //   setPassword(value);
    // }
  };

  return (
    <Form className="register">
      <div className="register__container">
        <h1>Sign up</h1>

        <Form.Group>
          <Form.Label htmlFor="text">Name</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            placeholder="your name"
            name="name"
            value={name}
            onChange={(event) => onChangeHandler(event)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            size="lg"
            type="email"
            placeholder="name@example.com"
            name="email"
            value={email}
            onChange={(event) => onChangeHandler(event)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <div className="auth-register">
            <Form.Control
              size="lg"
              type="password"
              id="inputPassword6"
              aria-describedby="passwordHelpInline"
              name="password"
              value={password}
              onChange={(e) => onChangeHandler(e)}
            />

            <Form.Text id="passwordHelpBlock" muted>
              Must be 8-20 characters long.
            </Form.Text>
          </div>
        </Form.Group>

        <Button
          type="submit"
          className="mb-2"
          onClick={(event) => {
            onClick(event, email, password, name);
            setEmail("");
            setPassword("");
            setName("");
          }}
        >
          Sign up
        </Button>

        <div className="auth-login">
          <p>
            Already registered? <a href="/login">Sign in here</a>.
          </p>
        </div>
      </div>
    </Form>
  );
};

export default Register;
