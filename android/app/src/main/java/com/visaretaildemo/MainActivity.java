package com.visaretaildemo;

import com.facebook.react.ReactActivity;
import com.estimote.coresdk.common.requirements.SystemRequirementsChecker;


public class MainActivity extends ReactActivity {

    @Override
    protected void onResume() {
        super.onResume();
        SystemRequirementsChecker.checkWithDefaultDialogs(this);
    }

    @Override
    protected String getMainComponentName() {
        return "VisaRetailDemo";
    }
}
