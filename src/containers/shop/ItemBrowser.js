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
import { addToCart, removeFromProducts }  from '@redux/products/actions';
import * as NotificationActions from '@redux/notification/actions';
import * as Q from 'q';
import timer from 'react-native-timer';
import LSText from 'react-native-letter-spacing';


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
        flexDirection: 'column',
    },

    slide: {
        width: AppSizes.screen.widthThreeQuarters,
        height: AppSizes.screen.height - 250,
        borderBottomColor: AppColors.base.grey,
        borderBottomWidth: 1,
        backgroundColor: AppColors.base.white
    },

    productContainer: {
        width: '100%',
        height: '100%'
    },

    productDetails: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 150,
        paddingTop: AppSizes.padding,
        paddingLeft: AppSizes.padding * 2,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        zIndex: 9
    },

    productImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.9,
        width: AppSizes.screen.width,
        height: AppSizes.screen.height,
        resizeMode: 'contain'
    },

    productText: {
        fontSize: 17,
        color: AppColors.base.black
    },

    productTitle: {
        fontWeight: 'bold'
    },

    productPrice: {
        fontStyle: 'italic',
        fontWeight: 'bold'
    },

    productSize: {
    },

    card: {
        flexDirection: 'column'
    },

    browserContainer: {
        position: 'absolute',
        top: 0,
        height: AppSizes.screen.height,
        width: Screen.width,
        backgroundColor: AppColors.base.greyLight,
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
        top: 25,
        right: 15,
        zIndex: 2
    },

    icon: {
        height: 45,
        width: 45,
        resizeMode: 'contain',
        marginBottom: 20
    },

    touchable: {
        borderRadius: 30,
        //backgroundColor: AppColors.base.white,
        height: 45,
        width: 45,
        marginBottom: 10
    },

    infoHeaderContainer: {
        height: 75
    },

    infoHeader: {
        borderBottomWidth: 1,
        paddingHorizontal: AppSizes.paddingSml,
        height: 60,
        backgroundColor: AppColors.brand.primary,
    },

    infoIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: AppSizes.padding,
        zIndex: 111
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


});

const mapStateToProps = state => ({
    products: state.products.products
});

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item) => {
            dispatch(addToCart(item));
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
    topCollapsed: -40,
    message: ''
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
        const message = 'Item added to cart. Continue shopping';
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
                                            onPress={() => {
                                            this.props.addToCart(item);
                                            this.showAddConfirmationDialog(item);

                                            }}>
                            <Image
                                source={require('../../assets/icons/icon-add-to-cart.png')}
                                style={[styles.icon]}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.touchable}
                                            underlayColor={AppColors.base.grey}
                                            onPress={() => {
                                                this.showRemoveConfirmationDialog(item)
                                            }
                                       }>
                            <Image
                                source={require('../../assets/icons/icon-remove.png')}
                                style={[styles.icon]}
                            />
                        </TouchableHighlight>
                    </View>

                    <View style={styles.productContainer}>
                        <View style={styles.productDetails}>
                            <LSText letterSpacing={2} style={[styles.productText, styles.productTitle]}>{item.title.toUpperCase()}</LSText>
                            <LSText letterSpacing={2} style={[styles.productText, styles.productPrice]}>{'£' + item.price}</LSText>
                            <LSText letterSpacing={2} style={[styles.productText, styles.productSize]}>{'Size: M'}</LSText>
                        </View>
                        <Image style={styles.productImage} source={{uri: item.img}}/>
                    </View>
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
                    <Carousel
                        ref={(carousel) => { this._carousel = carousel; }}
                        sliderWidth={AppSizes.screen.width}
                        itemWidth={AppSizes.screen.widthThreeQuarters}
                        itemheight={AppSizes.screen.height - 250}
                        enableMomentum={false}
                        scrollEndDragDebounceValue={50}
                        swipeThreshold={70}
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
