import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { Text, Spacer } from '@components/ui/';
import { AppColors, AppStyles, AppSizes} from '@theme/';


/* Styles ================================= */
const styles = StyleSheet.create({

    container: {
        height: 500,
        flexDirection: 'column',
        backgroundColor: AppColors.base.white
    },
    infoItem: {
        height: 100,
        width: '100%',
        backgroundColor: AppColors.base.grey,
        marginVertical: 10
    },
    infoText: {
        textAlign: 'center',
        color: AppColors.base.white,
        fontSize: 17
    },
    iconTriangleLeft: {
        position: 'absolute',
        top: AppSizes.padding,
        left: -8
    },

    iconTriangleRight: {
        position: 'absolute',
        top: AppSizes.padding,
        right: -8
    }
})

class InfoItems extends Component {

    constructor(props) {
        super(props);
        this.yTranslate = new Animated.Value(0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.slideIn) {
            Animated.timing(
                this.yTranslate,
                {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.elastic(1)
                }
            ).start();
        }
    }


    render = () => {

        const translateY = this.yTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -500]
        });

        const animatedStyles = [
            {
                position: 'absolute',
                bottom: -500,
                height: 500,
                width: AppSizes.screen.width,
                backgroundColor: AppColors.base.white
            },
            {
                transform: [
                    {
                        translateY: translateY
                    }
                ]
            }
        ];

        return (
            <View style={styles.container}>
                <Animated.View style={[animatedStyles]}>
                    <Spacer size={20}></Spacer>
                    <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                        <View style={[styles.infoItem]}>
                            <View style={[styles.iconTriangleLeft]}>
                                <Image
                                    source={require('../../assets/icons/icon-triangle-right.png')}
                                    style={[AppStyles.smallIcon]}
                                />
                            </View>
                            <View
                                style={[AppStyles.paddedRow, {justifyContent: 'space-between', width:'100%'}]}>
                                <View style={[{justifyContent: 'center', width: '70%'}]}>
                                    <Text style={[styles.infoText]}>HAVE YOUR ITEMS DELIVERED INSTEAD</Text>
                                </View>
                                <Image
                                    source={require('../../assets/icons/icon-delivery-white.png')}
                                    style={[AppStyles.largeIcon, { marginRight: 20}]}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                        <View style={[styles.infoItem]}>
                            {/*<View style={[styles.iconTriangleRight]}>
                                <Image
                                    source={require('../../assets/icons/icon-triangle-left.png')}
                                    style={[AppStyles.smallIcon]}
                                />
                            </View>*/}
                            <View
                                style={[AppStyles.paddedRow, {justifyContent: 'space-between', width:'100%'}]}>
                                <Image
                                    source={require('../../assets/icons/icon-counter-white.png')}
                                    style={[AppStyles.largeIcon, { marginLeft: 20}]}
                                />

                                <View style={[{justifyContent: 'center', width: '70%'}]}>
                                    <Text style={[styles.infoText]}>VIEW COUNTER LOCATION</Text>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                        <View style={[styles.infoItem]}>
                            {/*<View style={[styles.iconTriangleLeft]}>
                                <Image
                                    source={require('../../assets/icons/icon-triangle-right.png')}
                                    style={[AppStyles.smallIcon]}
                                />
                            </View>*/}
                            <View
                                style={[AppStyles.paddedRow, {justifyContent: 'space-between', width:'100%'}]}>
                                <View style={[{justifyContent: 'center', width: '70%'}]}>
                                    <Text style={[styles.infoText]}>SHOW RECEIPT</Text>
                                </View>
                                <Image
                                    source={require('../../assets/icons/icon-receipt-white.png')}
                                    style={[AppStyles.largeIcon, { marginRight: 20}]}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )

    }
}

export default InfoItems;