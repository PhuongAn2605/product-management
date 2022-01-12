import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { SidebarStyles } from './SideBar.styles';

const SideBar = () => {
  return (
    <SidebarStyles>
      <MenuIcon style={{ fontSize: '400%' }} />
      <HomeOutlinedIcon fontSize='large'/>
      <SettingsOutlinedIcon fontSize='large' />
      <DateRangeOutlinedIcon fontSize='large'/>
    </SidebarStyles>
  );
};

export default SideBar;
