import { DeviceEventEmitter, Platform, NativeModules } from 'react-native';
import EstimoteManager from 'react-android-estimote-manager';

// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
const region = {
    identifier: 'Estimote',
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
};


class BeaconListener {

    init(beaconsDidRangeCb, regionMonitoringCb ) {

        DeviceEventEmitter.addListener(
            'Monitoring',
            regionMonitoringCb
        );


        DeviceEventEmitter.addListener(
            'Ranging',
            beaconsDidRangeCb
        );

        this.startRanging();
        EstimoteManager.startBeaconMonitoringScan('[ {"identifier": "d03d68a8d18a", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE2A" } ]');


    }

    startRanging() {

        if(Platform.OS  === 'android') {
            EstimoteManager.startBeaconRangingScan('[ {"identifier": "Estimote", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D" }, {"identifier": "d03d68a8d18a", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE2A" }]');

        }
    }

    stopRanging() {

        if(Platform.OS  === 'android') {
            EstimoteManager.stopBeaconRangingScan();

            // DeviceEventEmitter.removeListener('Ranging');
            //DeviceEventEmitter.removeListener('Monitoring');
        }

    }


}

export default BeaconListener;