import {StyleSheet, Dimensions} from 'react-native';
import {StyleConstants} from './Constants';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: StyleConstants.COLOR_FFFFFF,
        backgroundColor: StyleConstants.COLOR_E91C1A,
        
    },

    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        color: StyleConstants.COLOR_FFFFFF,
        // backgroundColor: StyleConstants.COLOR_E91C1A,
        padding: StyleConstants.PADDING,
    },

    whiteText: {
        color: StyleConstants.COLOR_FFFFFF,
        fontWeight: StyleConstants.FONT_MEDIUM,
        fontSize: StyleConstants.FONT_20,
        

    },
    brandName: {
        color: StyleConstants.COLOR_FFFFFF,
        fontSize: StyleConstants.FONT_45,
        fontWeight: StyleConstants.FONT_BOLD,
        paddingBottom: 49,
    },
    header:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        backgroundColor: StyleConstants.COLOR_E91C1A,

    },
    headerText:{
        fontSize: StyleConstants.FONT_26,
        fontWeight: StyleConstants.FONT_BOLD,
        color: StyleConstants.COLOR_FFFFFF,
        alignSelf:'center',
    },

    textboxStyle: {
        width: StyleConstants.TEXTBOX_WIDTH,
        height: StyleConstants.TEXTBOX_HEIGHT,
        borderColor:StyleConstants.COLOR_FFFFFF,
        borderWidth: 7,
        color: StyleConstants.COLOR_FFFFFF,
        marginBottom: StyleConstants.TEXTBOX_MARGIN_BOTTOM,
        padding: StyleConstants.PADDING,
    },


    textBoxIcon:{
        color:"#ffffff", 
        marginRight:10,
    },

    inputBoxText:{
        color: StyleConstants.COLOR_FFFFFF,
        fontSize: StyleConstants.FONT_18,
        fontWeight:StyleConstants.FONT_MEDIUM,

    },

    //Error
    errorText:{
        fontSize: StyleConstants.FONT_18,
        color: StyleConstants.COLOR_FFBA00,
        paddingBottom: StyleConstants.PADDING_10
        
    },
    //Error

    searchInputBox:{
        height: 35, 
        width: WINDOW_WIDTH/4, 
        borderColor: 'white', 
        borderWidth: 1, 
        borderRadius: 10,
        textAlign:'center',
        color:StyleConstants.COLOR_FFFFFF,
    },

    button:{
        backgroundColor:'rgba(255,255,255,0.6)',
        width: StyleConstants.BUTTON_WIDTH,
        height: StyleConstants.BUTTON_HEIGHT,
        borderRadius: StyleConstants.BUTTON_RADIUS,
        alignItems:'center',
        justifyContent: 'center',
        marginBottom: StyleConstants.BUTTON_MARGIN_BOTTOM,
        marginTop: StyleConstants.BUTTON_MARGIN_TOP,
    },

    buttonText:{
        color: StyleConstants.COLOR_E91C1A,
        fontSize: StyleConstants.FONT_26,
        fontWeight: StyleConstants.FONT_MEDIUM,
        padding: StyleConstants.PADDING,
        
    },
    
    linkText:{
        color:StyleConstants.COLOR_FFFFFF,
        fontWeight: StyleConstants.FONT_MEDIUM,
        fontSize: StyleConstants.FONT_18,
    },

    checkboxStyle:{
        marginRight:12,
        color:StyleConstants.COLOR_FFFFFF,
    },

    genderContainer:{
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 35,
        color:StyleConstants.COLOR_FFFFFF,
    },

    homeCarouselImg:{
        height: StyleConstants.CAROUSEL_IMG_HEIGHT,
    },
    carouselDotStyle:{
        width: StyleConstants.CAROUSEL_DOT_WIDTH,
        height: StyleConstants.CAROUSEL_DOT_HEIGHT, 
        borderRadius: StyleConstants.CAROUSEL_DOT_BR,
    },

    homeProductsContainer:{
        flex:1, 
        flexDirection:'row', 
        justifyContent: 'space-evenly', 
        marginTop: 15, 
    },

    homeProductsCard:{
        backgroundColor:StyleConstants.COLOR_E91C1A, 
        height: (WINDOW_WIDTH/2) - 20, 
        width: (WINDOW_WIDTH/2) - 20,
        // justifyContent: 'center',
        borderRadius: 7,
        padding: StyleConstants.PADDING_10,
        
    },

    homeProductsCardText:{
        fontSize:StyleConstants.FONT_30, 
        fontWeight:StyleConstants.FONT_BOLD, 
        color:StyleConstants.COLOR_FFFFFF,
        alignSelf:'flex-start',
        
    },

    /*sidebar starts */
    sidebarLink:{
        color: StyleConstants.COLOR_FFFFFF,
        fontSize: StyleConstants.FONT_18,
        fontWeight: StyleConstants.FONT_BOLD,
    },
    sidebarUserLogo:{
        borderRadius:100, 
        borderWidth:3, 
        backgroundColor:StyleConstants.COLOR_FFFFFF, 
        alignSelf:'center' ,
        alignItems:'center',
        justifyContent:'center',
        padding:30,
    },
    sidebarUserImage:{
        alignSelf:'center',
        borderRadius:100, 
        borderWidth:3, 
        borderColor:StyleConstants.COLOR_FFFFFF,
    },
    cartCount:{
        backgroundColor: StyleConstants.COLOR_FE3F3F, 
        marginLeft: 20, 
        padding:15, 
        borderRadius:100, 
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        width:60, 
        height:60,
        alignItems:'center',
        justifyContent:'center',
    },
    
    /*sidebar ends */

   
    /*Product List starts*/
    productListView:{
        flex: 1,
        flexDirection: 'row',
        padding: StyleConstants.PADDING_10,

    },
    productListName:{
        color: StyleConstants.COLOR_000000,
        fontSize: StyleConstants.FONT_18,
        fontWeight: StyleConstants.FONT_MEDIUM,
    },
    productListMaterial:{
        color: StyleConstants.COLOR_111111,
        fontSize: StyleConstants.FONT_13,
        
    },
    productListCost:{
        color: StyleConstants.COLOR_FE3F3F,
        fontSize: StyleConstants.FONT_26,
        fontWeight: StyleConstants.FONT_BOLD,
    },
    /*Product List ends*/

    /* row and space-between */
    rowSpaceBetween:{
        flexDirection:'row', 
        justifyContent:'space-between' 
    },

    /*Product detail starts*/
    productDetailView1:{
        flex:2, 
        backgroundColor: StyleConstants.COLOR_FFFFFF, 
        padding:StyleConstants.PADDING, 
    },
    productDetailView2:{
        flex:3, 
        backgroundColor: StyleConstants.COLOR_EDEDED, 
        padding:StyleConstants.PADDING,
    },
    productDetailView21:{
        backgroundColor: StyleConstants.COLOR_FFFFFF, 
        padding:StyleConstants.PADDING,
    },
    productDetailTitle:{
        fontSize:StyleConstants.FONT_23,
        color:StyleConstants.COLOR_000000,
        fontWeight: StyleConstants.FONT_MEDIUM,
        marginBottom: StyleConstants.MARGIN_15,
    },
    productDetailCategory:{
        fontSize:StyleConstants.FONT_23,
        color:StyleConstants.COLOR_4F4F4F,
    },
    productDetailMaterial:{
        fontSize:StyleConstants.FONT_18,
        color:StyleConstants.COLOR_4F4F4F,
        
    },
    productDetailImage:{
        height:StyleConstants.PRODUCT_DETAIL_IMG_HEIGHT, 
        width:StyleConstants.PRODUCT_DETAIL_IMG_WIDTH, 
        marginTop:30, 
        alignSelf:'center'
    },
    productDetailSubImage:{
        height: StyleConstants.PRODUCT_DETAIL_SUBIMG_HEIGHT,
        width: StyleConstants.PRODUCT_DETAIL_SUBIMG_WIDTH,
        marginTop: StyleConstants.MARGIN_15,
        borderWidth: 1,
        borderColor: StyleConstants.COLOR_7F7F7F,
    },
    productDetailView22:{
        backgroundColor: StyleConstants.COLOR_FFFFFF, 
        padding:StyleConstants.PADDING,
        marginTop: 10,
    },
    addToCartButton:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 80,                                                    
        right: 10,
        height:70,
        backgroundColor:StyleConstants.COLOR_3366FF,
        borderRadius:100,
    },
    TabNavButton:{
        width: 150,
        height: StyleConstants.BUTTON_HEIGHT,
        borderRadius: 5,
        alignItems:'center',
        justifyContent: 'center',
        // marginBottom: StyleConstants.BUTTON_MARGIN_BOTTOM,
        // marginTop: StyleConstants.BUTTON_MARGIN_TOP,
    },

    TabNavButtonText:{
        color: StyleConstants.COLOR_FFFFFF,
        fontSize: StyleConstants.FONT_20,
        fontWeight: StyleConstants.FONT_MEDIUM,
        alignSelf: 'center',
        
    },
    /*Product detail ends*/

    /* Order Summary starts */
    orderSummaryView:{
        backgroundColor:StyleConstants.COLOR_FFFFFF, 
        padding:StyleConstants.PADDING, 
        marginBottom: 10,
        borderBottomWidth: 4,
        borderRadius: 2,
        borderBottomColor: StyleConstants.COLOR_000000,
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,

    },
    /* Order Summary ends*/

    /*Add Address*/
        addressInput:{
            height: 40, 
            backgroundColor: StyleConstants.COLOR_FFFFFF,
            marginTop: StyleConstants.MARGIN_15,
            marginBottom: StyleConstants.MARGIN_15,
            fontSize: StyleConstants.FONT_18,
            fontWeight:StyleConstants.FONT_MEDIUM,

        },
        saveAdrrButton:{
            backgroundColor:StyleConstants.COLOR_E91C1A,
            height:70,
            margin:7, 
            borderRadius:5,
        },
    /*Add Address*/ 

    /* Edit Profile */
    calender: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        
    },
    /* Edit Profile */
    
    
});