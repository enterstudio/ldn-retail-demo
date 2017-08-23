import { DeviceEventEmitter, Platform } from 'react-native';
//import EstimoteManager from 'react-android-estimote-manager';


// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
const region = {
    identifier: 'Estimote',
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
};


class EstimoteListener {



    init(beaconsDidRangeCb) {

        //DeviceEventEmitter.addListener(
        //    'regionDidEnter',
        //    regionDidEnterCb
        //);
        //
        //DeviceEventEmitter.addListener(
        //    'regionDidExit',
        //    regionDidExitCb
        //);

        // Listen for beacon changes
        DeviceEventEmitter.addListener(
            'Beacons',
            beaconsDidRangeCb
        );

        this.startRanging();


    }

    startRanging() {

        if(Platform.OS  === 'android') {
           // EstimoteManager.startBeaconScan();
            // Beacons.startMonitoringForRegion(region.identifier, region.uuid);
        }
    }

    stopRanging() {
        //Beacons.stopMonitoringForRegion();
        //EstimoteManager.stopRangingBeaconsInRegion(region);
        //Beacons.stopUpdatingLocation();
        //DeviceEventEmitter.removeListener('regionDidEnter');
        //DeviceEventEmitter.removeListener('regionDidExit');
        //DeviceEventEmitter.removeListener('beaconsDidRange');
    }


}

export default EstimoteListener;