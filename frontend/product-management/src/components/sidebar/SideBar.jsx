import DatePicker from "../date-picker/DatePicker";
import styled from "styled-components";
import ExpireProduct from "../expire-product/ExpireProduct.jsx";
import RoomImage from "../../images/isometric-office.gif";
import { SideBarStyle } from './SideBar';

const DatePickerStyle = styled.div`
  justify-content: flex-end;
`;

export const HeaderStyle = styled.div`
  margin: 1rem;
  color: #5f5d5d;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
`;

const SideBar = () => {
  return (
    <SideBarStyle>
      <DatePickerStyle>
        <DatePicker />
      </DatePickerStyle>
      <ExpireProduct />
      <HeaderStyle>
          Cấu trúc phòng của tôi
      </HeaderStyle>
      <img src={RoomImage} alt="cấu trúc phòng" />
    </SideBarStyle>
  );
};

export default SideBar;
