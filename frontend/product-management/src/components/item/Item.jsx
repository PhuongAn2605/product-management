import SendaImage from "../../images/senda.jpg";
import {
  ItemStyle,
  NameStyle,
  FunctionStyle,
  DescriptionStyle,
  ImageStyle
} from "./Item.styles";

const Item = () => {
  return (
    <ItemStyle>
      <ImageStyle>
        <img src={SendaImage} alt="Sen da" style={{ width: "200px", height: "200px"}} />
      </ImageStyle>
      <NameStyle>Sen đá</NameStyle>
      <FunctionStyle>Trang trí</FunctionStyle>
      <DescriptionStyle>Đồ vật có thể dùng trang trí</DescriptionStyle>
    </ItemStyle>
  );
};

export default Item;
