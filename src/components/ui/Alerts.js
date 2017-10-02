/**
 * Alerts - Status/Success/Error Messages
 *
    <Alerts
      error={'Error hey'}
      success={'Hello Success'}
      status={'Something\'s happening...'}
    />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';

import { AppColors, AppStyles, AppSizes} from '@theme/';


// Components
import { Spacer, Text } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  alerts: {
    left: 0,
    right: 0,
  },

  // Success
  msg: {
    right: 0,
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderLeftWidth: 3,
    borderColor: '#1C854C',
    backgroundColor: '#59DC9A',
  },
  msg_text: {
    textAlign: 'center',
    color: '#16693c',
    fontWeight: '500',
  },

  // Error
  msgError: {
    borderColor: '#C02827',
    backgroundColor: '#FB6567',
  },
  msgError_text: {
    color: '#7f1a1a',
  },

  // Status
  msgStatus: {
    backgroundColor: AppColors.brand.tertiary,
    borderColor: AppColors.brand.tertiary,
  },
  msgStatus_text: {
    color: AppColors.base.black,
  },
});

/* Component ==================================================================== */
const Alerts = ({ status, success, error }) => (
  <View style={styles.alerts}>
    {!!success &&
      <View>
        <View style={[styles.msg]}>
          <Text style={[styles.msg_text]}>{success}</Text>
        </View>
        <Spacer size={20} />
      </View>
    }

    {!!status &&
      <View>
        <View style={[styles.msg, styles.msgStatus]}>
          <Text style={[styles.msg_text, styles.msgStatus_text]}>
            {status}
          </Text>
        </View>
        <Spacer size={20} />
      </View>
    }

    {!!error &&
      <View>
        <View style={[styles.msg, styles.msgError]}>
          <Text
            style={[
              styles.msg_text,
              styles.msgError_text,
            ]}
          >
            {error}
          </Text>
        </View>
        <Spacer size={20} />
      </View>
    }
  </View>
);

Alerts.propTypes = {
  status: PropTypes.string,
  success: PropTypes.string,
  error: PropTypes.string,
};

Alerts.defaultProps = {
  status: '',
  success: '',
  error: '',
};

Alerts.componentName = 'Alerts';

/* Export Component ==================================================================== */
export default Alerts;
