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
import Product from '@containers/shopping/Product';
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
            key={'shoppingCartTab'}
            {...navbarPropsTabs}
            icon={props => TabIcon({ ...props, icon: 'shopping-cart' })}
        >
            <Scene
                key={'shoppingCart'}
                {...navbarPropsTabs}
                title={'Your shopping cart'}
                component={Cart}
            />
            <Scene
                key={'productCart'}
                {...navbarPropsTabs}
                component={Product}
            />
        </Scene>

        <Scene
            key={'itemBrowserTab'}
            {...navbarPropsTabs}
            icon={props => TabIcon({ ...props, icon: 'shopping-bag' })}
        >
            <Scene
                key={'itemBrowser'}
                {...navbarPropsTabs}
                title={'Browsing history'}
                component={ItemBrowser}
            />
            <Scene
                key={'productBrowser'}
                {...navbarPropsTabs}
                component={Product}
            />
        </Scene>

        <Scene
            key={'ibeacon'}
            {...navbarPropsTabs}
            title={'Beacon Monitoring'}
            component={BeaconMonitor}
            icon={props => TabIcon({ ...props, icon: 'signal' })}
        />

    </Scene>
);

export default scenes;
