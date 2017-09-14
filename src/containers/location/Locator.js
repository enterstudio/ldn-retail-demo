import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {AppColors, AppStyles, AppSizes} from '@theme/';

import {
    Text,
    Button,
    Spacer
} from '@components/ui/';


/* Styles ======================== */
const styles = StyleSheet.create({

})

const mapDispatchToProps = (dispatch) => { return {}}

const mapStateToProps = state => ({});


class Locator extends Component {

    render = () => {
        return (
            <View style={AppStyles.containerCentered}>
                <Image
                    source={require('../../assets/images/floor-map.png')}
                    style={[{width: AppSizes.screen.width - 50, height: AppSizes.screen.width,  resizeMode: 'contain'}]}
                />
            </View>)

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Locator);


