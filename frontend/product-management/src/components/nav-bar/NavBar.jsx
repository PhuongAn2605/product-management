import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { SidebarStyles, IconStyle } from "./NavBar";

const NavBar = () => {
  return (
    <SidebarStyles>
      <IconStyle>
        <MenuIcon style={{ fontSize: "400%" }} />
        <HomeOutlinedIcon fontSize="large" />
        <SettingsOutlinedIcon fontSize="large" />
        <DateRangeOutlinedIcon fontSize="large" />
      </IconStyle>
    </SidebarStyles>
  );
};

export default NavBar;
