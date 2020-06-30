import React, { Component } from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import { styles } from '../styles/Styles';
import {StyleConstants} from '../styles/Constants';
import {SliderBox} from 'react-native-image-slider-box';
import ProductCard from '../Common/productCard';
import CustomHeader from '../Common/Header';
import {getCarouselImages} from '../../redux/actions/productActions';

class Home extends Component {

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.getCarouselImages();
          });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    handleToggleDrawer = () => this.props.navigation.toggleDrawer();

    searchHandler = (searchText) =>{
        this.props.navigation.navigate('ProductSearchRes',{searchText:searchText});
    }

    render() {
       const {images} = this.props;
       const {isLoading} = this.props;
       const {categoryId} = this.props;
    //    console.log("in render images",images, "isloading state:   ", isLoading);
    //    console.log("category ids in home", categoryId);
       
        return (
            <ScrollView style={{flex: 1,}}>
                <CustomHeader iconName="bars"  handleLeftIconClick={this.handleToggleDrawer} headerTitle='NeoSTORE' rightIconName="search" handleRightIconClick={this.searchHandler} {...this.props} />
                
                {(isLoading === false) ?
                    (<View>
                        <SliderBox 
                            images={images} 
                            sliderBoxHeight= {StyleConstants.CAROUSEL_IMG_HEIGHT} 
                            inactiveDotColor={StyleConstants.COLOR_E91C1A} 
                            dotStyle={styles.carouselDotStyle} 
                            autoplay={true} 
                            onCurrentImagePressed={ (index) => {
                                    const prodNameArr = ['Sofa','Bed','Chair','Table','Almirah']
                                    this.props.navigation.navigate('ProductList',{category:prodNameArr[index], category_id:categoryId[index]});
                            }}
                        />
                        <View style={{flex:1, marginBottom: 20, }}>
                            <View style={styles.homeProductsContainer}>
                            <ProductCard categoryName='Sofa' category_id={categoryId[0]} iconName='couch' alignIcon={{ alignSelf: 'flex-end',}} {...this.props} />
                            <ProductCard categoryName='Bed' category_id={categoryId[1]} iconName='bed' styleCard={{ flexDirection:'column-reverse',}} alignTitle={{ alignSelf: 'flex-end',}} {...this.props} />
                            </View>

                            <View style={[styles.homeProductsContainer, {marginTop: 12, }]}>
                                <ProductCard categoryName='Chair' category_id={categoryId[2]} iconName='chair' alignIcon={{ alignSelf: 'flex-end',}} {...this.props} />
                                <ProductCard categoryName='Table' category_id={categoryId[3]} iconName='table' styleCard={{ flexDirection:'column-reverse',}} alignTitle={{ alignSelf: 'flex-end',}} {...this.props} />       
                            </View>

                            <View style={[styles.homeProductsContainer, {marginTop: 12, }]}>
                                <ProductCard categoryName='Almirah' category_id={categoryId[4]} iconName='dungeon' alignIcon={{ alignSelf: 'flex-end',}} {...this.props} />
                            </View>

                        </View>
                    </View>) :
                    (<ActivityIndicator size="large" />)}


            </ScrollView>
        );
    }
}



function mapState(state) {
    const {images, isLoading, categoryId} = state.productCategoryReducer;
    return {images, isLoading, categoryId};
}
const actionCreators = {
    getCarouselImages: getCarouselImages,
};

const connectedHome = connect(mapState,actionCreators)(Home);
export {connectedHome as Home};