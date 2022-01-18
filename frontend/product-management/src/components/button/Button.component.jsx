import Button from "@mui/material/Button";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchSignup } from "../../redux/auth/auth.actions";

const ButtonStyle = styled.div`
    margin: auto;
    padding: 0.5rem;
`

const ButtonForm = (props) => {

  // console.log(props);
  return (
    <ButtonStyle>
      <Button
        variant={props.variant}
        disabled={props.disabled}
        color={props.color ? props.color : "primary"}
        onClick={props.action}
      >
        {props.title}
      </Button>
    </ButtonStyle>
  );
};

// const mapDispatchToProps = dispatch => ({
//   signup: (userName, password) => dispatch(fetchSignup(userName, password))
// })

export default ButtonForm;
