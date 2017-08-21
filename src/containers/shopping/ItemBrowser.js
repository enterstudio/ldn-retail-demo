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

const productList = [
    {
        id: '1',
        key: 'key1',
        title: 'Victory Long Sleeve Polo',
        description: '',
        img: "require('../../images/LongSleevePolo.png')",
        price: 65
    },
    {
        id: '2',
        key: 'key2',
        title: 'Victory Hoodie',
        description: '',
        img: "require('../../images/VictorySolidPolo.png')",
        price: 66
    },
    {
        id: '3',
        key: 'key3',
        title: 'Victory Polo',
        description: '',
        img: "require('../../images/VictorySolidPolo.png')",
        price: 78
    }
]

/* Styles ==================================================================== */
const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column'
    },

    slide: {
        width : AppSizes.screen.widthThreeQuarters,
        height : AppSizes.screen.height / 2.5,
        borderBottomColor: AppColors.base.grey,
        borderBottomWidth: 1,
        backgroundColor: AppColors.base.white
    },

    titleView: {
        flex: 2,
        flexDirection: 'row',
        padding: 40,
        backgroundColor: AppColors.base.white,

    },

    titleViewText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
    },

    productImage: {
        width: 60,
        height: 80,
    },

    productPrice: {
        padding: 12,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },

    header: {
        height: AppSizes.screen.heightThird
    },

    card: {
        flexDirection: 'column',

    }


});


const mapStateToProps = () => ({});

class ItemBrowser extends Component {

    slides = productList.map((item, index) => {
        return (
            <View key={`entry-${index}`} style={styles.slide}>
                <View style={styles.titleView}>
                    <Image style={styles.productImage} source={require('../../images/LongSleevePolo.png')}/>
                    <View style={styles.card}>
                        <Text style={styles.titleViewText}>{item.title}</Text>
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
                    <Text style={styles.titleViewText}>{'Item browser'}</Text>
                </View>
                <Carousel
                    ref={(carousel) => { this._carousel = carousel; }}
                    sliderWidth={AppSizes.screen.width}
                    itemWidth={AppSizes.screen.widthThreeQuarters}
                    itemheight={AppSizes.screen.heightThreeQuarters}
                >
                    { this.slides }
                </Carousel>
            </View>
        );
    }
}

export default connect(mapStateToProps)(ItemBrowser);
