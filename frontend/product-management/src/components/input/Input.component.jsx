import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

import { InputStyle } from "./Input.styles";
import { useHttpCLient } from "../../hooks/http-hook";
import { InputAdornment } from "@mui/material";
import './Input.styles.css';

const InputForm = (props, ref) => {

  return (
    <InputStyle>
      <FormControl variant="standard">
        <InputLabel htmlFor={props.id}>{props.name}</InputLabel>
        <Input
          id={props.id}
          type={props.type}
          name={props.id}
          inputRef={ref}
          style={props.style}
          onChange={props.onChange}
          value={props.value}
          startAdornment={
            <InputAdornment position="start">
              {props.icon}
            </InputAdornment>
          }
          required
        />
      </FormControl>
    </InputStyle>
  );
};
const forwardedRef = React.forwardRef(InputForm);
export default forwardedRef;
