import React, { Component } from 'react';
import {
    View,
    Image,
    Modal,
    Alert,
    ListView,
    FlatList,
    ScrollView,
    StyleSheet,
    Platform,
    Dimensions,
    Animated,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Product from './Product';
import { FirebaseImgRef } from '@constants/';


import { AppColors, AppStyles, AppSizes} from '@theme/';

import {
    Alerts,
    Button,
    Text,
    Card,
    Spacer,
    List,
    ListItem,
    FormInput,
    FormLabel,
} from '@components/ui/';

const Screen = Dimensions.get('window');

/* Styles ==================================================================== */
const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column'
    },

    slide: {
        width: AppSizes.screen.widthThreeQuarters,
        height: AppSizes.screen.height - 250,
        borderBottomColor: AppColors.base.grey,
        borderBottomWidth: 1,
        backgroundColor: AppColors.base.greyLight
    },

    productContainer: {
        alignItems: 'center'
    },

    titleText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        padding: 15
    },

    productImage: {
        width: AppSizes.screen.widthThreeQuarters - 50,
        height: AppSizes.screen.height - 300,
        resizeMode: 'center'
    },

    productPrice: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },

    card: {
        flexDirection: 'column'
    },

    browserContainer: {
        position: 'absolute',
        top: 0,
        height: AppSizes.screen.height,
        width: Screen.width,
        backgroundColor: AppColors.base.white,
        overflow: 'hidden',
        // borderRadius: 12,
        zIndex: 13,
    },

    productViewContainer: {
        position: 'absolute',
        top: 0,
        height: AppSizes.screen.height,
        width: Screen.width,
        backgroundColor: AppColors.base.white,
        overflow: 'hidden',
        // borderRadius: 12,
        zIndex: 1
    },

    iconContainer: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 2
    },

    icon: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        marginBottom: 15
    },

    infoHeaderContainer: {
        height: 75
    },

    infoHeader: {
        borderBottomWidth: 1,
        paddingHorizontal: AppSizes.paddingSml,
        height: 60,
        backgroundColor: AppColors.base.greyDark,
    },

    infoIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: AppSizes.padding,
        zIndex: 111
    },

    infoIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain',

    },

    touchable: {
        height: 40,
        width: 40
    }

});

const mapStateToProps = state => ({
    products: state.products.products
});


const defaultProps = {
    timeout: 3000,
    fadeTime: 500,
    top: 0,
    topCollapsed: -45,
    message: ''
};

//TODO separate container and view
class ItemBrowser extends Component {

    constructor(props) {
        super(props);
        this._toggleInfoHeader = this._toggleInfoHeader.bind(this);
        this.state = {
            top: new Animated.Value(this.props.topCollapsed),
            isInfoHeaderCollapsed: true,
            currentProductIndex: 0
        };
    }

    _toggleInfoHeader = () => {
        if(!this.state.isInfoHeaderCollapsed) {
            console.log('collapsing header')
            Animated.timing(this.state.top, {
                duration: this.props.fadeTime,
                toValue: this.props.topCollapsed
            }).start();
        } else {
            console.log('uncollapsing header')
            Animated.timing(this.state.top, {
                duration: this.props.fadeTime,
                toValue: this.props.top
            }).start();
        }
    }

    _addToCart = () => {

    }

    _removeFromCart = () => {

    }


    slides = this.props.products.map((item, index) => {
        return (
            <View key={`entry-${index}`} style={styles.slide} elevation={5}>

                <View style={styles.card}>
                    <View style={[styles.iconContainer]}>

                        <TouchableHighlight style={styles.touchable}
                                            underlayColor={AppColors.base.grey}
                                            onPress={() => {
                                            const product = this.props.products[this._carousel.currentIndex];
                                            Actions.productBrowser(
                                                 {
                                                 title: product.title,
                                                 product: product,
                                                 complementaryItems: this.props.products
                                                 })
                                            }
                                            }>

                            <Image
                                source={require('../../assets/icons/icon-zoom.png')}
                                style={[styles.icon]}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.touchable}
                                            underlayColor={AppColors.base.grey}
                                            onPress={() => this._addToCart()}>
                            <Image
                                source={require('../../assets/icons/icon-add-to-cart.png')}
                                style={[styles.icon]}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.touchable}
                                            underlayColor={AppColors.base.grey}
                                            onPress={() => this._removeFromCart()}>
                            <Image
                                source={require('../../assets/icons/icon-remove.png')}
                                style={[styles.icon]}
                            />
                        </TouchableHighlight>
                    </View>
                    <Text style={[styles.titleText]}>{item.title}</Text>
                    <View style={styles.productContainer}>
                            <Image style={styles.productImage} source={{uri: item.img}}/>
                    </View>
                    <Text style={[styles.productPrice]}>£{item.price}</Text>
                </View>
            </View>
        );
    });

    render = () => {
        return (
            <View style={styles.container}>
                {/*Item browser layer*/}
                <Animated.View style={[styles.browserContainer, {top: this.state.top}]}>
                    <View style={styles.infoHeaderContainer}>
                        <View style={styles.infoHeader}>
                            <Text style={[{color: AppColors.base.white}]}>
                                While you are shopping, any items you pick up will be added to the list below.
                            </Text>
                        </View>
                        <View style={styles.infoIconContainer}>
                            <TouchableOpacity onPress={()=>
                            {
                                this.setState({isInfoHeaderCollapsed : !this.state.isInfoHeaderCollapsed});
                                this._toggleInfoHeader();
                            }}>
                                <Image
                                    source={require('../../assets/icons/icon-info.png')}
                                    style={[styles.infoIcon]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Spacer size={30}></Spacer>
                    <Carousel
                        ref={(carousel) => { this._carousel = carousel; }}
                        sliderWidth={AppSizes.screen.width}
                        itemWidth={AppSizes.screen.widthThreeQuarters}
                        itemheight={AppSizes.screen.height - 250}
                        enableMomentum={false}
                        scrollEndDragDebounceValue={50}
                        swipeThreshold={70}
                    >
                        { this.slides }
                    </Carousel>
                </Animated.View>
                {/*ProductView layer*/}
                <View style={styles.productViewContainer}>
                    <Text style={[AppStyles.h1]}>Product</Text>
                </View>
            </View>
        );
    }
}

ItemBrowser.defaultProps = defaultProps;
export default connect(mapStateToProps)(ItemBrowser);
