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
        borderBottomWidth: 0
    }

});


const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUserInRange: (user) => {
            BeaconActions.sendUserInRangeEvent(user);
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

    constructor(props) {
        super(props);
        this.beaconListener = new BeaconListener();
        this.toggleRanging = this.toggleRanging.bind(this);
        this.beaconsDidRangeCb = this.beaconsDidRangeCb.bind(this);
        this.regionMonitoringCb = this.regionMonitoringCb.bind(this);
        this.telemetryMonitoringCb = this.telemetryMonitoringCb.bind(this);
        this.state = {
            isRanging: false,
            beaconsDidRangeData: [],
            regionEnterData: {},
            regionExitData: {}
        }
    }

    toggleRanging() {
        if (!this.state.isRanging) {
            this.beaconListener.startNearableScanning();
        } else {
            this.beaconListener.stopRanging();
        }
        this.setState({isRanging: !this.state.isRanging});
    }


    telemetryMonitoringCb(data) {
        console.log('telemetry - data: ', data);

    }

    nearablesMonitoringCb(data) {
        console.log('nearables - data: ', data);

    }

    beaconsDidRangeCb(data) {
        console.log('ranging - data: ', data);
        if(this.state.isRanging) {
            this.setState({beaconsDidRangeData: JSON.parse(data)});
        }
    }

    regionMonitoringCb(data) {

        const event  = JSON.parse(data);
        console.log('monitoring - data: ', data);

        if(event.type === 'enter'){

        this.props.dispatchUserInRange(this.props.user);

        this.setState({
            regionEnterData: {
                identifier: event.region_identifier  + ': ' + moment(new Date()).format('h:mm:ss')
            },
            regionExitData : {
                identifier: ''
            }
        });
        }
        else if(event.type === 'exit'){
            this.setState({
                regionExitData: {
                    identifier: event.region_identifier  + ': ' + moment(new Date()).format('h:mm:ss')
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
                    <ListItem
                        containerStyle={styles.listItem}
                        hideChevron={true}
                        title={JSON.stringify(item)}
                        subtitle={'Minor: ' + item.minor + ', rssi: ' + item.rssi + ', accuracy: ' + item.accuracy }
                        subtitleStyle={{fontSize: 15}}
                    />
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
            <Button large backgroundColor={AppColors.base.greyDark} title={this.state.isRanging ? 'Stop Ranging' : 'Start Ranging'}  onPress={this.toggleRanging}></Button>
        </View>
    )

    componentDidMount() {
        this.beaconListener.init(this.beaconsDidRangeCb, this.regionMonitoringCb, this.telemetryMonitoringCb, this.nearablesMonitoringCb);
       // this.beaconListener.startNearableScanning();
    }


    componentWillUnmount() {
        this.beaconListener.stopRanging();
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(BeaconMonitor);
