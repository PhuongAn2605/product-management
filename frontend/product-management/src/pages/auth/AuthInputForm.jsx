import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./custom.css";
import InputAdornment from "@mui/material/InputAdornment";

const AuthInputFormStyle = styled.div`
    margin: 1rem auto;
    width: 100%;
`;
const AuthInputForm = (props) => {
  return (
    <AuthInputFormStyle>
      <TextField
        // id="outlined-required"
        //   label="User Name"
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        inputRef={props.ref}
        style={{ backgroundColor: "#fff", borderRadius: "10px", width: "300px" }}
        InputProps={{
          startAdornment: (
            <img
              src={props.image}
              style={{
                width: "20px",
                height: "20px",
                display: "inline-block",
                marginRight: "0.5rem",
              }}
              alt="User"
            />
          ),
        }}
      />
    </AuthInputFormStyle>
  );
};

export default AuthInputForm;
