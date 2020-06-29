import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image,ScrollView,FlatList, TouchableOpacity } from 'react-native';
import {productActions} from '../../../redux/actions/productActions';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';
import {BASE_URL} from '../../../API/apiConstants';
import {styles, WINDOW_WIDTH} from '../../styles/Styles';
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
        this.props.getAllProducts('getAllProductsInAscending');
        const {allProducts} = this.props;
        // console.log("all Product list----",this.props.allProducts);

        this.getData(allProducts);
    }

    componentDidUpdate(prevProps){
        if(this.props.allProducts !== prevProps.allProducts){
            this.getData(this.props.allProducts);
        }
    }

    getData = (allProducts) => {
        const {searchText} = this.props.route.params;
        const {productListArray} = this.state;
        let newData;

        (allProducts !== undefined && searchText !== '') ?
        (
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

        // console.log("filtered array: ",newData);
        // console.log("productListArray array---: ",productListArray);
    }

    goBack = () => this.props.navigation.goBack();


    render() {
        const {searchText} = this.props.route.params;
        // console.log("render all Product list----",this.props.allProducts); 
        const {productListArray} = this.state;
        // console.log("render all Product list array state----",productListArray); 


        return (
            <View>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle={searchText} />
                {(this.props.allProducts === undefined || this.props.allProducts === '' || productListArray === undefined) ? 
                (
                    <ActivityIndicator size="large" />
                ) :
                (
                    (productListArray.length <= 0) ?
                    (
                        // <ActivityIndicator size='large' />
                        <Text style={[styles.productListCost,{textAlign:'center'}]}> Product Not Found!! </Text>
                    ) :
                    (<ScrollView style={{marginBottom: 50}}>
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

                                    <View style={{width: WINDOW_WIDTH-150}}>
                                    <View>
                                        <Text numberOfLines={2} style={styles.productListName}> {item.product_name} </Text>
                                        <Text numberOfLines={3} style={styles.productListMaterial}> {item.product_material} </Text>
                                    </View>
                                    
                                    <View style={{flex: 1, alignItems: 'flex-end',}}>
                                        <StarRating maxStars={5} rating={Number(item.product_rating)} starSize={15} fullStarColor={StyleConstants.COLOR_FFBA00} />
                                    </View>
                                    <Text style={styles.productListCost}> Rs. {item.product_cost} </Text>
                                </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.product_id}
                        ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor:StyleConstants.COLOR_9E0100}}/>}
                        />
                    </ScrollView>)
                )}
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
