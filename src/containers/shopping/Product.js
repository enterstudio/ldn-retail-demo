import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {AppColors, AppStyles, AppSizes} from '@theme/';

import {
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

    imageContainer: {
        paddingVertical: AppSizes.paddingSml
    },

    productImage: {
        height: 300,
        resizeMode: 'contain'

    },

    descriptionContainer: {},

    description: {
        fontSize: 22,
        color: AppColors.base.black
    },

    addToCartContainer: {
        position: 'absolute',
        bottom: AppSizes.tabbarHeight + 65,
        left: 0,
        right: 0,
        height: 65,
        flex: 2,
        flexDirection: 'row',
        backgroundColor: AppColors.base.greyLight,
        zIndex: 99999
    },

    addToCartBtn: {
        width: 400,
        padding: 30,
        color: AppColors.base.grey
    },

    priceContainer: {
        flex:1,
        paddingTop: 15

    },

    price: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: AppColors.base.black
    }


});


const mapDispatchToProps = (dispatch) => {
    return ({})
};

const mapStateToProps = state => ({});

//TODO separate container and view
class Product extends Component {

    render = () => {
        console.log('product: ', this.props.product);
        return (
            <View style={styles.container}>
                <View style={styles.scrollContainer}>
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <Image style={styles.productImage} source={{uri: this.props.product.img}}/>
                        </View>
                        <Spacer size={20}/>
                        <View style={[styles.descriptionContainer, AppStyles.padding]}>
                            <Text style={styles.description}>{this.props.product.description}</Text>
                        </View>
                        <Spacer size={200}/>
                    </ScrollView>
                </View>
                <View style={[styles.addToCartContainer]}>
                    <View style={[styles.priceContainer]}>
                        <Text style={styles.price}>£{this.props.product.price}</Text>
                    </View>
                    <Button raised={false} large title={'Add to cart'}></Button>
                </View>
            </View>
        )
    }


    componentWillReceiveProps(nextProps) {
        console.log('next props: ', nextProps)
    }
}

export default connect(mapStateToProps)(Product);
