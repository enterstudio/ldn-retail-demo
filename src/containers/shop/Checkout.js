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


class Checkout extends Component {

    render = () => {
        return (
            <View style={AppStyles.containerCentered}>
                <View style={[{paddingVertical: 100, paddingHorizontal: AppSizes.padding}]}>
                   <Text>Thank  you. Your items are being prepared for collection. You can pick them up from the nearest counter. </Text>
                </View>
                    <TouchableHighlight style={[]}
                                    underlayColor={AppColors.base.grey}
                                    onPress={() => {
                                                Actions.locator();
                                            }
                                       }>
                    <View
                        style={[AppStyles.paddedRow, {justifyContent: 'space-between', backgroundColor: AppColors.base.greyLight}]}>
                        <View style={[{justifyContent: 'center'}]}>
                            <Text style={[AppStyles.h3]}>View in store location</Text>
                        </View>
                        <Image
                            source={require('../../assets/icons/icon-location.png')}
                            style={[styles.largeIcon, { marginRight: 20}]}
                        />
                    </View>
                </TouchableHighlight>
                <Spacer  size={50}></Spacer>
                <TouchableHighlight style={[]}
                                    underlayColor={AppColors.base.grey}
                                    onPress={() => {

                                            }
                                       }>
                    <View
                        style={[AppStyles.paddedRow, {backgroundColor: AppColors.base.greyLight}]}>
                        <View style={[{justifyContent: 'center'}]}>
                            <Text style={[AppStyles.h3]}>Have your items delivered instead</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);


