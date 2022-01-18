import { HeaderStyle, ProductStyle } from "./ExpireProduct.js";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const ExpireProduct = () => {
  return (
    <div>
      <HeaderStyle>Sản phẩm sắp hết hạn</HeaderStyle>
      <ProductStyle>
          <FiberManualRecordIcon color="info" />
          <div className="product-name">Bàn ghế tròn</div>
          <span> - </span>
          <div className="product-date">14/07/2020</div>
      </ProductStyle>
    </div>
  );
};

export default ExpireProduct;
