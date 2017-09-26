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
    TouchableOpacity,
    TouchableHighlight,
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
} from '@components/ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({

    scrollView: {},

    summary: {
        width: AppSizes.screen.width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: AppSizes.padding,
        backgroundColor: AppColors.base.greyLight,
        height: 80
    },

    checkout: {},

    checkoutSuccess: {
        width: AppSizes.screen.width,
        backgroundColor: AppColors.base.white,
        padding: AppSizes.padding,
        borderWidth: 7,
        borderBottomWidth: 10,
        borderColor: AppColors.brand.primary,
    },

    checkoutText: {
        textAlign: 'center',
        fontSize: 20
    },

    basketIcon: {
        width: 70,
        height: 60,
        resizeMode: 'contain'
    },

    emptyBasketContainer: {
        backgroundColor: AppColors.base.white
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
        this.state = {
            selectedIndex: 1,
            checkout: false,
            doFlip: false,
            showInfoItems: false
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

    handleRemove = (item) => {
        this.props.removeFromCart(item);
        if (this.state.checkout) {
            if (this.state.nextToBeRemoved > 0) {
                this.setState({
                    nextToBeRemoved: this.state.nextToBeRemoved - 1
                });
            }
            else {
                const self = this;
                setTimeout(function () {
                    self.setState({doFlip: true})
                }, 250)

                setTimeout(function () {
                    self.loadInfoItems();
                }, 650)


            }
        }
    }

    checkout = () => {
        this.setState({
            checkout: true,
            quantity: this.getCartQuantity(),
            cartPrice: this.getCartPrice(),
            nextToBeRemoved: this.props.cart.length - 1,
            doFlip: false
        }, () => {
            //this.forceUpdate()
        });
    }

    infoAction = (type) => {

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
        if (this.state.checkout) {
            return this.state.nextToBeRemoved === index
        } else {
            return false
        }
    }

    loadInfoItems = () => {
        console.log('Pushing infoItem');
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
                    <View style={{height: 180}}>
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
                                    buttonStyle={{height: 100}}
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
                    <InfoItems slideIn={this.state.showInfoItems}></InfoItems>
                </View>
                }
            </ScrollView>
        </View>
    )

    componentWillUnmount = () => {
        timer.clearTimeout(this.timerName);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
