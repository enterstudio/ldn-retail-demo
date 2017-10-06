import React, { Component } from 'react';
import {
    View,
    Image,
    Modal,
    Alert,
    Animated,
    Easing,
    ListView,
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as NotificationActions from '@redux/notification/actions';
import * as ProductActions from '@redux/products/actions';
import * as Q from 'q';
import timer from 'react-native-timer';
import { CartItem } from '@components/shop/';
import { InfoItems } from '@components/shop/';
import {FlipCard} from '@lib/flipcard/';

import { AppColors, AppStyles, AppSizes} from '@theme/';

import {
    Text,
    Alerts,
    Button,
    Card,
    Spacer,
    List,
    ListItem,
    FormInput,
    FormLabel,
    ProgressOverlay
} from '@components/ui/';

/* Styles ==================================================================== */

const LAYER_INDEXES = {
    overlay: 9,
    card: 8
}

const styles = StyleSheet.create({

    scrollView: {},

    summary: {
        width: AppSizes.screen.width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: AppSizes.padding,
        backgroundColor: AppColors.base.greyLight,
        height: 70
    },

    checkout: {},

    checkoutSuccess: {
        width: AppSizes.screen.width,
        backgroundColor: AppColors.base.white,
        padding: AppSizes.paddingSml,
        borderWidth: 7,
        borderBottomWidth: 10,
        borderColor: AppColors.brand.primary,
        height: 140
    },

    checkoutText: {
        textAlign: 'center',
        fontSize: 18,
        color: AppColors.brand.secondary
    },

    basketIcon: {
        width: 70,
        height: 60,
        resizeMode: 'contain'
    },

    emptyBasketContainer: {
        backgroundColor: AppColors.base.white
    },

    cardContainer: {
        position: 'absolute',
        top: -250,
        flex: 1,
        padding: 0,
        zIndex: LAYER_INDEXES.card
    },

    cardImage: {
        width: AppSizes.screen.width,
        resizeMode: 'contain'
    }

});


const mapDispatchToProps = (dispatch) => {
    return ({
        removeFromCart: (item) => {
            dispatch(ProductActions.removeFromCart(item));
        },
        showNotification: (message, deferred) => {
            NotificationActions.showNotification(dispatch, message, deferred)
        }
    })
};

const mapStateToProps = state => ({
    cart: state.products.cart
});

const defaultProps = {
    animationTime: 150,
    cardPosition: -AppSizes.screen.width
};

//TODO seperate container and view
class Cart extends Component {

    timerName = 'cartTimer';

    constructor(props) {
        super(props);
        //this.showRemoveDialog = this.showRemoveDialog.bind(this);
        this.getCartPrice = this.getCartPrice.bind(this);
        this.getCartQuantity = this.getCartQuantity.bind(this);
        this.checkout = this.checkout.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.goToProduct = this.goToProduct.bind(this);
        this.shouldSummaryRender = this.shouldSummaryRender.bind(this);
        this.animateCardIn = this.animateCardIn.bind(this);
        this.animatedCardPosition = new Animated.Value(this.props.cardPosition);
        this.state = {
            selectedIndex: 1,
            checkout: false,
            doFlip: false,
            showInfoItems: false,
            showprogressOverlay: false
        }
    }

    showRemoveDialog(item) {
        const deferred = Q.defer();
        const message = 'Remove from cart?';
        this.props.showNotification(message, deferred);
        const self = this;
        deferred.promise.then(function () {
            timer.setTimeout(this.timerName, () => {
                self.props.removeFromCart(item);
            }, 700);
        });
    }

    getCartQuantity = () => {
        return this.props.cart.length;
    }

    getCartPrice = () => {
        let price = 0;
        this.props.cart.forEach(function (item) {
            price = price + item.price;
        })
        return price;
    }

    animateCardIn = () => {
        Animated.timing(this.animatedCardPosition, {
            duration: this.props.animationTime,
            toValue: 0,
            easing: Easing.linear
        }).start();
    }

    resetCardPosition = () => {
        Animated.timing(this.animatedCardPosition, {
            duration: 1,
            toValue: this.props.cardPosition
        }).start();
    }

    handleRemove = (item) => {
        this.props.removeFromCart(item);
        if (this.state.checkoutInProgress) {
            if (this.state.nextToBeRemoved > 0) {
                this.setState({
                    nextToBeRemoved: this.state.nextToBeRemoved - 1
                });
            }
            else {

                const self = this;
                setTimeout(() => {
                    self.setState({doFlip: true})
                }, 250)

                setTimeout(() => {
                    self.loadInfoItems();
                    this.setState({checkoutInProgress: false})
                }, 650)


            }
        }
    }

    hideProgressOverlay = () => {
        let self = this;
        this.setState({showprogressOverlay: false}, () => {
            setTimeout(() => {
                self.setState({
                    checkout: true,
                    checkoutInProgress: true,
                    nextToBeRemoved: this.props.cart.length - 1,
                    doFlip: false
                });
            }, 200);
        })

    }

    checkout = () => {
        let self = this;
        this.animateCardIn();
        this.setState({showprogressOverlay: true}, () => {
            setTimeout(() => {
                self.resetCardPosition();
                self.hideProgressOverlay();
            }, 1700);
        })

    }

    goToProduct = (item) => {
        Actions.productCart(
            {
                title: item.title,
                product: item,
                complementaryItems: [item, item, item]
            })
    }


    isItemToBeRemoved = (index) => {
        if (this.state.checkoutInProgress) {
            return this.state.nextToBeRemoved === index
        } else {
            return false
        }
    }

    loadInfoItems = () => {
        this.setState({showInfoItems: true})
    };


    shouldSummaryRender = () => {
        if (this.state.checkout) {
            return true;
        } else if (this.props.cart.length === 0) {
            return false;
        } else {
            return true;
        }
    }


    render = () => (
        <View>

            <Animated.View style={[styles.cardContainer, {
                left: this.animatedCardPosition
            }]}>
                <Image
                    source={require('../../assets/images/visa-card.png')}
                    style={[styles.cardImage]}
                />
            </Animated.View>
            <ProgressOverlay color={AppColors.brand.tertiary} size={100} visible={this.state.showprogressOverlay}/>

            {this.props.cart.length === 0 && !this.state.checkout &&
            <View style={styles.emptyBasketContainer}>
                <Text style={[AppStyles.h3, AppStyles.padding, {textAlign: 'center'}]}>Your shopping cart is currently
                    empty</Text>
                <View style={[AppStyles.containerCentered, AppStyles.padding]}>
                    <Image
                        source={require('../../assets/icons/icon-basket-empty.png')}
                        style={[styles.basketIcon]}
                    />
                </View>
            </View>}


            < ScrollView style={styles.scrollView}
                         automaticallyAdjustContentInsets={false}
            >


                <FlatList
                    data={this.props.cart}
                    extraData={this.state}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                      <CartItem
                            item = {item}
                            remove = {this.isItemToBeRemoved(index)}
                            index={index}
                            onRemove={() => this.handleRemove(item)}
                            onPress = {() => this.goToProduct(item)}
                        />
                    )}
                />
                {this.shouldSummaryRender() &&
                <View>
                    <View style={{height: 140, backgroundColor: AppColors.base.white}}>
                        <FlipCard
                            friction={6}
                            perspective={1000}
                            flipHorizontal={true}
                            flipVertical={false}
                            flip={this.state.doFlip}
                            alignHeight={true}
                            clickable={false}
                        >
                            <View style={styles.checkout}>
                                <View style={styles.summary}>
                                    <Text style={AppStyles.h3}>{'Total Qty: ' + this.getCartQuantity()}</Text>
                                    <Text style={AppStyles.h3}>{'Total Price: £' + this.getCartPrice()}</Text>
                                </View>
                                <Button
                                    large
                                    backgroundColor={AppColors.brand.tertiary}
                                    buttonStyle={{height: 70}}
                                    title={'Checkout'}
                                    onPress={() => {this.checkout()}}
                                ></Button>
                            </View>
                            <View style={[styles.checkoutSuccess, styles.checkout]}>
                                <Text
                                    style={[styles.checkoutText]}>{
                                    'Thank you. Your items are being prepared for collection. ' +
                                    'You can pick them up from the nearest counter.'
                                }</Text>
                            </View>
                        </FlipCard>
                    </View>
                    <View>
                        <InfoItems slideIn={this.state.showInfoItems}></InfoItems>
                    </View>
                </View>
                }
            </ScrollView>
        </View>
    )

    componentWillUnmount = () => {
        timer.clearTimeout(this.timerName);
    }

    componentWillReceiveProps(nextProps) {
        const { cart } = nextProps;
        if (this.props.cart.length === 0 && cart.length > 0) {
            this.setState({
                checkout: false,
                doFlip: false,
                showInfoItems: false
            })
        }
    }
}
Cart.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
