import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Text } from '@components/ui/';
import { AppColors, AppStyles, AppSizes} from '@theme/';

const ANIMATION_DURATION = 550;


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

const DELEVERY = 'DELEVERY';
const LOCATION = 'LOCATION';
const RECEIPT = 'RECEIPT';

class InfoItem extends Component {
    constructor(props) {
        super(props);
        this._animated = new Animated.Value(300);
    }

    componentDidMount() {
        Animated.timing(this._animated, {
            toValue: 1,
            duration: ANIMATION_DURATION,
        }).start();
    }


    render() {
        const item = this.props.item;

        const rowStyles = [
            styles.row,
            {
                transform: [
                    {
                        translateY: this._animated
                    }
                ]
            }
        ];


        switch (this.props.type) {
            case DELEVERY:
                return (
                    <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                        <Animated.View style={rowStyles}>
                            <View style={[styles.infoItem, { backgroundColor: AppColors.base.greyDark}]}>
                                <Text style={[{color: AppColors.base.white}]}>
                                    {'Have your items delivered instead'}
                                </Text>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                )

            case LOCATION:
                return (
                    <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                        <Animated.View style={rowStyles}>
                            <View style={[styles.infoItem, { backgroundColor: AppColors.base.greyLight}]}>
                                <Text style={[]}>
                                    {'View counter location'}
                                </Text>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                )
            case RECEIPT:
                return (
                    <TouchableOpacity onPress={() => {
                           //this.props.onPress();
                        }}>
                        <Animated.View style={rowStyles}>
                            <View style={[styles.infoItem, { backgroundColor: AppColors.base.grey}]}>
                                <Text style={[]}>
                                    {'View receipt'}
                                </Text>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                )
            default:
                return null;
        }

    }
}

InfoItem.DELIVERY = DELEVERY;
InfoItem.LOCATION = LOCATION;
InfoItem.RECEIPT = RECEIPT;

export default InfoItem;