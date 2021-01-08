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
        padding: 50,
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

Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({ root: stackInicial });
});
