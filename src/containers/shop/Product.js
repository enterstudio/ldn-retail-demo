import React, { Component } from 'react';
import {
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import  SwipeCarousel  from 'react-native-swipe-carousel';
import { connect } from 'react-redux';
import Dash from 'react-native-dash';
import { addToCart }  from '@redux/products/actions';
import * as NotificationActions from '@redux/notification/actions';
import * as Q from 'q';
import timer from 'react-native-timer';
import {AppColors, AppStyles, AppSizes} from '@theme/';

import {
    Text,
    Button,
    Spacer
} from '@components/ui/';


/* Styles ================================= */
const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'column',
        backgroundColor: AppColors.base.white
    },

    scrollContainer: {
        height: AppSizes.screen.height
    },

    header: {
        fontSize: 15,
        color: AppColors.base.black
    },

    imageContainer: {
        paddingVertical: AppSizes.paddingSml,
        backgroundColor: AppColors.base.greyLight
    },

    productImage: {
        height: 300,
        resizeMode: 'contain',
        zIndex: 2
    },

    swoosh: {
       position: 'absolute',
       bottom: 40,
       left: 60,
       width: 310,
       height: 150,
       resizeMode: 'contain',
       opacity: 0.2,
       zIndex: 1
    },

    descriptionContainer: {
        paddingHorizontal: AppSizes.paddingSml
    },

    description: {
        fontSize: 14
    },

    addToCartContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        flex: 2,
        flexDirection: 'row',
        backgroundColor: AppColors.brand.tertiary,
        zIndex: 99
    },

    addToCartBtn: {
        width: 400,
        padding: 30,
        color: AppColors.base.black
    },

    priceContainer: {
        flex: 1,
        paddingTop: 15

    },

    price: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: AppColors.base.black
    },

    slide: {
        width: AppSizes.screen.width,
        borderWidth: 1
    },

    complementaryItem: {
        flexDirection: 'row',
        width: AppSizes.screen.width,
        padding: AppSizes.padding,
        backgroundColor: AppColors.base.greyLight
    },

    complementaryImg: {
        width: 70,
        height: 80,
        resizeMode: 'center'
    },

    complementaryContainer: {
        flexDirection: 'row'
    },

    complementaryTitle: {
        fontSize: 15,
        paddingLeft: AppSizes.paddingSml,
    },

    complementaryPrice: {
        paddingLeft: AppSizes.paddingSml,
        fontSize: 16,
        fontWeight: 'bold'
    },

    iconContainer: {
        position: 'absolute',
        top: AppSizes.paddingSml,
        right: AppSizes.paddingSml
    }

});

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item) => {
            dispatch(addToCart(item));
        },
        showNotification: (message, deferred, okText, cancelText) => {
            NotificationActions.showNotification(dispatch, message, deferred, okText, cancelText)
        }
    }
}

const mapStateToProps = state => ({});

const spacerSize = 80;

const defaultProps = {
    //complementaryItems: []
}

//TODO separate container and view (like menu)
class Product extends Component {

    timerName = 'ProductTimer'

    constructor(props) {
        super(props);
        if (!this.props.complementaryItems) {
            this.props.complementaryItems = []
        }
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


    slides = this.props.complementaryItems.map((item, index) => {
        return (
            <View key={`entry-${index}`} style={styles.slide}>
                <TouchableHighlight>
                    <View style={styles.complementaryItem}>
                        <Image style={styles.complementaryImg} source={{uri: item.img}}/>
                        <View style={[styles.complementaryContainer]}>
                            <View>
                                <Text style={[styles.complementaryTitle]}>{item.title}</Text>
                                <Text style={[styles.complementaryPrice]}>£{item.price}</Text>
                            </View>
                        </View>
                        <View style={[styles.iconContainer]}>
                            <Image
                                source={require('../../assets/icons/icon-pin.png')}
                                style={[AppStyles.smallIcon]}
                            />
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    });


    render = () => {
        return (
            <View style={styles.container}>
                <View style={styles.scrollContainer}>
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <Image style={styles.productImage} source={{uri: this.props.product.img}}/>
                            <Image
                                style={styles.swoosh}
                                source={require('../../assets/images/nike-swoosh.png')}
                            />
                        </View>
                        <Spacer size={50}/>
                        <View style={[styles.descriptionContainer]}>
                            <Text style={[styles.description]}>{this.props.product.description}</Text>
                        </View>
                        <Spacer size={20}></Spacer>
                        <View>
                            <View style={[AppStyles.paddedRow, {justifyContent: 'space-between'}]}>
                                <Text upperCase={true} style={[styles.header]}>{'complementary items'}</Text>
                                <View>
                                </View>
                            </View>
                            <ScrollView
                                horizontal
                                pagingEnabled
                            >
                                {this.slides}
                            </ScrollView>
                        </View>
                        <Spacer size={spacerSize}></Spacer>
                        <Dash style={{width:AppSizes.screen.width, height:1}}/>
                        <View style={[AppStyles.paddedRow, {paddingVertical: AppSizes.padding}]}>
                            <Text style={[AppStyles.h3]}>Available sizes</Text>
                        </View>
                        <Dash style={{width:AppSizes.screen.width, height:1}}/>
                        <View style={[AppStyles.paddedRow, {paddingVertical: AppSizes.padding}]}>
                            <Text style={[AppStyles.h3]}>Available colors</Text>
                        </View>
                        <Dash style={{width:AppSizes.screen.width, height:1}}/>
                        <Spacer size={spacerSize}></Spacer>
                        <TouchableHighlight style={[]}
                                            underlayColor={AppColors.base.grey}
                                            onPress={() => {
                                                Actions.locator();
                                            }
                                       }>
                            <View
                                style={[AppStyles.paddedRow, {justifyContent: 'space-between', backgroundColor: AppColors.base.greyLight}]}>
                                <View style={[{justifyContent: 'center'}]}>
                                    <Text style={[AppStyles.h3]}>View in store location</Text>
                                </View>
                                <Image
                                    source={require('../../assets/icons/icon-location.png')}
                                    style={[AppStyles.largeIcon, { marginRight: 20}]}
                                />
                            </View>
                        </TouchableHighlight>
                        <Spacer size={spacerSize}></Spacer>
                        <View style={[AppStyles.containerCentered]}>
                            <Text style={[AppStyles.h3]}>Need help?</Text>
                            <Image
                                source={require('../../assets/icons/icon-assistant.png')}
                                style={[AppStyles.largeIcon]}
                            />
                            <Button raised={false}
                                    title={'Ask An Assistant'}
                                    backgroundColor={AppColors.base.black}
                                    color={AppColors.base.white}
                                    buttonStyle={{paddingHorizontal: 40 }}
                            ></Button>
                        </View>
                        <Spacer size={230}></Spacer>
                    </ScrollView>
                </View>
                <View style={[styles.addToCartContainer]}>
                    <View style={[styles.priceContainer]}>
                        <Text style={[styles.price]}>£{this.props.product.price}</Text>
                    </View>
                    <View style={{backgroundColor: AppColors.base.black}}>
                    <Button raised={false}
                            title={'Add To Cart'}
                            backgroundColor={'transparent'}
                            fontSize={20}
                            color={AppColors.base.white}
                            buttonStyle={{paddingHorizontal: 30 }}
                            onPress={() => {
                                this.props.addToCart(this.props.product);
                                this.showAddConfirmationDialog(this.props.product)}
                            }></Button>
                        </View>
                </View>
            </View>
        )
    }

    componentWillUnmount() {
        timer.clearTimeout(this.timerName);
    }

}

Product.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Product);
