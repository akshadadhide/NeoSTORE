import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, FlatList, Text, Image, ScrollView,TouchableOpacity } from 'react-native';
import { styles } from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import CustomHeader from '../../Common/Header';
import StarRating from 'react-native-star-rating';
import {BASE_URL} from '../../../API/apiConstants';
import {getProductList} from '../../../redux/actions/productActions';


class ProductList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            productListArray:[],
        };
    }
    

    async componentDidMount(){
        const {category_id} = this.props.route.params;
        // console.log("cat id=",category_id);
        let type;
    
        type = 'commonProducts?category_id='+category_id+'&pageNo=1&perPage=10';
        // console.log("type = ",type);
        await this.props.getProductList(type);

        const {productList} = this.props;
        console.log("Product list----",productList); 
        (productList !== undefined) && (this.setState({productListArray: productList}));
        console.log("Prductlist array: ", this.state.productListArray);
    }

    //to update the state with current redux state
    componentDidUpdate(prevProps) {
        if (this.props.productList !== prevProps.productList) {
            this.setState({productListArray: this.props.productList});
        }
    }

    

    goBack = () => this.props.navigation.goBack();

    searchHandler = (searchText) =>{
        console.log("On search handler, searchText=", searchText);
        console.log("Prductlist array: ", this.state.productListArray);

        const {productList} = this.props;
        const {productListArray} = this.state;
        let newData;

        (productListArray !== '' && searchText !== '') ?
        (
        // productListArray = productList,
        // console.log("In if, productListArr: ", productListArray),

         newData = productList.filter(item =>{
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

  render() {
    const {category} = this.props.route.params;
    const {productList,isLoading} = this.props;
    const {productListArray} = this.state;
    console.log("In render, productListArray: ",productListArray , "productList---:",productList);  
    
        return (
            <View>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle={category} rightIconName="search" handleRightIconClick={this.searchHandler} />
                {(productList === undefined) ?
                (<ActivityIndicator />) :
                (<ScrollView style={{marginBottom: StyleConstants.MARGIN_15}}>
                    <FlatList
                    data={(productListArray.length <= 0 && productList !== undefined)?(productList):(productListArray)}
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
                    keyExtractor={(item,index) => item.product_id}
                    ItemSeparatorComponent={() => <View style={{height: 0.5, backgroundColor:StyleConstants.COLOR_9E0100}}/>}
                    />

                    <View style={{height:50}}></View>
                </ScrollView>)
            }
            </View>
        );
  }
}

function mapState(state){
    const {productList, isLoading} = state.productCategoryReducer;
    return {productList, isLoading};
}
const actionCreators = {
    getProductList: getProductList,
};

const connectedProductList = connect(mapState,actionCreators)(ProductList);
export {connectedProductList as ProductList};