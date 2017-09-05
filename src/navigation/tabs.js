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
import Cart from '@containers/shopping/Cart';
import ItemBrowser from '@containers/shopping/ItemBrowser';
import BeaconMonitor from '@containers/beacon/BeaconMonitor';


const navbarPropsTabs = {
    ...AppConfig.navbarProps,
    renderLeftButton: () => <NavbarMenuButton />,
    sceneStyle: {
        ...AppConfig.navbarProps.sceneStyle,
        paddingBottom: AppSizes.tabbarHeight,
    }
};

/* Routes ==================================================================== */
const scenes = (

    <Scene key={'tabBar'} tabs tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={0.95}>
        <Scene
            key={'shoppingCart'}
            {...navbarPropsTabs}
            title={'Your shopping cart'}
            component={Cart}
            icon={props => TabIcon({ ...props, icon: 'shopping-cart' })}
            analyticsDesc={'ShoppingCart: Shopping Cart'}
        />

        <Scene
            key={'itemBrowser'}
            {...navbarPropsTabs}
            title={'Browsing history'}
            component={ItemBrowser}
            icon={props => TabIcon({ ...props, icon: 'shopping-bag' })}
            analyticsDesc={'ItemBrowser: Item Browser'}
        />

        <Scene
            key={'ibeacon'}
            {...navbarPropsTabs}
            title={'Beacon Monitoring'}
            component={BeaconMonitor}
            icon={props => TabIcon({ ...props, icon: 'signal' })}
            analyticsDesc={'iBeacon: Beacon monitoring'}
        />

    </Scene>
);

export default scenes;
