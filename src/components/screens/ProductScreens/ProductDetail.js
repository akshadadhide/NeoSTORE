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
import RNFetchBlob from 'rn-fetch-blob';
import {productActions} from '../../../redux/actions/productActions';
import {store} from '../../../redux/store';
import Loader from '../../Common/Loader';

class ProductDetail extends Component{

	constructor(props) {
		super(props);
		this.state= {
            productDetails:'',
            ratingData:{
                product_id: '',
                product_rating: 2.5,
            },
            modalVisible: false,
            base64Data:'',
            showSubImage:false,
            mainImageName:'',
            cartProductsArr:[],
            userToken:'',

            showLoader:false,
		}
	}
	
	componentDidMount(){
		// this.focusListener = this.props.navigation.addListener('didFocus', () => {
			this.getData();
		// });
	}

	// componentWillUnmount() {
	// 	// Remove the event listener before removing the screen from the stack
	// 	this.focusListener();
	// 	clearTimeout(this.t);
	// }

	// componentDidUpdate(prevProps){
	// 	if(this.props.productDetails !== prevProps.productDetails){
            
    //     }
    // }
    
    getData = async() => {
        token = await AsyncStorage.getItem('userToken');
        this.setState({userToken:token});
        // console.log("getUserToken: ", this.state.userToken);

        const {productId} = this.props.route.params;
        const type = 'getProductByProdId/'+productId;
        this.props.getProductDetails(type);
        const {productDetails} = this.props;
        this.setState({productDetails:productDetails});
    }

	showLoader = () => { this.setState({ showLoader:true }); };
	hideLoader = () => { this.setState({ showLoader:false }); };
	goBack = () => this.props.navigation.goBack();


	async handleAddToCart(){
			await this.showLoader();
			let productInfo;
			const {productDetails} = this.props;
			const {cartProductsArr} = this.state;
			// console.log('productDetails: ', productDetails, "cartProductsArr: ",cartProductsArr);
			

			try {
						const myArray = await AsyncStorage.getItem('cartProducts');
						// console.log("myArray: ",JSON.parse(myArray));
						let newProduct, flag=false;

						if(myArray !== null){ 
								
								newProduct =  JSON.parse(myArray);

								newProduct.map( val =>{
										if(val.product_id === productDetails[0].product_id){
												flag = true;
										}
								});

								setTimeout(async() => {
										this.hideLoader();
										if(flag === false){
										newProduct.push(productDetails[0]);
										Alert.alert("Added to cart");
										// console.log("Modified myArray newProduct: ",newProduct);
										}
										else{
										Alert.alert('Already in cart');
										}
										await AsyncStorage.setItem('cartProducts', JSON.stringify(newProduct));
								},5000);
						}
						else{
								this.hideLoader();
								await AsyncStorage.setItem('cartProducts', JSON.stringify(productDetails));
						}
				
				}catch (error) {
						this.hideLoader();
						// console.log("Error saving data in asyncstorage cart: ",error);
				}

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
		// console.log("--onstartpress data", this.state.ratingData);
	}
	
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	async onSubmitRating(visible){
		await this.showLoader();
		await this.props.updateProductRating(this.state.ratingData, RATE_TO_PRODUCT_URLTYPE);
		const {productRatingRes} = await this.props;
		console.log("productRatingRes", productRatingRes);
		setTimeout(()=>{
				this.hideLoader();
				(productRatingRes !== undefined) ?
				(Alert.alert(productRatingRes.message)) : 
				(Alert.alert("Something went wrong!!!try again"));
		},3000);
		this.setState({modalVisible: visible});

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
				// console.log("base64Data: ", base64Data);
				this.setState({base64Data:base64Data});
				await OnShare(base64Data, 'Check this product', msg);
				await RNFS.unlink(filePath);
			})
			.catch( error =>{
				// console.log("Error----", error);
				
			});
	}

	searchHandler = (searchText) =>{
		this.props.navigation.navigate('ProductSearchRes',{searchText:searchText});
	}


	render() {
		const {productId} = this.props.route.params;
        const {productDetails} = this.props;
		const {product_rating} = this.state.ratingData
		const userToken = (this.state.userToken !== null) ? this.state.userToken : '' ;
		let productD, subImages, mainImage;
		
		if(productDetails){
			productD = productDetails[0];
			subImages = productDetails[0].subImages_id.product_subImages.map((value) => {return value} );
			subImages = subImages.map((value) => {return BASE_URL.concat(value)});
			mainImage = this.state.showSubImage ? this.state.mainImageName : BASE_URL+productD.product_image;
		}
		const flag = (userToken !== null && userToken !== '');

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
								onPress={ () => this.onSubmitRating(!this.state.modalVisible)}>
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
							<FlatList
									data = {subImages}
									horizontal={true}
									renderItem = { ({item}) => (
										<TouchableHighlight key={item.toString()}
											style={{flexDirection:"row", justifyContent:'space-evenly', padding:10,}}
											onPress={ () => this.setState({showSubImage: !this.state.showSubImage, mainImageName:item}) }
										>
												<Image source={{uri: item}} style={styles.productDetailSubImage} />
										</TouchableHighlight>
									)}
									keyExtractor={(item) => item.toString()}
							/>
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
					style={[styles.addToCartButton, flag ? {opacity:1} : {opacity:0.6}]} 
					onPress={() => {(userToken !== null && userToken !== '') ? this.handleAddToCart.bind(this) : (alert('Please Login first'))} }
				>
					<Icon name="shopping-cart" color={StyleConstants.COLOR_FFFFFF} size={30} />
				</TouchableHighlight>

				{/* buy and rate button view starts */}
				<View style={[styles.rowSpaceBetween, {padding:StyleConstants.PADDING, backgroundColor:StyleConstants.COLOR_FFFFFF}]}>
					<TouchableOpacity style={[styles.TabNavButton, {backgroundColor:StyleConstants.COLOR_FE3F3F,}, flag ? {opacity:1} : {opacity:0.6} ]} 
						onPress={ () =>  (userToken !== null && userToken !== '') ?
							(this.props.navigation.navigate('OrderSummary',{productDetails:[{product_name:productD.product_name, product_id: productD.product_id, product_material:productD.product_material, 
								product_image:productD.product_image, product_cost:productD.product_cost}]})):
							(alert('Please Login first')) } >
						<Text style={styles.TabNavButtonText}> BUY NOW </Text>
					</TouchableOpacity>
					<TouchableOpacity 
							style={[styles.TabNavButton, {backgroundColor:StyleConstants.COLOR_8E8E8E,}, flag ? {opacity:1} : {opacity:0.6} ]} 
                            onPress={() => {
                                (userToken !== null && userToken !== '') ? this.setModalVisible(true) : (alert('Please Login first'))
						
					}}>
						<Text style={styles.TabNavButtonText}> RATE </Text>
					</TouchableOpacity>
				</View>
				{/* buy and rate button view ends */}
				
				{/* Loader */}
				{(this.state.showLoader) && <Loader />}
					
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
