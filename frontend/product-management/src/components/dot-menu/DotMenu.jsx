import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import './DotMenu.css';
import styled from "styled-components";
// import DialogFormEdit from "../dialog-edit/DialogFormEdit.jsx";
import DialogFormEdit from "../dialog-edit/DialogFormEdit.jsx";


const DotMenuStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  margin: 0;
`

const DotMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DotMenuStyle>
      <div
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}><DialogFormEdit /></MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </DotMenuStyle>
  );
};

export default DotMenu;
