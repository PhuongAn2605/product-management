import SendaImage from "../../images/cach-trong-sen-da-0.jpg";
import DotMenu from "../dot-menu/DotMenu";
import {
  ItemStyle,
  NameStyle,
  FunctionStyle,
  DescriptionStyle,
  ImageStyle
} from "./Item.styles";

const Item = (props) => {
  // console.log(props);
  return (
    // <ItemStyle>
    //   <DotMenu />
    //   <ImageStyle>
    //     <img src={SendaImage} alt="Sen da" style={{ width: "200px", height: "200px"}} />
    //   </ImageStyle>
    //   <NameStyle>Sen đá</NameStyle>
    //   <FunctionStyle>Trang trí</FunctionStyle>
    //   <DescriptionStyle>Đồ vật có thể dùng trang trí</DescriptionStyle>
    // </ItemStyle>

    <ItemStyle>
      <DotMenu id={props.id} />
      <ImageStyle>
        <img src={props.imageUrl} alt={props.productName} style={{ width: "200px", height: "200px"}} />
      </ImageStyle>
      <NameStyle>{props.productName}</NameStyle>
      <FunctionStyle>{props.functions}</FunctionStyle>
      <DescriptionStyle>{props.description}</DescriptionStyle>
    </ItemStyle>
  );
};

export default Item;
