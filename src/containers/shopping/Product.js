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
        paddingVertical: AppSizes.paddingSml
    },

    productImage: {
        height: 300,
        resizeMode: 'contain'
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
        backgroundColor: AppColors.base.greyLight,
        zIndex: 99999
    },

    addToCartBtn: {
        width: 400,
        padding: 30,
        color: AppColors.base.grey
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
    },

    //TODO create icon component
    smallIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },

    largeIcon: {
        height: 70,
        width: 70,
        resizeMode: 'contain'
    }


});


const mapDispatchToProps = (dispatch) => {
    return ({})
};

const mapStateToProps = state => ({});

const spacerSize = 50;

//TODO separate container and view (like menu)
class Product extends Component {


    slides = this.props.complementaryItems.map((item, index) => {
        return (
            <View key={`entry-${index}`} style={styles.slide}>
                <TouchableHighlight onPress={this._slideUp}>
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
                                style={[styles.smallIcon]}
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
                                    <Text style={[AppStyles.h5]}>{'----'}</Text>
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
                        <View style={[AppStyles.paddedRow, {justifyContent: 'space-between', backgroundColor: AppColors.base.greyLight}]}>
                            <View style={[{justifyContent: 'center'}]}>
                            <Text style={[AppStyles.h3]}>View in store location</Text>
                            </View>
                                <Image
                                source={require('../../assets/icons/icon-location.png')}
                                style={[styles.largeIcon, { marginRight: 20}]}
                            />
                        </View>
                        <Spacer size={spacerSize}></Spacer>
                        <View style={[AppStyles.containerCentered]}>
                            <Text style={[AppStyles.h3]}>Need help?</Text>
                            <Image
                                source={require('../../assets/icons/icon-assistant.png')}
                                style={[styles.largeIcon]}
                            />
                            <Button raised={false} title={'Ask an assistant'}></Button>
                        </View>
                        <Spacer size={230}></Spacer>
                    </ScrollView>
                </View>
                <View style={[styles.addToCartContainer]}>
                    <View style={[styles.priceContainer]}>
                        <Text style={[styles.price]}>£{this.props.product.price}</Text>
                    </View>
                    <Button raised={false} large title={'Add to cart'}></Button>
                </View>
            </View>
        )
    }

}


export default connect(mapStateToProps)(Product);
