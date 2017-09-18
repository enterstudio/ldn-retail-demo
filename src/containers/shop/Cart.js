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
        this.showRemoveDialog = this.showRemoveDialog.bind(this);
        this.getCartPrice = this.getCartPrice.bind(this);
        this.getCartQuantity = this.getCartQuantity.bind(this);
        this.handleRemove =  this.handleRemove.bind(this);
        this.state = {
            selectedIndex: 1
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
    }

    render = () => (
        <View>

            {this.props.cart.length === 0 &&
            <View>
                <Text style={[AppStyles.h3, AppStyles.padding, {textAlign: 'center'}]}>Your shopping cart is currently
                    empty</Text>
            </View>}

            < ScrollView style={styles.scrollView}
                         automaticallyAdjustContentInsets={false}
            >
                <FlatList
                    data={this.props.cart}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                      <CartItem
                            item = {item}
                            index={index}
                            onRemove={() => this.handleRemove(item)}
                        />
                    )}
                />
                {this.props.cart.length > 0 &&
                <View>
                    <View style={styles.summary}>
                        <Text style={AppStyles.h3}>{'Total Qty: ' + this.getCartQuantity()}</Text>
                        <Text style={AppStyles.h3}>{'Total Price: £' + this.getCartPrice()}</Text>
                    </View>
                    <Button
                        title={'Checkout'}
                        style={styles.checkoutBtn}
                        onPress={() => {}}
                    ></Button>
                </View>
                }
            </ScrollView>
        </View>
    )

    componentWillUnmount() {
        timer.clearTimeout(this.timerName);
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
