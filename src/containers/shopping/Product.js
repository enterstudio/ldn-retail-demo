import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { AppColors, AppStyles, AppSizes} from '@theme/';

import {
    Button,
    Spacer

} from '@components/ui/';


/* Styles ================================= */
const styles = StyleSheet.create({
    container : {
        backgroundColor: AppColors.base.white
    }
});


const mapDispatchToProps = (dispatch) => {
    return ({

    })
};

const mapStateToProps = state => ({


});

//TODO separate container and view
class Product extends Component {

    render = () => {
        return (
            <View style={styles.container}>
                <Text style={AppStyles.h1}>{'Product: ' + this.props.product.title} </Text>
            </View>
        )
    }
}

export default connect(mapStateToProps)(Product);
