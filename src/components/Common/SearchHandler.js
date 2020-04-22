
export const searchHandler = (searchText) =>{
    console.log("On search handler, searchText=", searchText);
    console.log("Prductlist array: ", this.state.productListArray);

    const {productList} = this.props;
    const {productListArray} = this.state;
    let newData;

    (productListArray !== '' && searchText !== '') ?
    (
    // productListArray = productList,
    // console.log("In if, productListArr: ", productListArray),

     newData = productListArray.filter(item =>{
        const itemData = `${item.product_name.toLowerCase()} ${item.product_material.toLowerCase()}`;
        const searchTxt = searchText.toLowerCase();

        return itemData.indexOf(searchTxt) > -1;
    }),
    this.setState({productListArray: newData})
    
    ) : 
    (
        this.setState({productListArray: productList})

    );

    console.log("filtered array: ",newData);
    console.log("productListArray array---: ",productListArray);
    
}
