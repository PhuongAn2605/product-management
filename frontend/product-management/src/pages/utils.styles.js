import styled from "styled-components";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

export const ErrorTextStyle = styled.div`
  color: red;
`;

export const PasswordButtonStyle = styled.div`
  width: 50% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const TextHeaderStyle = styled.div`
  margin: 2rem;
  text-align: center;
  color: #f44336;
  font-size: 30px;
  text-decoration: bold;
`;

export const AuthPageStyle = styled.div`
    margin: auto !important;    
`