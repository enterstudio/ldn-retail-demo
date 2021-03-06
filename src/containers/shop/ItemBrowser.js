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
    Easing,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Product from './Product';
import { FirebaseImgRef } from '@constants/';
import { addToCart, removeFromCart, removeFromProducts }  from '@redux/products/actions';
import * as NotificationActions from '@redux/notification/actions';
import * as Q from 'q';
import timer from 'react-native-timer';
import { ProductSlide } from '@components/shop/';


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

    browserContainer: {
        position: 'absolute',
        top: 0,
        height: AppSizes.screen.height,
        width: Screen.width,
        backgroundColor: AppColors.base.greyLight,
        overflow: 'hidden',
        zIndex: 1,
    },


    infoHeaderContainer: {
        height: 75
    },

    infoHeader: {
        borderBottomWidth: 1,
        paddingHorizontal: AppSizes.paddingSml,
        height: 60,
        backgroundColor: AppColors.brand.primary
    },

    infoIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: AppSizes.padding,
        zIndex: 1
    },

    infoText: {
        color: AppColors.base.white,
        textAlign: 'center'
    },

    infoIcon: {
        height: 35,
        width: 35,
        resizeMode: 'contain'
    },

    emptyListIcon: {
        width: 70,
        height: 60,
        resizeMode: 'contain'
    }

});

const mapStateToProps = state => ({
    products: state.products.products
});

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item) => {
            dispatch(addToCart(item));
        },
        removeFromCart: (item) => {
            dispatch(removeFromCart(item));
        },
        removeFromProducts: (item) => {
            dispatch(removeFromProducts(item));
        },
        showNotification: (message, deferred, okText, cancelText) => {
            NotificationActions.showNotification(dispatch, message, deferred, okText, cancelText)
        }
    }
};

const defaultProps = {
    timeout: 3000,
    animationTime: 300,
    top: 0,
    topCollapsed: -40
};


//TODO separate container and view
class ItemBrowser extends Component {

    timerName = 'ItemBrowserTimer';

    constructor(props) {
        super(props);
        this.toggleInfoHeader = this.toggleInfoHeader.bind(this);
        this.showRemoveConfirmationDialog = this.showRemoveConfirmationDialog.bind(this);
        this.showAddConfirmationDialog = this.showAddConfirmationDialog.bind(this);
        this.state = {
            top: new Animated.Value(this.props.topCollapsed),
            isInfoHeaderCollapsed: true,
            currentProductIndex: 0,
            slides: this.getSlides(props.products)
        };
    }

    showAddConfirmationDialog(product) {
        const deferred = Q.defer();
        const message = 'Item added to cart. Continue shopping?';
        this.props.showNotification(message, deferred, 'OK', 'Checkout');
        deferred.promise.then(function () {
            },
            function () {
                timer.setTimeout(this.timerName, () => {
                    Actions.shoppingCartTab();
                }, 1000);
            })
    }

    showRemoveConfirmationDialog(product) {
        const deferred = Q.defer();
        const message = 'Remove item from list?';
        this.props.showNotification(message, deferred);
        const self = this;
        deferred.promise.then(function () {
            timer.setTimeout(this.timerName, () => {
                self.props.removeFromProducts(product);
            }, 700);
        });
    }

    toggleInfoHeader = () => {
        Animated.timing(this.state.top, {
            duration: this.props.animationTime,
            toValue: this.state.isInfoHeaderCollapsed ? this.props.top : this.props.topCollapsed,
            easing: Easing.quad
        }).start();
    }


    getSlides = (products) => products.map((item, index) => {
        return (
            <ProductSlide index={index}
                          item={item}
                          addToCart={this.props.addToCart}
                          complementaryItems= {products}
                          removeFromCart={this.props.removeFromCart}
                          removeFromList={this.props.removeFromProducts}
            ></ProductSlide>
        );
    });

    render = () => {
        return (
            <View style={styles.container}>
                {/*Item browser layer*/}
                <Animated.View style={[styles.browserContainer, {top: this.state.top}]}>
                    <View style={styles.infoHeaderContainer}>
                        <View style={styles.infoHeader}>
                            <Text style={[styles.infoText]}>
                                While you are shopping, any items you pick up will be added to the list below.
                            </Text>
                        </View>
                        <View style={styles.infoIconContainer}>
                            <TouchableOpacity onPress={()=>
                            {
                                this.setState({isInfoHeaderCollapsed : !this.state.isInfoHeaderCollapsed});
                                this.toggleInfoHeader();
                            }}>
                                <Image
                                    source={require('../../assets/icons/icon-info-color.png')}
                                    style={[styles.infoIcon]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Spacer size={30}></Spacer>
                    {this.state.slides.length === 0 &&
                    <View style={{backgroundColor: AppColors.base.white}}>
                        <Text style={[AppStyles.h3, AppStyles.padding, {textAlign: 'center'}]}>
                            You currently don't have any browsed items </Text>
                        <View style={[AppStyles.containerCentered, AppStyles.padding]}>
                            <Image
                                source={require('../../assets/icons/icon-list-empty.png')}
                                style={[styles.emptyListIcon]}
                            />
                        </View>
                    </View>
                    }
                    < Carousel
                        ref={(carousel) => { this._carousel = carousel; }}
                        sliderWidth={AppSizes.screen.width}
                        itemWidth={AppSizes.screen.widthThreeQuarters}
                        itemheight={AppSizes.screen.height - 250}
                        enableMomentum={false}
                        scrollEndDragDebounceValue={50}
                        swipeThreshold={70}
                        contentContainerCustomStyle={{borderRadius: 20}}
                    >
                        { this.state.slides }
                    </Carousel>
                </Animated.View>
            </View>
        );
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.products) {
            this.setState({slides: this.getSlides(nextProps.products)});
        }
    }

    componentWillUnmount() {
        timer.clearTimeout(this.timerName);
    }
}

ItemBrowser.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(ItemBrowser);
