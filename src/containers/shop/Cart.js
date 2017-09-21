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
    Animated,
    Easing,
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

    checkoutBtn: {
        margin: 10
    },

    scrollView: {
        backgroundColor: AppColors.base.greyLight
    },

    summary: {
        width: AppSizes.screen.width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: AppSizes.padding,
        backgroundColor: AppColors.base.grey
    },

    checkout: {
        height: 150
    },

    checkoutSuccess: {
        width: AppSizes.screen.width,
        backgroundColor: AppColors.base.greylight,
        padding: AppSizes.padding
    },

    checkoutText: {
        textAlign: 'center',
        fontSize: 20
    },

    infoContainer: {
        height: 500,
        flexDirection: 'column'
    },
    infoItem: {
        height: 100,
        width: '100%',
        flexDirection: 'row'
    },
    infoText: {
        textAlign: 'center'
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
        this.yTranslate = new Animated.Value(0);
        this.state = {
            selectedIndex: 1,
            checkout: false,
            doFlip: false,
            showInfoItems: false
        }
    }

    animateInfoItems = () => {
            Animated.spring(
                this.yTranslate,
                {
                    toValue: 1,
                    friction: 7
                }
            ).start();
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
                }, 150)

            }
        }
    }

    checkout = () => {
        this.setState({
            checkout: true,
            quantity: this.getCartQuantity(),
            cartPrice: this.getCartPrice(),
            nextToBeRemoved: this.props.cart.length - 1,

        }, () => {
             setTimeout(() => {
                 this.animateInfoItems()
             }, 1000)
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



    render = () => {

        const translateY = this.yTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -500]
        });

        const animatedStyles = [
            {
                position: 'absolute',
                bottom: -500,
                height: 500,
                width: AppSizes.screen.width
            },
            {
                transform: [
                    {
                        translateY: translateY
                    }
                ]
            }
        ];

        return (
            <View>

                {this.props.cart.length === 0 && !this.state.checkout &&
                <View>
                    <Text style={[AppStyles.h3, AppStyles.padding, {textAlign: 'center'}]}>Your shopping cart is
                        currently
                        empty</Text>

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
                    {this.props.cart.length > 0 && !this.state.checkout &&
                    <View style={styles.checkout}>
                        <View style={styles.summary}>
                            <Text style={AppStyles.h3}>{'Total Qty: ' + this.getCartQuantity()}</Text>
                            <Text style={AppStyles.h3}>{'Total Price: £' + this.getCartPrice()}</Text>
                        </View>
                        <Button
                            title={'Checkout'}
                            style={styles.checkoutBtn}
                            onPress={() => {this.checkout()}}>
                        </Button>
                    </View>
                    }
                    {this.state.checkout &&
                    <View>
                        <FlipCard
                            perspective={1000}
                            flipHorizontal={true}
                            flipVertical={false}
                            flip={this.state.doFlip}
                            alignHeight={true}
                            clickable={false}
                        >
                            <View style={styles.checkout}>
                                <View style={styles.summary}>
                                    <Text style={AppStyles.h3}>{'Total Qty: ' + this.state.quantity}</Text>
                                    <Text style={AppStyles.h3}>{'Total Price: £' + this.state.cartPrice}</Text>
                                </View>
                                <Button
                                    title={'Checkout'}
                                    style={styles.checkoutBtn}
                                    onPress={() => {}}>
                                </Button>
                            </View>
                            <View style={[styles.checkoutSuccess, styles.checkout]}>
                                <Text
                                    style={[styles.checkoutText]}>{
                                    'Thank you. Your items are being prepared for collection. ' +
                                    'You can pick them up from the nearest counter.'
                                }</Text>
                            </View>
                        </FlipCard>
                        <View style={styles.infoContainer}>
                            <Animated.View style={[animatedStyles]}>
                                <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                                    <View >
                                        <View style={[styles.infoItem, { backgroundColor: AppColors.base.greyDark}]}>
                                            <Text style={[styles.infoText]}>
                                                {'Have your items delivered instead'}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                                    <View>
                                        <View style={[styles.infoItem, { backgroundColor: AppColors.base.greyDark}]}>
                                            <Text style={[styles.infoText]}>
                                                {'View counter location'}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                                    <View>
                                        <View style={[styles.infoItem, { backgroundColor: AppColors.base.grey}]}>
                                            <Text style={[styles.infoText]}>
                                                {'View receipt'}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                    }
                </ScrollView>
            </View>
        )

    }

    componentWillUnmount = () => {
        timer.clearTimeout(this.timerName);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
