
async function getProductList(){
    try {
        let response = await fetch('http://180.149.241.208:3022/commonProducts?category_id=5cfe3c65ea821930af69281f&pageNo=1&perPage=5');
        let responseJson = await response.json();
        return responseJson.product_details;

    } catch (error) {
        console.log(error);
    }
}

export default getProductList;