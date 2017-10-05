import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, Easing, TouchableHighlight} from 'react-native';
import { Text } from '@components/ui/';
import LSText from 'react-native-letter-spacing';
import { AppColors, AppStyles, AppSizes} from '@theme/';
import { Actions } from 'react-native-router-flux';
import timer from 'react-native-timer';

/* Styles ================================= */

const LAYER_INDEXES = {
    TOP: 9,
    productDetails: 3,
    iconContainer: 2,
    productViewContainer: 1,
    stepperContainer: 1,
    actionContainer: 4,
    stepperIndicator: 5
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
        width: AppSizes.screen.widthThreeQuarters - 50,
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
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 25
    },

    containerRight: {
        alignSelf: 'flex-end'
    },

    stepperHightlight: {
        //width: 40
    },

    stepperIndicator: {
        position: 'absolute',
        right: 5,
        top: 5,
        borderRadius: 20,
        backgroundColor: AppColors.base.white,
        zIndex: LAYER_INDEXES.stepperIndicator
    },

    indicatorText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: AppColors.base.red
    },

    deleteActionContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        right: 50,
        top: 0,
        height: 45,
        borderRadius: 45,
        backgroundColor: AppColors.base.black,
        zIndex: LAYER_INDEXES.stepperIndicator
    },

    removeText: {
        paddingRight: 10,
        color: AppColors.base.white,
        fontSize: 14,
        fontWeight: 'bold'
    }

});


const defaultProps = {

    animationTime: 150,
    addToCartActive: 190,
    addToCartInActive: 45,
    indicatorSize: 20
};


class ProductSlide extends Component {

    timerName = 'ProductSlideTimer';

    constructor(props) {
        super(props);
        this.toggleAddToCartAction = this.toggleAddToCartAction.bind(this);
        this.toggleRemoveFromListAction = this.toggleRemoveFromListAction.bind(this);
        this.removeProductFromList = this.removeProductFromList.bind(this);
        this.indicatorScale = new Animated.Value(0);
        this.animatedRemove = new Animated.Value(0);
        this.state = {
            imageScale: new Animated.Value(1),
            imageTop: new Animated.Value(0),
            stepperCounter: 0,
            isAddToCartActive: false,
            isRemoveFromListActive: false,
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
        this.resetIndicator();
        this.setState({isAddToCartActive: !this.state.isAddToCartActive}, () => {
            Animated.timing(this.state.addToCartActionWith, {
                duration: this.props.animationTime,
                toValue: this.state.isAddToCartActive ? this.props.addToCartInActive : this.props.addToCartActive,
                easing: Easing.linear
            }).start();
        })

    }


    toggleRemoveFromListAction = (callback) => {
        console.log('toggleRemoveFromListAction');
        this.setState({isRemoveFromListActive: !this.state.isRemoveFromListActive}, () => {
            Animated.timing(this.animatedRemove, {
                duration: this.props.animationTime,
                toValue: this.state.isRemoveFromListActive ? 0 : 1,
                easing: Easing.linear
            }).start(callback);
        })

    }


    removeProductFromList = () => {
        console.log('removeProductFromList');
        const self = this;
        this.toggleRemoveFromListAction(() => {
            timer.setTimeout(this.timerName, () => {
                self.props.removeFromList(self.props.item);
            }, 300);

        })


    }

    closeCartAction = () => {
        this.resetIndicator();
        this.setState({isAddToCartActive: false}, () => {
            Animated.timing(this.state.addToCartActionWith, {
                duration: this.props.animationTime,
                toValue: this.props.addToCartInActive,
                easing: Easing.linear
            }).start();
        });
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
            const self = this;
            Animated.timing(this.indicatorScale, {
                toValue: 0,
                duration: 1
            }).start(() => {
                self.setState({stepperCounter: self.state.stepperCounter - 1});
                self.props.removeFromCart(self.props.item);
                self.animateIndicator();
            });
        }
    }

    addProductToCart = () => {
        const self = this;
        Animated.timing(this.indicatorScale, {
            toValue: 0,
            duration: 1
        }).start(() => {
            self.setState({stepperCounter: self.state.stepperCounter + 1});
            self.props.addToCart(self.props.item);
            self.animateIndicator();
        });

    }

    resetIndicator = () => {
        Animated.timing(this.indicatorScale, {
            toValue: 0,
            duration: 1
        }).start();
    }

    animateIndicator = () => {
        setTimeout(() => {
            Animated.sequence([
                Animated.timing(this.indicatorScale, {
                    toValue: 1.4,
                    duration: 400
                }),
                Animated.timing(this.indicatorScale, {
                    toValue: 1,
                    duration: 200
                }),
            ]).start();
        }, 100);
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
                                                     complementaryItems: this.props.complementaryItems
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
                            <Animated.View style={[styles.stepperIndicator, AppStyles.containerCentered,
                                {
                                   height: this.indicatorScale.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, this.props.indicatorSize],
                                    extrapolate: 'clamp',
                                   }),
                                   width: this.indicatorScale.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, this.props.indicatorSize],
                                    extrapolate: 'clamp',
                                   })
                                },
                                {opacity: this.indicatorScale},
                                {
                                    transform: [
                                        {scale: this.indicatorScale}
                                    ]
                                 }
                                ]
                            }>
                                <Text style={styles.indicatorText}>{this.state.stepperCounter}</Text>
                            </Animated.View>
                            <Animated.View style={[styles.actionContainer, {width: this.state.addToCartActionWith}] }>
                                <View style={[styles.stepperContainer]}>

                                    <TouchableHighlight style={[styles.stepperHightlight]}
                                                        underlayColor={AppColors.base.grey}
                                                        onPress={() => {this.removeProductFromCart()}}>
                                        <Image
                                            source={require('../../assets/icons/icon-minus-white.png')}
                                            style={[styles.stepperIcon]}
                                        />

                                    </TouchableHighlight>

                                    <Text style={styles.stepperCounter}>{this.state.stepperCounter}</Text>

                                    <TouchableHighlight style={[styles.stepperHightlight]}
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
                            <Animated.View
                                style={[styles.deleteActionContainer, {
                                        width: this.animatedRemove.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [45, 170],
                                            extrapolate: 'clamp',
                                        }),
                                        right: this.animatedRemove.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 55],
                                            extrapolate: 'clamp',
                                        }),
                                        opacity: this.animatedRemove
                                        }
                                        ] }>

                                <Text style={styles.removeText}>Remove from list</Text>

                                <TouchableHighlight style={[styles.stepperHightlight]}
                                                    underlayColor={AppColors.base.grey}
                                                    onPress={() => {this.removeProductFromList()}}
                                                    >
                                    <Image
                                        source={require('../../assets/icons/icon-check-white.png')}
                                        style={[styles.stepperIcon]}
                                    />

                                </TouchableHighlight>

                            </Animated.View>
                            <TouchableHighlight style={[styles.touchable, {zIndex: LAYER_INDEXES.TOP}]}
                                                underlayColor={AppColors.base.grey}
                                                onPress={() => {
                                                this.toggleRemoveFromListAction();
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

    componentWillUnmount = () => {
        timer.clearTimeout(this.timerName);
    }
}

ProductSlide.defaultProps = defaultProps;
export default ProductSlide;