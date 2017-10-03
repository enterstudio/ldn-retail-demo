import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, Easing, TouchableHighlight} from 'react-native';
import { Text } from '@components/ui/';
import LSText from 'react-native-letter-spacing';
import { AppColors, AppStyles, AppSizes} from '@theme/';
import { Actions } from 'react-native-router-flux';

/* Styles ================================= */

const LAYER_INDEXES = {
    productDetails: 3,
    iconContainer: 2,
    productViewContainer: 1,
    stepperContainer: 1,
    actionContainer: 99
}

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
        width: 170,
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
        height: 45,
        width: 45,
        backgroundColor: AppColors.base.black,
        marginBottom: 10,

    },

    actionContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: AppColors.base.black,
        borderRadius: 30,
        marginBottom: 10,
        zIndex: LAYER_INDEXES.actionContainer,
        overflow: 'hidden'
    },

    stepperContainer: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.base.black,
        borderRadius: 30,
        paddingHorizontal: AppSizes.padding,
        zIndex: LAYER_INDEXES.stepperContainer
    },

    stepperIcon: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },

    stepperCounter: {
        color: AppColors.base.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 15
    },

    containerRight: {
        alignSelf: 'flex-end'
    }
});


const defaultProps = {
    animationTime: 150,
    addToCartActive: 155,
    addToCartInActive: 45
};


class ProductSlide extends Component {

    constructor(props) {
        super(props);
        this.toggleAddToCartAction = this.toggleAddToCartAction.bind(this);
        this.state = {
            imageScale: new Animated.Value(1),
            imageTop: new Animated.Value(0),
            stepperCounter: 1,
            isAddToCartActive: false,
            addToCartActionWith: new Animated.Value(this.props.addToCartInActive)
        }
    }

    //animateAddToCart = () => {
    //
    //    console.log('animate to cart');
    //    Animated.sequence([
    //        Animated.timing(this.state.imageScale, {
    //            duration: CONF.animationTime,
    //            toValue: 1.1,
    //            easing: Easing.quad
    //        }),
    //
    //        Animated.parallel([
    //            Animated.timing(this.state.imageScale, {
    //                duration: 200,
    //                toValue: 0.2,
    //                easing: Easing.quad
    //            }),
    //            Animated.timing(this.state.imageTop, {
    //                duration: 200,
    //                toValue: -50,
    //                easing: Easing.quad
    //            })
    //        ]),
    //
    //        Animated.timing(this.state.imageTop, {
    //            duration: CONF.animationTime,
    //            toValue: 50,
    //            easing: Easing.quad
    //        })
    //    ]).start();
    //}


    toggleAddToCartAction = () => {
        this.setState({isAddToCartActive: !this.state.isAddToCartActive}, () => {
            Animated.timing(this.state.addToCartActionWith, {
                duration: this.props.animationTime,
                toValue: this.state.isAddToCartActive ? this.props.addToCartInActive : this.props.addToCartActive,
                easing: Easing.linear
            }).start();
        })

    }


    getProductTitle = (title) => {
        if (title) {
            return title.toUpperCase();
        } else {
            return 'undefined'
        }
    }

    removeProductFromCart = () => {
        if (this.state.stepperCounter > 0) {
            this.setState({stepperCounter: this.state.stepperCounter - 1});
            this.props.removeFromCart(this.props.item);
        }
    }

    addProductToCart = () => {
        this.setState({stepperCounter: this.state.stepperCounter + 1});
        this.props.addToCart(this.props.item);
    }

    render() {

        return (

            <View key={`entry-${this.props.index}`} style={styles.slide} elevation={5}>

                <View style={styles.card}>
                    <View style={[styles.iconContainer]}>
                        <View style={styles.containerRight}>
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
                        </View>
                        <View style={styles.containerRight}>
                            <Animated.View style={[styles.actionContainer, {width: this.state.addToCartActionWith}] }>
                                <View style={[styles.stepperContainer]}>
                                    <TouchableHighlight style={[]}
                                                        underlayColor={AppColors.base.grey}
                                                        onPress={() => {this.removeProductFromCart()}}>
                                        <Image
                                            source={require('../../assets/icons/icon-minus-white.png')}
                                            style={[styles.stepperIcon]}
                                        />
                                    </TouchableHighlight>

                                    <Text style={styles.stepperCounter}>{this.state.stepperCounter}</Text>

                                    <TouchableHighlight style={[]}
                                                        underlayColor={AppColors.base.grey}
                                                        onPress={() => {this.addProductToCart()}}>
                                        <Image
                                            source={require('../../assets/icons/icon-plus-white.png')}
                                            style={[styles.stepperIcon]}
                                        />
                                    </TouchableHighlight>

                                </View>
                                <TouchableHighlight style={styles.touchable}
                                                    underlayColor={AppColors.base.grey}
                                                    onPress={() => {
                                                 this.toggleAddToCartAction();
                                            }}>
                                    <Image
                                        source={require('../../assets/icons/icon-add-to-cart.png')}
                                        style={[styles.icon]}
                                    />
                                </TouchableHighlight>

                            </Animated.View>
                        </View>
                        <View style={styles.containerRight}>
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

ProductSlide.defaultProps = defaultProps;
export default ProductSlide;