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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 75,
    },

    infoHeader: {
        borderBottomWidth: 1,
        paddingHorizontal: AppSizes.paddingSml,
        height: 60,
        backgroundColor: 'yellow'
    },

    infoIcon: {
        position: 'absolute',
        bottom: 0,
        right: AppSizes.padding,
        height: 30,
        width: 30,
        resizeMode: 'contain'
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
    topHidden: -AppSizes.screen.height,
    message: ''
};

//TODO separate container and view
class ItemBrowser extends Component {

    constructor(props) {
        super(props);
        this._slideUp = this._slideUp.bind(this);
        this.state = {
            top: new Animated.Value(this.props.top),
            currentProductIndex: 0
        };
    }

    _slideUp = () => {
        const index = this._carousel.currentIndex;
        this.setState({currentProductIndex: index})
        console.log('sliding up');
        Animated.timing(this.state.top, {
            duration: this.props.fadeTime,
            toValue: this.props.topHidden
        }).start();
    }

    _addToCartCart = () => {

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
                                            onPress={() => this._slideUp()}>
                            <Image
                                source={require('../../assets/icons/icon-zoom.png')}
                                style={[styles.icon]}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.touchable}
                                            underlayColor={AppColors.base.grey}
                                            onPress={() => {
                                            console.log('--> Go to product')
                                            Actions.product()
                                            }}>
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
                        <TouchableHighlight
                            underlayColor='#f1c40f'
                            onPress={() => this._slideUp()}>
                            <Image style={styles.productImage} source={{uri: item.img}}/>
                        </TouchableHighlight>
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
                    <Animated.View style={styles.infoHeaderContainer}>
                        <View style={styles.infoHeader}>
                            <Text style={[AppColors.base.black]}>
                                While you are shopping, any items you pick up will be added to the list below.
                            </Text>
                        </View>
                        <Image
                            source={require('../../assets/icons/icon-info.png')}
                            style={[styles.infoIcon]}
                        />
                    </Animated.View>
                    <Spacer size={100}></Spacer>
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
