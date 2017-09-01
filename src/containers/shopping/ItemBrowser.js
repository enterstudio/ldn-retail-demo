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
import Carousel from 'react-native-snap-carousel';
import { FirebaseImgRef } from '@constants/';


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

    container: {
        flex: 1,
        flexDirection: 'column'
    },

    slide: {
        width: AppSizes.screen.widthThreeQuarters,
        height: AppSizes.screen.height / 2,
        borderBottomColor: AppColors.base.grey,
        borderBottomWidth: 1,
        backgroundColor: AppColors.base.white
    },

    productContainer: {
        flexDirection: 'row',
        paddingLeft: 30
    },

    titleText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        padding: 15
    },

    productImage: {
        width: 110,
        height: 160,
    },

    productPrice: {
        padding: 12,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },

    header: {
        alignItems: 'center',
        height: AppSizes.screen.height / 4,
        paddingTop: 15
    },

    card: {
        flexDirection: 'column'
    }
});

const mapStateToProps = state => ({
    products: state.products.products
});

//TODO separate container and view
class ItemBrowser extends Component {

    slides = this.props.products.map((item, index) => {
        return (
            <View key={`entry-${index}`} style={styles.slide} elevation={5}>
                <View style={styles.card}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <View style={styles.productContainer}>
                        <Image style={styles.productImage} source={{uri: item.img}}/>
                        <Text style={styles.productPrice}>£{item.price}</Text>
                    </View>
                </View>
            </View>
        );
    });

    render = () => {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={AppStyles.h1}>{'Item browser'}</Text>
                </View>
                <Carousel
                    ref={(carousel) => { this._carousel = carousel; }}
                    sliderWidth={AppSizes.screen.width}
                    itemWidth={AppSizes.screen.widthThreeQuarters}
                    itemheight={AppSizes.screen.heightThreeQuarters}
                    enableMomentum = {false}
                    scrollEndDragDebounceValue = {50}
                    swipeThreshold = {80}
                >
                    { this.slides }
                </Carousel>
            </View>
        );
    }
}

export default connect(mapStateToProps)(ItemBrowser);
