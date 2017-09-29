/**
 * App Theme - Sizes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

export default {

  navbarHeight: (Platform.OS === 'ios') ? 64 : 54,
  statusBarHeight: (Platform.OS === 'ios') ? 16 : 24,
  tabbarHeight: 51,

  padding: 20,
  paddingSml: 10,

  borderRadius: 2,

  // Window Dimensions
  screen: {
    height: screenHeight,
    width: screenWidth,

    widthHalf: screenWidth * 0.5,
    widthThird: screenWidth * 0.333,
    widthTwoThirds: screenWidth * 0.666,
    widthQuarter: screenWidth * 0.25,
    widthThreeQuarters: screenWidth * 0.75,

    heightHalf: screenHeight / 2,
    heightThird: screenHeight * 0.333,
    heightTwoThirds: screenHeight * 0.666,
    heightQuarter: screenHeight * 0.25,
    heightThreeQuarters: screenHeight * 0.75,
    innerHeight: screenHeight - ((Platform.OS === 'ios') ? 64 : 54) - ((Platform.OS === 'ios') ? 16 : 24) - 51
    
  },

};
