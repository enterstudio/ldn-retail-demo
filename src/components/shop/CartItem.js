import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Text } from '@components/ui/';
import { AppColors, AppStyles, AppSizes} from '@theme/';

const ANIMATION_DURATION = 250;
const ROW_HEIGHT = 110;


/* Styles ================================= */
const styles = StyleSheet.create({

    cartItem: {
        flex: 2,
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        borderBottomColor: AppColors.base.grey,
        borderBottomWidth: 1,
        backgroundColor: AppColors.base.white
    },

    title: {
        fontSize: 20
    },

    productImage: {
        width: 60,
        height: 80,
    },

    productInfo: {
        flexDirection: 'column',
        paddingLeft: AppSizes.padding
    },

    productPrice: {
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },

    iconContainer: {
        position: 'absolute',
        top: AppSizes.paddingSml,
        right: AppSizes.paddingSml
    },

    //TODO create icon component
    smallIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    }

})


class CartItem extends Component {
    constructor(props) {
        super(props);
        this.onRemove = this.onRemove.bind(this);
        this._animated = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(this._animated, {
            toValue: 1,
            duration: ANIMATION_DURATION,
        }).start();
    }

    onRemove = () => {
        console.log('on remove called')
        const { onRemove } = this.props;
        if (onRemove) {
            Animated.timing(this._animated, {
                toValue: 0,
                duration: ANIMATION_DURATION,
            }).start(() => {
                onRemove()
            })
        }
    }

    render() {
        const item = this.props.item;

        const rowStyles = [
            styles.row,
            {
                height: this._animated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, ROW_HEIGHT],
                    extrapolate: 'clamp',
                }),
            },
            {opacity: this._animated},
            {
                transform: [
                    {scale: this._animated}
                ],
            },
        ];

        return (
            <TouchableOpacity onPress={() => {
                            Actions.productCart(
                                     {
                                        title: item.title,
                                        product: item,
                                        complementaryItems: this.props.products
                            })
                        }}>
                <Animated.View style={rowStyles}>
                    <View style={styles.cartItem}>
                        <Image style={styles.productImage} source={{uri: item.img}}/>
                        <View style={[styles.productInfo]}>
                            <Text style={[styles.title]}>{item.title}</Text>
                            <Text style={[styles.productPrice]}>£{item.price}</Text>
                        </View>
                        <View style={[styles.iconContainer]}>
                            <TouchableOpacity onPress={()=>
                            {
                                 this.onRemove();
                                //this.showRemoveDialog(item);
                            }}>
                                <Image
                                    source={require('../../assets/icons/icon-remove.png')}
                                    style={[styles.smallIcon]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}


export default CartItem;