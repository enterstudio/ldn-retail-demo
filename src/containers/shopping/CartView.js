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
    return({
        showNotification: (message) => {NotificationActions.showNotification(dispatch, message)}
    })
};

const mapStateToProps = () => ({
});

class CartView extends Component {


    constructor(props) {
        super(props);

        this.state = {
            productList: productList,
            modalVisible: false,
            selectedIndex: 1
        }
    }

    showNotification(message) {
        this.props.showNotification(message);
    }

    //displayNotification() {
    //    Alert.alert(
    //        'Victory Solid Polo',
    //        'Add to cart?',
    //        [
    //            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //            {text: 'OK', onPress: () => console.log('OK Pressed')},
    //        ],
    //        {cancelable: false}
    //    )
    //}

    counter = 0;

    render = () => (


        <View>
            {/*<Modal
                animationType={'fade'}
                transparent={true}
                presentationStyle={'pageSheet'}
                visible={this.state.modalVisible}
            >

            </Modal>*/}
            <ScrollView style={{backgroundColor: '#EBEBEB'}}
                automaticallyAdjustContentInsets={false}
            >
                <FlatList
                    data={this.state.productList}
                    renderItem={({item}) =>
                    <ListItem
                    containerStyle={styles.listItem}
                    hideChevron={true}
                    title={
                      <TouchableHighlight onPress={() => {
                            this.showNotification('Notification test message ' + this.counter++)
                        }}>
                          <View style={styles.titleView} >
                            <Image style={styles.productImage} source={require('../../images/LongSleevePolo.png')} />
                            <View style={{flexDirection: 'column'}}>
                             <Text style={styles.titleViewText}>{item.title}</Text>
                            <Text style={styles.productPrice}>£{item.price}</Text>
                            </View>
                          </View>
                          </TouchableHighlight>
                        }
                    />
                    }
                />
            </ScrollView>
        </View>
    )


}

export default connect(mapStateToProps, mapDispatchToProps)(CartView);
