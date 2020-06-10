import React, { Component } from 'react';
import {connect} from 'react-redux';
import { View, Text, ActivityIndicator, ScrollView, Image, Alert, FlatList, Button, TouchableOpacity,TouchableHighlight,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import {WINDOW_HEIGHT} from '../../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {getProductDetails} from '../../../redux/actions/productActions';
import {cartAction} from '../../../redux/actions/cartAction';
import {BASE_URL, ADD_DATA_TO_CART,RATE_TO_PRODUCT_URLTYPE} from '../../../API/apiConstants';
import CustomHeader from '../../Common/Header';
import OnShare from '../../Common/OnShare';
import StarRating from 'react-native-star-rating';
import RNFetchBlob from 'react-native-fetch-blob';
import {productActions} from '../../../redux/actions/productActions';
import {store} from '../../../redux/store';

class ProductDetail extends Component{

  constructor(props) {
    super(props);
    this.state= {
        ratingData:{
          product_id: '',
          product_rating: '',
        },
        modalVisible: false,
        base64Data:'',
        showSubImage:false,
        mainImageName:'',
        cartProductsArr:[],
    }
  }
  
  componentDidMount(){
    const {productId} = this.props.route.params;
    const type = 'getProductByProdId/'+productId;
    this.props.getProductDetails(type);
  }

  goBack = () => this.props.navigation.goBack();

  async handleAddToCart(){
    let productInfo;
    const {productDetails} = this.props;
    const {cartProductsArr} = this.state;
    console.log('productDetails: ', productDetails, "cartProductsArr: ",cartProductsArr);
    
    // if(productDetails.product_id === cartProductsArr)


    try {
      const myArray = await AsyncStorage.getItem('cartProducts');
      console.log("myArray: ",JSON.parse(myArray));
      let newProduct, flag=false;

      if(myArray !== null){ 
        
        newProduct =  JSON.parse(myArray);

        newProduct.map( val =>{
            if(val.product_id === productDetails[0].product_id){
                flag = true;
            }
        });

        if(flag === false){
          newProduct.push(productDetails[0]);
          console.log("Modified myArray newProduct: ",newProduct);
          Alert.alert("Added to cart");
        }
        else{
          Alert.alert('Already in cart');
        }
        await AsyncStorage.setItem('cartProducts', JSON.stringify(newProduct));
      }
      else{
        await AsyncStorage.setItem('cartProducts', JSON.stringify(productDetails));
      }
      
    } catch (error) {
      console.log("Error saving data in asyncstorage cart: ",error);
    }


    // (productDetails)&&(productInfo = {
    //   product_id: productDetails[0].product_id,
    //   quantity: 1,
    // },
    // AsyncStorage.setItem('cartData', JSON.stringify(productInfo))
    // )

    // this.props.addToCart(ADD_DATA_TO_CART, productInfo); 
    // const {cartResult} = this.props;
    // console.log("ckdlkl dkjhk", cartResult);

    // (cartResult !== undefined) && this.props.navigation.navigate('CartProducts')

    // if(cartResult !== undefined){
    //   console.log("ckdlkl", cartResult);
      
    //   Alert.alert(cartResult.message);
    //   this.props.navigation.navigate('ProductDetail',{productId: productDetails[0].product_id});
    // }
    // else{
    //   Alert.alert("something went wrong");
    //   this.props.navigation.navigate('ProductDetail',{productId: productDetails[0].product_id});

    // }
  }

  onStarRatingPress(rating) {
    const {productId} = this.props.route.params;
    this.setState(state =>{
      return {
        ...state,
        ratingData:{
          ...state.product_id,
          product_id: productId,
          ...state.product_rating,
          product_rating: rating
        }
      }
    });
    console.log("--onstartpress data", this.state.ratingData);
  }
  
  async setModalVisible(visible) {
    this.setState({modalVisible: visible});

    await this.props.updateProductRating(this.state.ratingData, RATE_TO_PRODUCT_URLTYPE);
    const {productRatingRes} = await this.props;
    console.log("productRatingRes", productRatingRes);
    (productRatingRes !== undefined) &&
    (Alert.alert(productRatingRes.message))
  }

 
  shareHandler = (productD,fileUrl, type)=> {
    let msg = 'Check this - '+productD.product_name +' : url';

    let filePath = null;
    let file_url_length = fileUrl.length;
    const configOptions = { fileCache: true };
    RNFetchBlob.config(configOptions)
      .fetch('GET', fileUrl)
      .then(resp => {
        filePath = resp.path();
        return resp.readFile('base64');
      })
      .then(async base64Data => {
        base64Data = `data:${type};base64,` + base64Data;
        console.log("base64Data: ", base64Data);
        this.setState({base64Data:base64Data});
        await OnShare(base64Data, 'Check this product', msg);
        await RNFS.unlink(filePath);
      })
      .catch( error =>{
        console.log("Error----", error);
        
      });
  }

  searchHandler = (searchText) =>{
    this.props.navigation.navigate('ProductSearchRes',{searchText:searchText});
  }


  render() {
    const userData = store.getState().authReducer.userData;
    const {productDetails, isLoading} = this.props;
    const {product_rating} = this.state.ratingData
    // console.log("Product details render ", productDetails, "isload", isLoading);
    // console.log("details===>",productDetails);
  
    let productD, subImages, mainImage;
    
    if(productDetails){
      productD = productDetails[0];
      // console.log(productDetails[0].product_name);
      // console.log(productD.product_name);
      subImages = productDetails[0].subImages_id.product_subImages.map((value) => {return value} );
      subImages = subImages.map((value) => {return BASE_URL.concat(value)});
      mainImage = this.state.showSubImage ? this.state.mainImageName : BASE_URL+productD.product_image;
    }
    console.log("MainImg: ", mainImage);
    

    return (
      (productD === undefined) ? 
      (<ActivityIndicator />):
      (<View style={{flex:1,}}>
          
          {/* modal starts */}
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.modalVisible}
              onBackButtonPress={ () => this.setModalVisible(!this.state.modalVisible)}
              style={{backgroundColor:'white', maxHeight:WINDOW_HEIGHT/1.5, justifyContent:'center', alignItems:'center', }}
            >
              <View style={{flex:1, justifyContent:'center', alignItems:'center', }}>
                  <Text style={[styles.productDetailCategory, {color:StyleConstants.COLOR_000000,}]}> {productD.product_name} </Text>
                  <Image source={{uri: BASE_URL+productD.product_image}} style={[styles.productDetailImage, {marginBottom:10, marginTop:10, }]}/>
                  <StarRating 
                    maxStars={5} 
                    rating={product_rating} 
                    selectedStar={(product_rating) => this.onStarRatingPress(product_rating)}
                    starSize={35} 
                    fullStarColor={StyleConstants.COLOR_FFBA00}/>

                  <TouchableHighlight 
                    style={[styles.TabNavButton, {backgroundColor:StyleConstants.COLOR_FE3F3F, margin:10, } ]} 
                    onPress={ () => this.setModalVisible(!this.state.modalVisible)}>
                      <Text style={styles.TabNavButtonText}>RATE NOW</Text>
                  </TouchableHighlight>
              </View>
            </Modal>
          {/* modal ends */}

            <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle={productD.product_name} rightIconName="search" handleRightIconClick={this.searchHandler} />
            {/* Product detail section */}
            <ScrollView style={{flex:1,}}>
                <View style={styles.productDetailView1}>
                    <Text style={styles.productDetailTitle}> {productD.product_name} </Text>
                    <Text style={styles.productDetailCategory}> Category - {productD.category_id.category_name} </Text>
                    <View style={styles. rowSpaceBetween}>
                        <Text style={styles.productDetailMaterial}> {productD.product_material} </Text>
                        <StarRating maxStars={5} rating={Number(productD.product_rating)} starSize={20} fullStarColor={StyleConstants.COLOR_FFBA00}/>
                    </View>
                </View>

                <View style={styles.productDetailView2}>
                    <View style={styles.productDetailView21}>
                        <View style={styles. rowSpaceBetween}>
                            <Text style={styles.productListCost}>Rs.{productD.product_cost}</Text>
                            {/* share icon*/}
                            <Icon 
                              name="share-alt" 
                              color={StyleConstants.COLOR_7F7F7F} 
                              size={35}
                              onPress={() => this.shareHandler(productD, BASE_URL+productD.product_image, 'image/jpeg')}
                            />
                            {/* share icon*/}

                        </View>
                        <Image source={{uri: mainImage}} style={styles.productDetailImage}/>
                        {/* <ScrollView horizontal={true}> */}
                            <FlatList
                                data = {subImages}
                                numColumns={3}
                                renderItem = { ({item}) => (
                                  <TouchableHighlight 
                                    style={{flexDirection:"row", justifyContent:'space-evenly', padding:10,}}
                                    onPress={ () => this.setState({showSubImage: !this.state.showSubImage, mainImageName:item}) }
                                  >
                                      <Image source={{uri: item}} style={styles.productDetailSubImage} />
                                  </TouchableHighlight>
                                )}
                            />
                        {/* </ScrollView> */}
                    </View>

                    <View style={styles.productDetailView22}>
                        <Text style={styles.productDetailTitle, {fontSize:StyleConstants.FONT_23}}> DESCRIPTION </Text>
                        <Text style={styles.productDetailMaterial}> {productD.product_desc} </Text>
                    </View>
                </View>
            </ScrollView>
            {/* Product detail section */}

            {/* add cart button */}
            <TouchableHighlight 
              style={styles.addToCartButton} 
              onPress={this.handleAddToCart.bind(this) }
            >
              <Icon name="shopping-cart" color={StyleConstants.COLOR_FFFFFF} size={30} />
            </TouchableHighlight>

            {/* buy and rate button view starts */}
            <View style={[styles.rowSpaceBetween, {padding:StyleConstants.PADDING, backgroundColor:StyleConstants.COLOR_FFFFFF}]}>
              <TouchableOpacity style={[styles.TabNavButton, {backgroundColor:StyleConstants.COLOR_FE3F3F,} ]} 
                onPress={ () =>  (userData.status_code === 200) ?
                  (this.props.navigation.navigate('OrderSummary',{product_name:productD.product_name, product_id: productD.product_id, product_material:productD.product_material, 
                    product_image:productD.product_image, product_cost:productD.product_cost})):
                  (alert('Please Login first')) } >
                <Text style={styles.TabNavButtonText}> BUY NOW </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  style={[styles.TabNavButton, {backgroundColor:StyleConstants.COLOR_8E8E8E,} ]} 
                    onPress={() => {
                      (userData.status_code === 200) ? this.setModalVisible(true) : (alert('Please Login first'))
                
              }}>
                <Text style={styles.TabNavButtonText}> RATE </Text>
              </TouchableOpacity>
            </View>
            {/* buy and rate button view ends */}

            
        </View>)
      // <Text> In prod det return</Text> 
     
    );
  } 
}

function mapState(state){
  const {cartResult} = state.cartReducer;
  const {productDetails, isLoading, productRatingRes} = state.productCategoryReducer;
  return {productDetails, cartResult, isLoading, productRatingRes};
}

const actionCreators = {
  getProductDetails: getProductDetails,
  addToCart: cartAction.addToCart,
  updateProductRating: productActions.updateProductRating,
};

const connectedProductDetails = connect(mapState,actionCreators)(ProductDetail);
export {connectedProductDetails as ProductDetail};
