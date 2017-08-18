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
import * as NotificationActions from '@redux/notification/actions';

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
        id: '3',
        key: 'key2',
        title: 'Victory Polo',
        description: '',
        img: "require('../../images/VictorySolidPolo.png')",
        price: 78
    }
]

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    // Tab Styles
    listItem: {
        borderBottomColor: AppColors.base.grey,
        borderBottomWidth: 1,
        backgroundColor: AppColors.base.white,

    },

    titleView: {
        flex: 2,
        flexDirection: 'row',
        padding: 20,
        backgroundColor: AppColors.base.white
    },

    titleViewText: {
        fontSize: 17
    },

    productImage: {
        width: 60,
        height: 80,
    },

    productPrice: {
        padding: 12,
        fontStyle: 'italic',
        fontWeight: 'bold'
    }

});


const mapDispatchToProps = (dispatch) => {
    return ({
        showNotification: (message) => {
            NotificationActions.showNotification(dispatch, message)
        }
    })
};

const mapStateToProps = () => ({});

class ItemBrowser extends Component {

    slides = this.state.entries.map((entry, index) => {
        return (
            <View key={`entry-${index}`} style={styles.slide}>
                <Text style={styles.title}>{ entry.title }</Text>
            </View>
        );
    });

    render = () => {

        return (
            <Carousel
                ref={(carousel) => { this._carousel = carousel; }}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
            >
                { slides }
            </Carousel>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemBrowser);
