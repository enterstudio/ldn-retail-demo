import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Text } from '@components/ui/';
import { AppColors, AppStyles, AppSizes} from '@theme/';




/* Styles ================================= */
const styles = StyleSheet.create({

    infoItem: {
        flex: 2,
        height: 90,
        width: '100%',
        flexDirection: 'row'
    },
    text: {
        textAlign: 'center'
    }
})

//<View style={[{height: AppSizes.screen.height}]}>


class InfoItems extends Component {

    constructor(props) {
        super(props);
        this.yTranslate = new Animated.Value(1);
    }


    componentWillReceiveProps(nextProps) {
        console.log('nextProps: ' + JSON.stringify(nextProps));
        if (nextProps.slideIn) {
            console.log('animating');
            this.yTranslate.setValue(0);
            Animated.spring(
                this.yTranslate,
                {
                    toValue: 1,
                    friction: 5
                }
            ).start();
        }
    }


    render = () => {

        const translateY = this.yTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100]
        });

        const animatedStyles = [
            {
                transform: [
                    {
                        translateY: translateY
                    }
                ]
            }
        ];

        return (
            <View style={[{}]}>
                <Animated.View style={[animatedStyles]}>
                    <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                        <View>
                            <View style={[styles.infoItem, { backgroundColor: AppColors.base.greyDark}]}>
                                <Text style={[{color: AppColors.base.white}]}>
                                    {'Have your items delivered instead'}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                        <View>
                            <View style={[styles.infoItem, { backgroundColor: AppColors.base.greyLight}]}>
                                <Text style={[]}>
                                    {'View counter location'}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                        <View>
                            <View style={[styles.infoItem, { backgroundColor: AppColors.base.grey}]}>
                                <Text style={[]}>
                                    {'View receipt'}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )

    }
}

export default InfoItems;