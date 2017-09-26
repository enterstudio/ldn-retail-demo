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
        black: '#000000',
        green: '#098d47'
    }
}

const brand = {
    brand: {
        primary: '#003ea9',
        //primary: '#1A1F71',
        secondary: '#1A1F71',
        tertiary: '#F7B600'
    },
};

const text = {
    textPrimary: base.base.black,
    textSecondary: base.base.greyDark,
    headingPrimary: base.base.black,
    headingSecondary: base.base.greyDark,
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
