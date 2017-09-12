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
        fontSize: 20
    },

    productImage: {
        width: 60,
        height: 80,
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

    checkoutBtn: {
        margin: 10
    },

    scrollView: {
        backgroundColor: AppColors.base.greyLight
    },


    //TODO create icon component
    smallIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },

    productInfo: {
        flexDirection: 'column',
        paddingLeft: AppSizes.padding
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

    _removeFromCart = (item) => {
        console.log('remove item: ' + item.id)
        this.showNotification('Delete item from cart?')
    }

    _keyExtractor = (item, index) => item.id;

    render = () => (


        <View>
            {
                /*<Modal
             animationType={'fade'}
             transparent={true}
             presentationStyle={'pageSheet'}
             visible={this.state.modalVisible}
             >

             </Modal>*/
            }

            <ScrollView style={styles.scrollView}
                        automaticallyAdjustContentInsets={false}
            >
                <FlatList
                    data={this.props.products}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) =>
                    <ListItem
                    containerStyle={[styles.listItem]}
                    hideChevron={true}
                    title={
                      <TouchableHighlight onPress={() => {
                            Actions.productCart(
                                     {
                                        title: item.title,
                                        product: item,
                                        complementaryItems: this.props.products
                            })

                        }}>
                          <View style={styles.titleView} >
                            <Image style={styles.productImage} source={{uri: item.img}} />
                            <View style={[styles.productInfo]}>
                             <Text style={[styles.titleViewText]}>{item.title}</Text>
                             <Text style={[styles.productPrice]}>£{item.price}</Text>
                            </View>
                               <View style={[styles.iconContainer]}>
                                   <TouchableOpacity onPress={()=>
                            {
                                this._removeFromCart(item);
                            }}>
                            <Image
                                source={require('../../assets/icons/icon-remove.png')}
                                style={[styles.smallIcon]}
                            />
                            </TouchableOpacity>
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
                    title={'Checkout'}
                    style={styles.checkoutBtn}
                ></Button>
            </View>
        </View>
    )


}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
