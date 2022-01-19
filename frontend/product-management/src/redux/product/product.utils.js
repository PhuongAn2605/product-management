export const editProducts = (products, productToEdit) => {
    console.log(products);
    console.log(productToEdit);
    console.log(productToEdit._id);
    const existingProduct = products.filter(p => p._id === productToEdit._id);
    const index = products.indexOf(existingProduct[0]);
    console.log(existingProduct)
console.log(index);
    return [
        ...products.slice(0, index),
        {
            ...productToEdit
        },
        ...products.slice(index+1)
    ]

}

export const deleteProduct = (products, id) => {
    return products.filter()
}