import React, { Component } from 'react';
import {
    View,
    Image,
    Modal,
    Alert,
    Text,
    ListView,
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import timer from 'react-native-timer';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import BeaconListener from '../../lib/BeaconListener';
import * as BeaconActions from '@redux/beacon/actions';
import { addToProducts }  from '@redux/products/actions';

import moment from 'moment';

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


/* Styles ==================================================================== */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    rangeContainer: {
        height: 200,
        overflow: 'hidden'
    },

    log: {
        backgroundColor: AppColors.base.white,
        padding: 15,
        borderBottomWidth: 1
    },

    listItem: {
        borderBottomWidth: 0,
        height: 120
    }

});


const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUserInRange: (user) => {
            BeaconActions.sendUserInRangeEvent(user);
        },
        addToProducts: (itemId) => {
            dispatch(addToProducts(itemId));
        }
    }
};

const mapStateToProps = state => ({
    user: state.user
});

//TODO seperate container and view
class BeaconMonitor extends Component {

    _keyExtractor = (item, index) => 'item'.concat(index);

    beaconListener;
    counter = 0;

    constructor(props) {
        super(props);
        this.beaconListener = new BeaconListener();
        this.toggleRanging = this.toggleRanging.bind(this);
        this.beaconsDidRangeCb = this.beaconsDidRangeCb.bind(this);
        this.regionMonitoringCb = this.regionMonitoringCb.bind(this);
        this.movingCb = this.movingCb.bind(this);

        this.state = {
            isRanging: false,
            beaconsDidRangeData: [],
            regionEnterData: {},
            regionExitData: {}
        }
    }

    toggleRanging() {
        if (!this.state.isRanging) {
            this.beaconListener.startRanging();
        } else {
            this.beaconListener.stopRanging();
        }
        this.setState({isRanging: !this.state.isRanging});
    }


    movingCb(data) {
        console.log('moving - data: ', data);
        const beacon = JSON.parse(data);

        if(beacon.proximity_uuid && beacon.proximity_uuid.endsWith('aa') ) {
            this.props.addToProducts(1);
        }

        else if(beacon.proximity_uuid && beacon.proximity_uuid.endsWith('bb') ) {
            this.props.addToProducts(2);
        }

        else if(beacon.proximity_uuid && beacon.proximity_uuid.endsWith('cc') ) {
            this.props.addToProducts(3);
        }

        else if(beacon.proximity_uuid && beacon.proximity_uuid.endsWith('dd') ) {
            this.props.addToProducts(4);
        }
    }


    beaconsDidRangeCb(data) {
        console.log('ranging - data: ', data);
        if (this.state.isRanging) {
            this.setState({beaconsDidRangeData: JSON.parse(data)});
            this.props.dispatchUserInRange(this.props.user);
        }

    }

    regionMonitoringCb(data) {

        const event = JSON.parse(data);
        console.log('monitoring - data: ', data);

        if (event.type === 'enter') {

            this.props.dispatchUserInRange(this.props.user);

            this.setState({
                regionEnterData: {
                    identifier: event.region_identifier + ': ' + moment(new Date()).format('h:mm:ss')
                },
                regionExitData: {
                    identifier: ''
                }
            });
        }
        else if (event.type === 'exit') {
            this.setState({
                regionExitData: {
                    identifier: event.region_identifier + ': ' + moment(new Date()).format('h:mm:ss')
                },
                regionEnterData: {
                    identifier: ''
                }

            });
        }
    }

    render = () => (
        <View style={styles.container}>
            <View style={[styles.rangeContainer, styles.log]}>
                <Text style={AppStyles.h2}>Beacon Range</Text>
                <FlatList
                    data={this.state.beaconsDidRangeData}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) =>
                       <View style={styles.listItem}>
                            <Text>ID: {item.identifier}  ,type: {item.type} , color: {item.color}</Text>
                            <Text>x_acceleration: {item.x_acceleration} , y_acceleration:  {item.y_acceleration}, z_acceleration: {item.y_acceleration} </Text>
                    </View>
                    }
                />
            </View>
            <View style={styles.log}>
                <Text style={AppStyles.h2}>Beacon Did Enter</Text>
                <Text>Identifier: {this.state.regionEnterData.identifier} </Text>
            </View>
            <View style={styles.log}>
                <Text style={AppStyles.h2}>Beacon Did Exit</Text>
                <Text>Identifier: {this.state.regionExitData.identifier}</Text>
            </View>
            <Button large backgroundColor={AppColors.base.greyDark}
                    title={this.state.isRanging ? 'Stop Ranging' : 'Start Ranging'}
                    onPress={this.toggleRanging}></Button>
        </View>
    )

    componentDidMount() {
        console.log('init beaconListener');
        this.beaconListener.init(this.beaconsDidRangeCb, this.movingCb);
    }


    componentWillUnmount() {
        this.beaconListener.stopRanging();
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(BeaconMonitor);
