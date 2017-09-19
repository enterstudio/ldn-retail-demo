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
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import timer from 'react-native-timer';

import { AppColors, AppStyles, AppSizes} from '@theme/';

const Screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
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
        backgroundColor: AppColors.base.greyLight,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.base.greyDark,

        // shadowRadius: 1,
        shadowOffset: {
            width: 0,
            height: 1
        },
    },
    message: {
        padding: AppSizes.paddingSml,
        fontSize: 18,
        textAlign: 'center'
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        paddingBottom: AppSizes.paddingSml,
        borderColor: AppColors.base.grey,
    },


});


const propTypes = {
    timeout: PropTypes.number,
    animationTime: PropTypes.number,
    heightClosed: PropTypes.number,
    heightOpen: PropTypes.number,
};

const defaultProps = {
    timeout: 4000,
    animationTime: 200,
    top: 0,
    topHidden: -150,
    okText: 'OK',
    cancelText: 'Cancel'

};

const mapStateToProps = (state) => {
    return {
        message: state.notification.message,
        deferred: state.notification.deferred,
        okText: state.notification.okText,
        cancelText: state.notification.cancelText
    }
}


class Notification extends Component {

    timerName = 'notificationTimer';

    constructor(props) {
        super(props);
        this.updateIndex = this.updateIndex.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.state = {
            selectedIndex: 1,
            top: new Animated.Value(this.props.topHidden),
        };
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex});
        if (selectedIndex === 1) {
            this.props.deferred.resolve();
        } else {
            this.props.deferred.reject();
        }
        const resetIndex = 1;
        timer.setTimeout(this.timerName, () => {
            this.setState({resetIndex});
            this.close();
        }, 200);
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps: ' + JSON.stringify(nextProps));
        this.open();

        const timerId = setTimeout(() => {
            this.close();
            clearTimeout(timerId);
        }, this.props.timeout);

    }

    open = () => {
        Animated.timing(this.state.top, {
            duration: this.props.animationTime,
            toValue: this.props.top
        }).start();
    }

    close = () => {
        Animated.timing(this.state.top, {
            duration: this.props.animationTime,
            toValue: this.props.topHidden
        }).start();
    }

    render() {
        return (
            <Animated.View style={[styles.container, {
                       top: this.state.top
                       }]}>
                <View style={styles.shadowContainer}>
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.message}>{this.props.message}</Text>
                        </View>
                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={this.state.selectedIndex}
                            buttons={[this.props.cancelText, this.props.okText]}
                            containerStyle={{height: 50, width: AppSizes.screen.width * 0.50}}
                        />
                    </View>
                </View>
            </Animated.View>
        );
    }

    componentWillUnmount() {
        timer.clearTimeout(this.timerName);
    }

}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;


export default connect(mapStateToProps)(Notification);