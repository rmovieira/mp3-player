// In index.js of a new project
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

import TelaInicial from './src/TelaInicial';
import TelaPesquisa from './src/TelaPesquisa';
import TelaTocador from './src/TelaTocador';


Navigation.registerComponent('TelaInicial', () => TelaInicial);
Navigation.registerComponent('TelaPesquisa', () => TelaPesquisa);
Navigation.registerComponent('TelaTocador', () => TelaTocador);

Navigation.setDefaultOptions({
    // statusBar: {
    //     backgroundColor: '#4d089a'
    // },
    layout: {
        backgroundColor: 'whitesmoke',
        componentBackgroundColor: 'whitesmoke',
    },
    topBar: {
        title: {
            color: 'white',
            elevation: 0,
        },
        background: {
            color: 'whitesmoke',
            animate: true,
        }
    },
});

const stackInicial = {
    stack: {
        children: [
            {
                component: {
                    name: 'TelaInicial'
                },
            },
        ]
    },
};

const stackConfigurada = {
    stack: {
        children: [
            {
                component: {
                    name: 'TelaPesquisa'
                },
            },
        ]
    },
};

Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({ root: stackInicial });
});

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'whitesmoke'
    }
});