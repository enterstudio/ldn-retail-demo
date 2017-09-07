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
        primary: base.base.greyDark,
        secondary: base.base.grey,
        tertiary: base.base.greyLight,
    },
};

const text = {
    textPrimary: base.black,
    textSecondary: '#777777',
    headingPrimary: brand.brand.primary,
    headingSecondary: brand.brand.primary,
};

const borders = {
    border: '#D0D1D5',
};

const tabbar = {
    tabbar: {
        background: '#ffffff',
        iconDefault: '#BABDC2',
        iconSelected: brand.brand.primary,
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
