import React, { Component } from 'react';
import {
    View,
    Image,
    Modal,
    Text,
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
        height: AppSizes.screen.height / 2,
        borderBottomColor: AppColors.base.grey,
        borderBottomWidth: 1,
        backgroundColor: AppColors.base.white
    },

    productContainer: {
        flexDirection: 'row',
        paddingLeft: 30
    },

    titleText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        padding: 15
    },

    productImage: {
        width: 110,
        height: 160,
    },

    productPrice: {
        padding: 12,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },

    header: {
        alignItems: 'center',
        height: AppSizes.screen.height / 4,
        paddingTop: 15
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
        zIndex: 1,


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
            topHidden: new Animated.Value(this.props.topHidden)
        };
    }

    _slideUp = () => {
        console.log('sliding up');
        Animated.timing(this.state.top, {
            duration: this.props.fadeTime,
            toValue: this.props.topHidden
        }).start();
    }

    slides = this.props.products.map((item, index) => {
        return (
            <View key={`entry-${index}`} style={styles.slide} elevation={5}>
                <TouchableHighlight onPress={this._slideUp}>
                    <View style={styles.card}>
                        <Text style={styles.titleText}>{item.title}</Text>
                        <View style={styles.productContainer}>
                            <Image style={styles.productImage} source={{uri: item.img}}/>
                            <Text style={styles.productPrice}>£{item.price}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    });

    render = () => {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.browserContainer, {top: this.state.top}]}>
                    <View style={styles.header}>
                        <Text style={AppStyles.h1}>{'Item browser'}</Text>
                    </View>
                    <Carousel
                        ref={(carousel) => { this._carousel = carousel; }}
                        sliderWidth={AppSizes.screen.width}
                        itemWidth={AppSizes.screen.widthThreeQuarters}
                        itemheight={AppSizes.screen.heightThreeQuarters}
                        enableMomentum={false}
                        scrollEndDragDebounceValue={50}
                        swipeThreshold={80}
                    >
                        { this.slides }
                    </Carousel>
                </Animated.View>
                <View style={styles.productViewContainer}>
                    <Product product={this.props.products[0]}></Product>
                </View>
            </View>
        );
    }
}

ItemBrowser.defaultProps = defaultProps;
export default connect(mapStateToProps)(ItemBrowser);
