import { DeviceEventEmitter, Platform, NativeModules } from 'react-native';
import EstimoteManager from 'react-android-estimote-manager';


const region = {
    identifier: 'Estimote',
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
};


class BeaconListener {


    init(foundCb, movingCb  ) {

        DeviceEventEmitter.addListener(
            'Moving', movingCb
        );

        DeviceEventEmitter.addListener(
            'Found', foundCb
        );
    }

    startRanging() {
        console.log('start ranging');
        if(Platform.OS  === 'android') {
           // EstimoteManager.startBeaconRangingScan('[ {"identifier": "Estimote", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D" }, {"identifier": "d03d68a8d18a", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE2A" }]');

            EstimoteManager.startBeaconMovingScan('[' +
                '{"name": "TARGET_BEACON", "identifier": "ice02", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FEBB"}, ' +
                '{"name": "long-sleeve-polo", "identifier": "mint01", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FEFF"}, ' +
                '{"name": "hoodie", "identifier": "blueberry", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FEDD" },' +
                '{"name": "mens-polo", "identifier": "blueberry01","uuid": "B9407F30-F5F8-466E-AFF9-25556B57FECC"},' +
                '{"name": "womens-polo", "identifier": "mint02", "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FEEE"}]');

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
