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
        width: '100%',
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
    },

    btnContainer: {
        flex: 1,
        width: 110,
        paddingLeft: 15,
    },

    removeBtn: {
        paddingLeft: 15,

    },

    checkoutBtn: {
        margin: 10
    },

    scrollView: {
      backgroundColor: AppColors.base.greyLight
    }

});


const mapDispatchToProps = (dispatch) => {
    return ({
        showNotification: (message) => {
            NotificationActions.showNotification(dispatch, message)
        }
    })
};

const mapStateToProps = state => ({
    products: state.products.products
});

//TODO seperate container and view
class Cart extends Component {


    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 1
        }
    }

    showNotification(message) {
        this.props.showNotification({message});
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

    _keyExtractor = (item, index) => item.id;

    render = () => (


        <View>
            {/*<Modal
             animationType={'fade'}
             transparent={true}
             presentationStyle={'pageSheet'}
             visible={this.state.modalVisible}
             >

             </Modal>*/}

            <ScrollView style={styles.scrollView}
                        automaticallyAdjustContentInsets={false}
            >
                <FlatList
                    data={this.props.products}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) =>
                    <ListItem
                    containerStyle={styles.listItem}
                    hideChevron={true}
                    title={
                      <TouchableHighlight onPress={() => {
                            this.showNotification('Notification test message')
                        }}>
                          <View style={styles.titleView} >
                            <Image style={styles.productImage} source={{uri: item.img}} />
                            <View style={{flexDirection: 'column'}}>
                             <Text style={styles.titleViewText}>{item.title}</Text>
                             <Text style={styles.productPrice}>£{item.price}</Text>
                                 <View style={styles.btnContainer}>
                                    <Button
                                        title={'Remove'}
                                        style={styles.removeBtn}
                                    ></Button>
                                 </View>
                            </View>
                          </View>
                          </TouchableHighlight>
                        }
                    />
                    }
                />
            </ScrollView>
            <View>
                <Button
                    title={'Go to checkout'}
                    style={styles.checkoutBtn}
                ></Button>
            </View>
        </View>
    )


}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
