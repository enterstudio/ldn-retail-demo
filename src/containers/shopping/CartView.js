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
import timer from 'react-native-timer';
import { ButtonGroup } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppColors, AppStyles, AppSizes} from '@theme/';

// Components
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
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        height: 150,
        backgroundColor: 'white',
        borderColor: AppColors.base.grey,
        borderWidth: 1
    },

    modalContent: {
       // height: 80
    },


    modalMsg: {
        padding: 20,
        fontSize: 18,
        textAlign: 'center'
    }

});

class ShoppingCart extends Component {

    modalTimerName:'modalTimer';

    constructor(props) {
        super(props);

        this.state = {
            productList: productList,
            modalVisible: false,
            selectedIndex: 1
        }

        this.updateIndex = this.updateIndex.bind(this)

    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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

    updateIndex(selectedIndex) {
        this.setState({selectedIndex});
        selectedIndex = 1;
        timer.setTimeout(this.modalTimerName, () => {
            this.setModalVisible(false)
            this.setState({selectedIndex});
        }, 300);

    }


    render = () => (
        <View>
            <Modal
                animationType={'fade'}
                transparent={true}
                presentationStyle={'pageSheet'}
                visible={this.state.modalVisible}
            >
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalMsg}>Add to Item to cart?</Text>
                    </View>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={this.state.selectedIndex}
                        buttons={['Cancel', 'OK']}
                        containerStyle={{height: 50, width: AppSizes.screen.width * 0.50}}
                    />
                </View>
            </Modal>
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
                            this.setModalVisible(true)
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

    componentWillUnmount() {
        timer.clearTimeout(this.modalTimerName);
    }
}

export default ShoppingCart;