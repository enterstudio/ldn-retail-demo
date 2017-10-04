import { DeviceEventEmitter, Platform, NativeModules } from 'react-native';
import EstimoteManager from 'react-android-estimote-manager';


const region = {
    identifier: 'Estimote',
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
};


class BeaconListener {


    init(beaconsDidRangeCb, movingCb ) {

        //DeviceEventEmitter.addListener(
        //    'Ranging',
        //    beaconsDidRangeCb
        //);

        DeviceEventEmitter.addListener(
            'Moving', movingCb
        );

    }

    startRanging() {
        console.log('start ranging');
        if(Platform.OS  === 'android') {
           // EstimoteManager.startBeaconRangingScan('[ {"identifier": "Estimote", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D" }, {"identifier": "d03d68a8d18a", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE2A" }]');

            EstimoteManager.startBeaconMovingScan('[{"identifier": "long-sleeve", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FEDD" },  {"identifier": "polo", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FECC"}]');
            //,{"identifier": "hoodie", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FEBB" }, {"identifier": "polo", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FEEE" },

        }

    }

    stopRanging() {

        if(Platform.OS  === 'android') {
            console.log('stop ranging');
            EstimoteManager.stopBeaconMovingScan();
           // EstimoteManager.stopBeaconRangingScan();
        }
    }

}


export default BeaconListener;
