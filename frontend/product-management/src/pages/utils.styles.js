import styled from "styled-components";
import { createTheme } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: amber[500],
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
    display: grid;
    grid-template-columns: 1fr 1fr !important;
    
    height: 100vh;


    img{
      width: 500px;
      height: 500px;
    }
    @media(max-width: 800px){
      img{
        width: 400px;
      height: 400px;
      }
    }
`

export const LeftItemsStyle = styled.div`
  background-color: #fff;
`;

export const RightItemsStyle = styled.div`
  background-color: #76cff0 ;
`;

export const TitleStyle = styled.div`
  text-transform: uppercase;
  margin: 2rem auto;
`

export const WelcomeTextStyle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1FC3FF;
  line-height: 2;
`
export const NewProductStyle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #F44336;
  line-height: 1;
`