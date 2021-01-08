import React from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { conectarNoServidor } from './Servidor';
import PropTypes from 'prop-types';

const TelaInicial = ({ componentId }) => {
    const [servidor, setServidor] = React.useState('http://192.168.15.6:3000');
    const [conectando, setConectando] = React.useState(false);
    async function conectar() {
        setConectando(true);
        const conectado = await conectarNoServidor(servidor);
        setConectando(false);
        if (conectado) {
            //TODO acho que aqui nao é o melhor lugar para trocar as rotas root
            Navigation.push(componentId, {
                component: {
                    name: 'TelaPesquisa',
                },

            });
        }

    }
    return (
        <View style={styles.root}>
            <Image
                style={styles.tinyLogo}
                resizeMode={'contain'}
                source={require('../img/open-doodles-dancing.png')}
            />
            <Text style={styles.descricao}>{'Onde está o servidor? '}</Text>
            <TextInput
                style={styles.servidor}
                placeholder={'Ex: http://192.168.161.1:3000'}
                onChangeText={setServidor}
                value={servidor}
            />
            <Button
                disabled={conectando}
                title={'Conectar'}
                onPress={conectar}
                color={'black'}
            />
        </View>
    );
};

TelaInicial.options = {
    topBar: {
        visible: false,
    }
};

TelaInicial.propTypes = {
    componentId: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        width: 250,
        height: 250,
    },
    servidor: {
        width: '50%',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    descricao: {
        fontSize: 22,
    }
});

export default TelaInicial;
