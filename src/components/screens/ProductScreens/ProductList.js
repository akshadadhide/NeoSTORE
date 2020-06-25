import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, FlatList, SafeAreaView, Text, Image, ScrollView,TouchableOpacity } from 'react-native';
import { styles, WINDOW_WIDTH } from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import CustomHeader from '../../Common/Header';
import StarRating from 'react-native-star-rating';
import {BASE_URL} from '../../../API/apiConstants';
import {getProductList} from '../../../redux/actions/productActions';


class ProductList extends Component {
    
    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            productListArray:[],
            offset: 0, 
            limit: 8,
            isLoading: false,
            isRefreshing: false,
        };
    }
    

    componentDidMount(){
        this.fetchResult(this.page);
    }

    //to update the state with current redux state
    componentDidUpdate(prevProps) {
        if (this.props.productList !== prevProps.productList) {
            this.setState({productListArray: this.props.productList});
        }
    }

    fetchResult = async(page) => {
        const {category_id} = this.props.route.params;
        let type;
        // type='getProductByCateg/'+category_id;
        type = `commonProducts?category_id=${category_id}&pageNo=${page}&perPage=6`;
        // console.log("Type: ",type);
        
        this.setState({isLoading:true});
        await this.props.getProductList(type);

        const {productList} = this.props;
        // console.log("Product list----",productList); 
        if(productList !== undefined){
            let listData = this.state.productListArray;
            let data = listData.concat(productList);
            this.setState({productListArray: data, isLoading:false});
        }
        else{
            this.setState({isLoading:false});
        }
        // console.log("Prductlist array: ", this.state.productListArray);
    };

    handleLoadMore(){
        // console.log("In hLM pg: ",this.page,"isload: ",this.state.isLoading);
        
        if((!this.state.isLoading) && (this.page < 2)){
            this.page = this.page+1;
            this.fetchResult(this.page);
        }
    }

    onRefresh() {
        this.setState({ isRefreshing: true }); //for enable pull to refresh 
        this.page = 1;
        this.fetchResult(this.page);
        this.setState({ isRefreshing: false });
    }
    

    goBack = () => this.props.navigation.goBack();

    searchHandler = (searchText) =>{
        this.props.navigation.navigate('ProductSearchRes',{searchText:searchText});
    }

  render() {
    const {category} = this.props.route.params;
    const {productList,isLoading} = this.props;
    const {productListArray} = this.state;
    // console.log("In render, productListArray: ",productListArray , "productList---:",productList);  
    
        return (
            <SafeAreaView>
            <View>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle={category} rightIconName="search" handleRightIconClick={this.searchHandler} />
                {(productListArray === undefined || productListArray === '') ?
                (<ActivityIndicator size='large' />) :
                (
                <View  style={{padding: StyleConstants.PADDING_10,}}>
                    <FlatList
                    data={productListArray}
                    extraData={this.state}
                    onRefresh={this.onRefresh.bind(this)}
                    refreshing={this.state.isRefreshing}
                    renderItem={ ({item,index}) => (
                        <TouchableOpacity key={index} style={{paddingRight:20}} onPress={() => this.props.navigation.navigate('ProductDetail',{productId: item.product_id, productName: item.product_name})}>
                            <View style={styles.productListView}> 
                                <View style={{paddingRight:10,}}>
                                    <Image
                                        style={{width: 80, height: 80}}
                                        source={{uri: BASE_URL+item.product_image}}
                                    />
                                </View>

                                <View style={{width: WINDOW_WIDTH-150}}>
                                    <View>
                                        <Text numberOfLines={2} style={styles.productListName}> {item.product_name} </Text>
                                        <Text numberOfLines={3} style={styles.productListMaterial}> {item.product_material} </Text>
                                    </View>
                                    
                                    <View style={{flex: 1, alignItems: 'flex-end',}}>
                                        <StarRating maxStars={5} rating={Number(item.product_rating)} starSize={15} fullStarColor={StyleConstants.COLOR_FFBA00} />
                                    </View>
                                    {/* <View> */}
                                        <Text style={styles.productListCost}> Rs. {item.product_cost} </Text>
                                    {/* </View> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item,index) => String(index)}
                    ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor:StyleConstants.COLOR_9E0100}}/>}
                    onEndReachedThreshold={0}
                    onEndReached={this.handleLoadMore.bind(this)}
                    />
                </View>
                )
            }
            </View>
            </SafeAreaView>
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