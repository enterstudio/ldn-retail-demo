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
import IBeaconListener from '../../lib/IBeaconListener';
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

    log: {
        backgroundColor: AppColors.base.white,
        borderBottomColor: AppColors.base.grey,
        borderBottomWidth: 1,
        padding: 15
    },
    listItem: {},

    btn: {
        margin: 10
    }

});

const TIME_FORMAT = "MMMM Do YYYY, h:mm:ss a";

class IBeaconMonitorView extends Component {

    _keyExtractor = (item, index) => 'item'.concat(index);

    beaconListener;

    constructor(props) {
        super(props);
        this.beaconListener = new IBeaconListener();
        this.toggleRanging = this.toggleRanging.bind(this);
        this.beaconsDidRangeCb = this.beaconsDidRangeCb.bind(this);
        this.regionDidEnterCb = this.regionDidEnterCb.bind(this);
        this.regionDidExitCb = this.regionDidExitCb.bind(this);
        this.state = {
            isRanging: false,
            beaconsDidRangeData: {
                beacons: []
            },
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

    beaconsDidRangeCb(data) {
        //console.log('beaconsDidRangeCb ', data)
        this.setState({beaconsDidRangeData: data})

    }

    regionDidEnterCb(data) {
        // good place for background tasks
        console.log('monitoring - regionDidEnter data: ', data);

        const time = moment().format(TIME_FORMAT);
        this.setState({
            regionEnterData: {
                identifier: data.identifier,
                uuid: data.uuid,
                minor: data.minor,
                major: data.major,
                time
            }
        });
    }


    regionDidExitCb(data) {
        // good place for background tasks
        console.log('monitoring - regionDidExit data: ', data);

        const time = moment().format(TIME_FORMAT);
        this.setState({
            regionExitData: {
                identifier: data.identifier,
                uuid: data.uuid,
                minor: data.minor,
                major: data.major,
                time
            }
        });
    }

    render = () => (
        <View style={styles.container}>
            <View style={styles.log}>
                <Text style={AppStyles.h2}>Beacon Range</Text>
                <FlatList
                    data={this.state.beaconsDidRangeData.beacons}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) =>
                    <ListItem
                        containerStyle={styles.listItem}
                        hideChevron={true}
                        title={'Minor: ' + item.minor}
                        subtitle={'proximity: ' + item.proximity + ', rssi: ' + item.rssi + ', accuracy: ' + item.accuracy }
                        subtitleStyle={{fontSize: 15}}
                    />
                    }
                />
            </View>
            <View style={styles.log}>
                <Text style={AppStyles.h2}>Beacon Did Enter</Text>
                <Text>Minor: {this.state.regionEnterData.minor}</Text>
            </View>
            <View style={styles.log}>
                <Text style={AppStyles.h2}>Beacon Did Exit</Text>
                <Text>Minor: {this.state.regionExitData.minor}</Text>
            </View>
            <Button style={styles.btn} title={this.state.isRanging ? 'Stop Ranging' : 'Start Ranging'}  onPress={this.toggleRanging}></Button>
        </View>
    )

    componentDidMount() {
        this.beaconListener.init(this.beaconsDidRangeCb, this.regionDidEnterCb, this.regionDidExitCb);
        this.setState({isRanging: true})
    }



}

export default IBeaconMonitorView;