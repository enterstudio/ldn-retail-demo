import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, Easing, TouchableHighlight} from 'react-native';
import { Text } from '@components/ui/';
import LSText from 'react-native-letter-spacing';
import { AppColors, AppStyles, AppSizes} from '@theme/';

const ANIMATION_DURATION = 550;


const layerIndexes = {
    productDetails: 9,
    iconContainer: 10,
    productAnimate: 6,
    productViewContainer: 1
}

const conf = {
        timeout: 3000,
        animationTime: 300,
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
        bottom: 0,
        left: 0,
        right: 0,
        height: 150,
        paddingTop: AppSizes.padding,
        paddingLeft: AppSizes.padding * 2,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        zIndex: layerIndexes.productDetails
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

    productAnimate: {
        position: 'absolute',
        left: 0,
        zIndex: layerIndexes.productAnimate,
        width: AppSizes.screen.width,
        height: AppSizes.screen.height,

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
        zIndex: layerIndexes.productViewContainer
    },

    iconContainer: {
        position: 'absolute',
        top: 25,
        right: 15,
        zIndex: layerIndexes.iconContainer
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
    }
})



class ProductItem extends Component {

    constructor(props) {
        super(props);
        this.animateAddToCart = this.animateAddToCart.bind(this);
        this.state = {
            imageTop: new Animated.Value(conf.imageTop),
        }
    }

    animateAddToCart = () => {

        console.log('animate to cart');
        Animated.timing(this.state.imageTop, {
            duration: conf.animationTime,
            toValue: 100,
            easing: Easing.quad
        }).start();
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
                        <TouchableHighlight style={styles.touchable}
                                            underlayColor={AppColors.base.grey}
                                            onPress={() => {
                                            //this.props.addToCart(this.props.item);
                                            console.log('add to cart pressed')
                                            this.animateAddToCart();
                                            //this.showAddConfirmationDialog(this.props.item);

                                            }}>
                            <Image
                                source={require('../../assets/icons/icon-add-to-cart.png')}
                                style={[styles.icon]}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.touchable}
                                            underlayColor={AppColors.base.grey}
                                            onPress={() => {
                                                this.showRemoveConfirmationDialog(this.props.item)
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

                        <Animated.View style={[styles.productAnimate, {top: this.state.imageTop}]}>
                            <Image style={styles.productImage} source={{uri: this.props.item.img}}/>
                        </Animated.View>
                    </View>
                </View>
            </View>
        );


    }
}


export default ProductItem;