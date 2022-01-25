import moment from "moment";

export const filterExpireProducts = (products) => {
    // console.log(products);
  const filteredProducts = products.filter((p) => (getExpireProduct(p) && p));
  console.log(filteredProducts);
  return filteredProducts;
};

export const getExpireProduct = (product) => {
    // console.log(moment())
    // console.log('expire: ', moment(product.expiration).isAfter(moment()));
    // console.log('before 30 days', moment(product.expiration).isBefore(moment().add(30, "days")))
    // console.log(moment(product.expiration).isAfter(moment()) &&
    // moment(product.expiration).isBefore(moment().add(30, "days")))
  return (
    moment(product.expiration).isAfter(moment()) ||
    moment(product.expiration).isBefore(moment().add(30, "days"))
  );
};
