package com.visaretaildemo;

import android.os.Bundle;
import android.util.Log;

import com.estimote.coresdk.observation.region.beacon.BeaconRegion;
import com.estimote.coresdk.recognition.packets.Beacon;

import com.estimote.coresdk.service.BeaconManager;
import com.facebook.react.ReactActivity;


import java.util.List;
import java.util.UUID;

public class MainActivity extends ReactActivity {

    private BeaconManager beaconManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        beaconManager = new BeaconManager(this);

        final BeaconRegion region = new BeaconRegion("Estimotes", UUID.fromString("B9407F30-F5F8-466E-AFF9-25556B57FE6D"), null, null);


        beaconManager.connect(new BeaconManager.ServiceReadyCallback() {
            @Override
            public void onServiceReady() {
                beaconManager.startRanging(region);
            }
        });


        beaconManager.setRangingListener(new BeaconManager.BeaconRangingListener() {
            @Override
            public void onBeaconsDiscovered(BeaconRegion beaconRegion, List<Beacon> list) {
                Log.d("estimotes", "" + list.size());

            }
        });

//        beaconManager.setNearableListener(new BeaconManager.NearableListener() {
//            @Override
//            public void onNearablesDiscovered(List<Nearable> nearables) {
//                Log.d("estimotes", "Discovered nearables: " + nearables);
//            }
//        });
//
//        // Should be invoked in #onStart.
//        beaconManager.connect(new BeaconManager.ServiceReadyCallback() {
//            @Override
//            public void onServiceReady() {
//                beaconManager.startNearableDiscovery();
//            }
//        });



//        beaconManager.setTelemetryListener(new BeaconManager.TelemetryListener() {
//            @Override
//            public void onTelemetriesFound(List<EstimoteTelemetry> telemetries) {
//                for (EstimoteTelemetry tlm : telemetries) {
//                    Log.d("TELEMETRY", "beaconID: " + tlm.deviceId + ", temperature: " + tlm.temperature + " °C");
//                }
//            }
//        });


    }

    @Override
    protected String getMainComponentName() {
        return "VisaRetailDemo";
    }
}
