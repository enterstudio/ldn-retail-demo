import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, Easing, TouchableHighlight} from 'react-native';
import { Text } from '@components/ui/';
import LSText from 'react-native-letter-spacing';
import { AppColors, AppStyles, AppSizes} from '@theme/';
import { Actions } from 'react-native-router-flux';

const LAYER_INDEXES = {
    productDetails: 3,
    iconContainer: 2,
    productViewContainer: 1,

}

const CONF = {
    timeout: 3000,
    animationTime: 400,
    imageTop: 0,

}

/* Styles ================================= */
const styles = StyleSheet.create({

    slide: {
        width: AppSizes.screen.widthThreeQuarters,
        height: AppSizes.screen.height - 250,
        borderBottomColor: AppColors.base.grey,
        borderBottomWidth: 1,
        backgroundColor: AppColors.base.white,
        borderRadius: 15
    },

    productContainer: {
        width: '100%',
        height: '100%'
    },

    productDetails: {
        position: 'absolute',
        bottom: -5,
        left: 0,
        right: 0,
        height: 150,
        paddingTop: AppSizes.padding,
        paddingLeft: AppSizes.padding * 2,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        zIndex: LAYER_INDEXES.productDetails
    },

    productImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        //opacity: 0.9,
        width: AppSizes.screen.width - 100,
        height: AppSizes.screen.height - 100,
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

    productSize: {},

    card: {
        flexDirection: 'column'
    },

    productViewContainer: {
        position: 'absolute',
        top: 0,
        height: AppSizes.screen.height,
        width: AppSizes.screen.width,
        backgroundColor: AppColors.base.white,
        overflow: 'hidden',
        borderRadius: 20,
        zIndex: LAYER_INDEXES.productViewContainer
    },

    iconContainer: {
        position: 'absolute',
        top: 25,
        right: 15,
        zIndex: LAYER_INDEXES.iconContainer
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
        marginBottom: 10,
        alignSelf: 'flex-end'
    },

    actionContainer: {
        height: 45,
        width: 45,
        backgroundColor: AppColors.base.black,
        borderRadius: 30,
        marginBottom: 10
    },

    stepperContainer: {
        width: 300,
        height: 100,
        flexDirection: 'row',
        backgroundColor: AppColors.brand.tertiary

    },

    stepperIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },

    stepperCounter: {
        color: AppColors.base.greyDark
    }

});


class ProductSlide extends Component {

    constructor(props) {
        super(props);
        this.animateAddToCart = this.animateAddToCart.bind(this);
        this.state = {
            imageScale: new Animated.Value(1),
            imageTop: new Animated.Value(0),
            stepperCounter:  1
        }
    }

    animateAddToCart = () => {

        console.log('animate to cart');
        Animated.sequence([
            Animated.timing(this.state.imageScale, {
                duration: CONF.animationTime,
                toValue: 1.1,
                easing: Easing.quad
            }),

            Animated.parallel([
                Animated.timing(this.state.imageScale, {
                    duration: 200,
                    toValue: 0.2,
                    easing: Easing.quad
                }),
                Animated.timing(this.state.imageTop, {
                    duration: 200,
                    toValue: -50,
                    easing: Easing.quad
                })
            ]),

            Animated.timing(this.state.imageTop, {
                duration: CONF.animationTime,
                toValue: 50,
                easing: Easing.quad
            })
        ]).start();
    }


    getProductTitle = (title) => {
        if (title) {
            return title.toUpperCase();
        } else {
            return 'undefined'
        }
    }


    render() {

        return (

            <View key={`entry-${this.props.index}`} style={styles.slide} elevation={5}>

                <View style={styles.card}>
                    <View style={[styles.iconContainer]}>

                        <TouchableHighlight style={styles.touchable}
                                            underlayColor={AppColors.base.grey}
                                            onPress={() => {

                                                Actions.productBrowser(
                                                     {
                                                     title: this.getProductTitle(this.props.item.title),
                                                     product: this.props.item,
                                                     complementaryItems: []
                                                     })
                                                }
                                            }>

                            <Image
                                source={require('../../assets/icons/icon-zoom.png')}
                                style={[styles.icon]}
                            />
                        </TouchableHighlight>

                        <View style={styles.actionContainer}>
                            <TouchableHighlight style={styles.touchable}
                                                underlayColor={AppColors.base.grey}
                                                onPress={() => {
                                             this.props.addToCart(this.props.item);
                                             this.props.showAddConfirmationDialog(this.props.item);

                                            }}>
                                <Image
                                    source={require('../../assets/icons/icon-add-to-cart.png')}
                                    style={[styles.icon]}
                                />
                            </TouchableHighlight>
                            <View style={styles.stepperContainer}>
                                {/* <Image
                                    source={require('../../assets/icons/icon-minus-white.png')}
                                    style={[styles.stepperIcon]}
                                />*/}

                               <Text style={styles.stepperCounter}>{this.state.stepperCounter}</Text>

                                {/*
                                <Image
                                    source={require('../../assets/icons/icon-plus-white.png')}
                                    style={[styles.stepperIcon]}
                                    />
                                */}

                            </View>


                        </View>

                        <TouchableHighlight style={styles.touchable}
                                            underlayColor={AppColors.base.grey}
                                            onPress={() => {
                                                this.props.showRemoveConfirmationDialog(this.props.item)
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
                            <LSText letterSpacing={2}
                                    style={[styles.productText, styles.productTitle]}>{this.props.item.title ? this.props.item.title.toUpperCase() : 'undefined'}</LSText>
                            <LSText letterSpacing={2}
                                    style={[styles.productText, styles.productPrice]}>{'£' + this.props.item.price}</LSText>
                            <LSText letterSpacing={2}
                                    style={[styles.productText, styles.productSize]}>{'Size: M'}</LSText>
                        </View>

                        <Image style={styles.productImage} source={{uri: this.props.item.img}}/>

                    </View>
                </View>

            </View>
        );


    }
}


export default ProductSlide;