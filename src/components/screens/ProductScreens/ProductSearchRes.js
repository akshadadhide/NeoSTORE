import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image,ScrollView,FlatList, TouchableOpacity } from 'react-native';
import {productActions} from '../../../redux/actions/productActions';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';
import {BASE_URL} from '../../../API/apiConstants';
import {styles} from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import CustomHeader from '../../Common/Header';


class ProductSearchRes extends Component {
  constructor(props) {
    super(props);
    this.state = {
        productListArray:[],
    };
  }

  componentDidMount(){
    const {searchText} = this.props.route.params;
    this.props.getAllProducts('getAllProducts');
    const {allProducts} = this.props;
    console.log("all Product list----",this.props.allProducts); 

    // (allProducts !== undefined) && (this.setState({productListArray: allProducts}));
    // console.log("Prductlist array: ", this.state.productListArray);

    //------------
    const {productListArray} = this.state;
    let newData;

    (allProducts !== undefined && searchText !== '') ?
    (
    // productListArray = productList,
    // console.log("In if, productListArr: ", productListArray),

     newData = allProducts.filter(item =>{
        const itemData = `${item.product_name.toLowerCase()} ${item.product_material.toLowerCase()}`;
        const searchTxt = searchText.toLowerCase();

        return itemData.indexOf(searchTxt) > -1;
    }),
    this.setState({productListArray: newData})
    
    ) : 
    (
        this.setState({productListArray: allProducts})

    );

    console.log("filtered array: ",newData);
    console.log("productListArray array---: ",productListArray);
    
    //------------
  }

  goBack = () => this.props.navigation.goBack();


  render() {
    console.log("render all Product list----",this.props.allProducts); 
    const {productListArray} = this.state;
    console.log("render all Product list array state----",productListArray); 



    return (
        <View>
        <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle='Searched Products' />
        {(productListArray === undefined) ?
        (<ActivityIndicator />) :
        (<ScrollView style={{marginBottom: StyleConstants.MARGIN_15}}>
            <FlatList
            data={productListArray}
            renderItem={ ({item}) => (
                <TouchableOpacity key={item.product_id} onPress={() => this.props.navigation.navigate('ProductDetail',{productId: item.product_id})}>
                    <View style={styles.productListView}> 
                        <View style={{marginRight:10,}}>
                        <Image
                            style={{width: 80, height: 80}}
                            source={{uri: BASE_URL+item.product_image}}
                        />
                        </View>

                        <View>
                            <Text numberOfLines={2} style={styles.productListName}> {item.product_name} </Text>
                            <Text numberOfLines={2} style={styles.productListMaterial}> {item.product_material} </Text>
                            <View style={{justifyContent:'flex-end', alignItems:'flex-end', }}>
                                <StarRating maxStars={5} rating={Number(item.product_rating)} starSize={15} fullStarColor={StyleConstants.COLOR_FFBA00} />
                            </View>
                            <Text style={styles.productListCost}> Rs. {item.product_cost} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => {item.product_id}}
            ItemSeparatorComponent={() => <View style={{height: 0.5, backgroundColor:StyleConstants.COLOR_9E0100}}/>}
            />
        </ScrollView>)}
    </View>
    );
  }
}

function mapState(state){
    const {allProducts, isLoading} = state.productCategoryReducer;
    return {allProducts, isLoading};
}
const actionCreators = {
    getAllProducts: productActions.getAllProducts,
};

export default connect(mapState,actionCreators)(ProductSearchRes);
