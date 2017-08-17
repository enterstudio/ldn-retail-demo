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
    loggingView: {
        flexDirection: 'column',
        borderBottomColor: AppColors.base.grey,
        borderWidth: 1,
        padding: 15
    },
    listItem: {},

});

const TIME_FORMAT = "MMMM Do YYYY, h:mm:ss a";

class IBeaconMonitorView extends Component {

    _keyExtractor = (item, index) => 'item'.concat(index);

    beaconListener;

    constructor(props) {
        super(props);
        this.beaconListener = new IBeaconListener();
        this.beaconsDidRangeCb = this.beaconsDidRangeCb.bind(this);
        this.regionDidEnterCb = this.regionDidEnterCb.bind(this);
        this.regionDidExitCb = this.regionDidExitCb.bind(this);
        this.state = {
            beaconsDidRangeData: {
                beacons: []
            },
            regionEnterData: {},
            regionExitData: {}
        }

    }

    beaconsDidRangeCb(data) {
        console.log('beaconsDidRangeCb ', data)
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
        <View>
            <View style={styles.loggingView}>
                <Text style={AppStyles.h2}>Beacon Range</Text>
                <FlatList
                    data={this.state.beaconsDidRangeData.beacons}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) =>
                    <ListItem
                        containerStyle={styles.listItem}
                        hideChevron={true}
                        title={item.minor}
                        subtitle={'proximity: ' + item.proximity + ', rssi: ' + item.rssi + ', accuracy: ' + item.accuracy }
                        subtitleStyle={{fontSize: 15}}
                    />
                    }
                />
            </View>
            <View style={styles.loggingView}>
                <Text style={AppStyles.h2}>Beacon Did Enter</Text>
                <Text>Minor: {this.state.regionEnterData.minor}</Text>
            </View>
            <View style={styles.loggingView}>
                <Text style={AppStyles.h2}>Beacon Did Enter</Text>
                <Text>Minor: {this.state.regionExitData.minor}</Text>
            </View>
        </View>
    )

    componentDidMount() {
        this.beaconListener.init(this.beaconsDidRangeCb, this.regionDidEnterCb, this.regionDidExitCb);
    }

    componentWillUnMount() {
        this.beaconListener.close();
    }


}

export default IBeaconMonitorView;