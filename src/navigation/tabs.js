/**
 * Tabs Scenes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';

import { Scene } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Components
import { TabIcon } from '@ui/';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';

// Scenes
import CartView from '@containers/shopping/CartView';
import IBeaconMonitorView from '@containers/beacons/IBeaconMonitorView';
import StyleGuide from '@containers/StyleGuideView';


const navbarPropsTabs = {
    ...AppConfig.navbarProps,
    renderLeftButton: () => <NavbarMenuButton />,
    sceneStyle: {
        ...AppConfig.navbarProps.sceneStyle,
        paddingBottom: AppSizes.tabbarHeight,
    },
};

/* Routes ==================================================================== */
const scenes = (

    <Scene key={'tabBar'} tabs tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={0.95}>
        <Scene
            key={'timeline'}
            {...navbarPropsTabs}
            title={'Shopping cart'}
            component={CartView}
            icon={props => TabIcon({ ...props, icon: 'shopping-cart' })}
            analyticsDesc={'ShoppingCart: Shopping Cart'}
        />

        <Scene
            key={'ibeacon'}
            {...navbarPropsTabs}
            title={'Ibeacon Monitoring'}
            component={IBeaconMonitorView}
            icon={props => TabIcon({ ...props, icon: 'rss' })}
            analyticsDesc={'ShoppingCart: Shopping Cart'}
        />

        <Scene
            key={'styleGuide'}
            {...navbarPropsTabs}
            title={'Style Guide'}
            component={StyleGuide}
            icon={props => TabIcon({ ...props, icon: 'text' })}
            analyticsDesc={'StyleGuide: Style Guide'}
        />
    </Scene>
);

export default scenes;
