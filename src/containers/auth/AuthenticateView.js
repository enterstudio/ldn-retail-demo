/**
 * Authenticate Screen
 *  - Entry screen for all authentication
 *  - User can tap to login, forget password, signup...
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { Spacer, Text, Button } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    background: {
        backgroundColor: AppColors.brand.secondary,
        height: AppSizes.screen.height,
        width: AppSizes.screen.width,
    },
    logo: {
        width: AppSizes.screen.width * 0.40,
        height: 80,
        resizeMode: 'contain'
    },
    whiteText: {
        color: '#FFF',
    },
    colorBox: {
        backgroundColor: AppColors.brand.tertiary,
        width: AppSizes.screen.width * 0.35,
        height: 5,
        alignSelf: 'flex-end'
    }

});

/* Component ==================================================================== */
class Authenticate extends Component {
    static componentName = 'Authenticate';

    render = () => (
        <View style={[AppStyles.containerCentered, AppStyles.container, styles.background]}>
            <View>
                <Image
                    source={require('../../assets/images/visa-logo.png')}
                    style={[styles.logo]}
                />
                <View style={[styles.colorBox]}>
                </View>
                <Spacer size={100}/>
            </View>

            <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
                <View style={[AppStyles.flex1]}>
                    <Button
                        raised
                        title={'Login'}
                        icon={{ name: 'user', type: 'entypo' }}
                        onPress={Actions.login}
                        backgroundColor={AppColors.brand.primary}
                    />
                </View>
            </View>

            <Spacer size={10}/>

            <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
                <View style={[AppStyles.flex1]}>
                    <Button
                        raised
                        title={'Sign up'}
                        icon={{ name: 'add-user', type: 'entypo'}}
                        onPress={Actions.signUp}
                        backgroundColor={AppColors.brand.primary}
                    />
                </View>
            </View>

            <Spacer size={65}/>

        </View>
    )
}

/* Export Component ========= */
export default Authenticate;
