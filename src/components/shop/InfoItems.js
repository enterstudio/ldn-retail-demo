import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { Text } from '@components/ui/';
import { AppColors, AppStyles, AppSizes} from '@theme/';


/* Styles ================================= */
const styles = StyleSheet.create({


    container: {
        height: 500,
        flexDirection: 'column'
    },
    infoItem: {
         height: 100,
        width: '100%',
        flexDirection: 'row'
    },
    text: {
        textAlign: 'center'
    },
    infoContainer: {

    }
})

class InfoItems extends Component {

    constructor(props) {
        super(props);
        this.yTranslate = new Animated.Value(0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.slideIn) {
            Animated.spring(
                this.yTranslate,
                {
                    toValue: 1,
                    friction: 3
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
                width: AppSizes.screen.width
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
                    <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                        <View >
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
                            <View style={[styles.infoItem, { backgroundColor: AppColors.base.greyDark}]}>
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