/**
 * App Theme - Colors
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

const app = {
    background: '#E9EBEE',
    cardBackground: '#FFFFFF',
    listItemBackground: '#FFFFFF',
};

const base = {
    base: {
        white: '#ffffff',
        greyLight: '#ebebeb',
        grey: '#C5C5C5',
        greyDark: '#5D5D5D',
        black: '#000000'
    }
}

const brand = {
    brand: {
        primary: '#1A1F71',
        secondary: '#003ea9',
        tertiary: '#F7B600'
    },
};

const text = {
    textPrimary: base.base.black,
    textSecondary: base.base.black,
    headingPrimary: base.base.greyDark,
    headingSecondary: base.base.black,
};

const borders = {
    border: '#D0D1D5',
};

const tabbar = {
    tabbar: {
        background: base.base.greyDark,
        iconSelected: base.base.greyLight,
        iconDefault: base.base.black,
    },
};

export default {
    ...app,
    ...base,
    ...brand,
    ...text,
    ...borders,
    ...tabbar,
};
