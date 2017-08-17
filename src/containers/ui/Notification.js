import React, {
    Component,
    PropTypes,
} from 'react';
import {
    StyleSheet,
    Text,
    Button,
    Animated,
    Dimensions,
} from 'react-native';

import { AppColors, AppStyles, AppSizes} from '@theme/';
import { connect } from 'react-redux';

const Screen = Dimensions.get('window');

const propTypes = {
    timeout: PropTypes.number,
    fadeTime: PropTypes.number,
    topHidden: PropTypes.number,
    topShow: PropTypes.number,
    message: PropTypes.string
};

const defaultProps = {
    timeout: 3000,
    fadeTime: 500,
    topHidden: -300,
    topShow: 60,
    message: '',
};


const mapStateToProps = state => ({
    message: state.notification.message
});

const mapDispatchToProps = {

};

class Notification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topValue: new Animated.Value(this.props.topHidden),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message && nextProps.message !== '' ) {
            this.setState({message: nextProps.message})
            this.slideIn();
        }

        //    const timerId = setTimeout(() => {
        //        this.slideOut();
        //        clearTimeout(timerId);
        //    }, this.props.timeout);
        // }
    }

    slideIn = () => {
        Animated.timing(this.state.topValue, {
            duration: this.props.fadeTime,
            toValue: this.props.topShow,
        }).start();
    }

    slideOut = () => {
        Animated.timing(this.state.topValue, {
            duration: this.props.fadeTime,
            toValue: this.props.topHidden,
        }).start();
    }

    render() {
        return (
            <Animated.View style={[Notification.styles.container, { top: this.state.topValue }]}>
                <Text style={Notification.styles.message}>{this.props.message}</Text>
                <Button title="Close" onPress={this.slideOut}></Button>
            </Animated.View>
        );
    }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;
Notification.styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: Screen.width,
        height: 300,
        backgroundColor: AppColors.base.white,
        alignItems: 'center',
        padding: 6,
        // borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        // shadowRadius: 1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        zIndex: 1
    },
    message: {
        textAlign: 'center'
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);