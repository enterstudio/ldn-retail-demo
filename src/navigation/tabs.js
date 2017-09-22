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
import Cart from '@containers/shop/Cart';
import ItemBrowser from '@containers/shop/ItemBrowser';
import Product from '@containers/shop/Product';
import Locator from '@containers/location/Locator';
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
            key={'itemBrowserTab'}
            {...navbarPropsTabs}
            icon={props => TabIcon({ ...props, icon: 'shopping-bag' })}
        >
            <Scene
                key={'itemBrowser'}
                {...navbarPropsTabs}
                title={'BROWSING HISTORY'}
                component={ItemBrowser}
            />
            <Scene
                key={'productBrowser'}
                {...navbarPropsTabs}
                component={Product}
            />
            <Scene
                key={'locator'}
                {...navbarPropsTabs}
                title={'LOCATOR'}
                component={Locator}
            />
        </Scene>

        <Scene
            key={'shoppingCartTab'}
            {...navbarPropsTabs}
            icon={props => TabIcon({ ...props, icon: 'shopping-cart' })}
        >
            <Scene
                key={'shoppingCart'}
                {...navbarPropsTabs}
                title={'YOUR SHOPPING CART'}
                component={Cart}
            />
            <Scene
                key={'productCart'}
                {...navbarPropsTabs}
                component={Product}
            />
        </Scene>


        <Scene
            key={'ibeacon'}
            {...navbarPropsTabs}
            title={'BEACON MONITORING'}
            component={BeaconMonitor}
            icon={props => TabIcon({ ...props, icon: 'signal' })}
        />

    </Scene>
);

export default scenes;
