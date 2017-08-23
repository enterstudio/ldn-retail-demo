import React, {
    Component,
    PropTypes,
} from 'react';

import {
    View,
    Platform,
    StyleSheet,
    Text,
    Animated,
    Dimensions
} from 'react-native';


import { Button } from '@components/ui/';
import { AppColors, AppStyles, AppSizes} from '@theme/';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import timer from 'react-native-timer';

const Screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 64,
            },
            android: {
                top: 56,
            }
        }),
        width: Screen.width,
        overflow: 'hidden',
        alignItems: 'center',
        // borderRadius: 12,
        zIndex: 1
    },
    shadowContainer: {
        padding: 6,
        width: '100%',
        height: '90%',
        backgroundColor: AppColors.base.white,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.base.grey,

        // shadowRadius: 1,
        shadowOffset: {
            width: 0,
            height: 1
        },
    },
    message: {
        textAlign: 'center'
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        backgroundColor: 'white',
        borderColor: AppColors.base.grey,
        overflow: 'hidden'
    },

    modalContent: {
        // height: 80
    },


    modalMsg: {
        padding: 20,
        fontSize: 18,
        textAlign: 'center'
    }
});


const propTypes = {
    timeout: PropTypes.number,
    fadeTime: PropTypes.number,
    heightClosed: PropTypes.number,
    heightOpen: PropTypes.number,
    message: PropTypes.string
};

const defaultProps = {
    timeout: 3000,
    fadeTime: 500,
    heightClosed: 0,
    heightOpen: 200,
    message: '',
};


const mapStateToProps = state => ({
    message: state.notification.message
});

const mapDispatchToProps = {};

class Notification extends Component {


    timerName = 'notificationTimer';

    constructor(props) {
        super(props);
        this.updateIndex = this.updateIndex.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.state = {
            selectedIndex: 1,
            height: new Animated.Value(this.props.heightClosed)
        };
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex});
        const resetIndex = 1;
        timer.setTimeout(this.timerName, () => {
            this.setState({resetIndex});
            this.close();
        }, 300);
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({height: new Animated.Value(this.props.heightClosed)});

        if (nextProps.message && nextProps.message !== '') {
            this.setState({message: nextProps.message.message})
            this.open();
        }

        //    const timerId = setTimeout(() => {
        //        this.close();
        //        clearTimeout(timerId);
        //    }, this.props.timeout);
        // }
    }

    open = () => {
        Animated.timing(this.state.height, {
            duration: this.props.fadeTime,
            toValue: this.props.heightOpen
        }).start();
    }

    close = () => {
        Animated.timing(this.state.height, {
            duration: this.props.fadeTime,
            toValue: this.props.heightClosed
        }).start();
    }

    render() {
        return (
            <Animated.View style={[styles.container, {
                       height: this.state.height
                       }]}>
                <View style={styles.shadowContainer}>
                    <Text style={styles.message}>{this.state.message}</Text>

                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalMsg}>Add to Item to cart?</Text>
                        </View>
                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={this.state.selectedIndex}
                            buttons={['Cancel', 'OK']}
                            containerStyle={{height: 50, width: AppSizes.screen.width * 0.50}}
                        />
                    </View>
                </View>
            </Animated.View>
        );
    }

    componentWillUnmount() {
        timer.clearTimeout(this.modalTimerName);
    }

}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;


export default connect(mapStateToProps, mapDispatchToProps)(Notification);