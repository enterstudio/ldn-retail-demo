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



    init(beaconsDidRangeCb, regionMonitoringCb, telemetryCb, nearablesCb ) {

        //DeviceEventEmitter.addListener(
        //    'Monitoring',
        //    regionMonitoringCb
        //);
        //
        //
        //DeviceEventEmitter.addListener(
        //    'Ranging',
        //    beaconsDidRangeCb
        //);

        //DeviceEventEmitter.addListener(
        //    'Telemetry',
        //    telemetryCb
        //);

        DeviceEventEmitter.addListener(
            'Nearable', nearablesCb
        );

    }

    startRanging() {

        if(Platform.OS  === 'android') {
          // EstimoteManager.startBeaconRangingScan('[ {"identifier": "Estimote", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D" }, {"identifier": "d03d68a8d18a", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE2A" }]');
           //this.startNearableScanning();
        }
    }


    startNearableScanning() {

        if(Platform.OS  === 'android') {
            //EstimoteManager.startBeaconNearableScan();

        }
    }

    stopRanging() {

        if(Platform.OS  === 'android') {
            //EstimoteManager.stopBeaconNearableScan();
           // EstimoteManager.stopBeaconRangingScan();
            //DeviceEventEmitter.removeListener('Ranging');

        }
    }



}


export default BeaconListener;
