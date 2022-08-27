import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";

export default class BranchInformations extends Component {
  render() {
    return (
      <Form>
        <TextField
          margin="normal"
          required
          fullWidth
          name="name"
          label="Name"
          id="name"
          autoComplete="current-password"
          value="123456"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value="example@example.com"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value="123456"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          autoFocus
          value="address"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="Phone"
          label="Phone"
          name="Phone"
          autoComplete="Phone"
          autoFocus
          value="04-1234-567"
        />
      </Form>
    );
  }
}
