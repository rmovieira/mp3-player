import React from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Pesquisar from './Pesquisar';

import { pesquisarMusica } from './Servidor';

const Musica = ({ item, tocarMusica }) => {
    const tocar = React.useCallback(() => {
        tocarMusica(item);
    }, []);
    return (
        <Pressable onPress={tocar}>
            <View style={styles.musica}>
                <Text style={styles.tituloMusica}>{item.titulo}</Text>
                <Text style={styles.artista}>{item.artistas[0]}</Text>
            </View>
        </Pressable>
    );
};
Musica.propTypes = {
    item: PropTypes.object.isRequired,
    tocarMusica: PropTypes.func.isRequired,
};

const TelaPesquisa = (props) => {
    const [resultadoPesquisa, setResultadoPesquisa] = React.useState([]);
    const pesquisar = React.useCallback(async (texto) => {
        if (!texto) {
            return;
        }
        const resultado = await pesquisarMusica(texto);
        setResultadoPesquisa(resultado);
    });

    function tocarMusica(musica) {
        Navigation.push(props.componentId, {
            component: {
                name: 'TelaTocador',
                passProps: {
                    musica,
                }
            }
        });
    }

    function renderItem({ item }) {
        return (
            <Musica item={item} tocarMusica={tocarMusica} />
        );
    }

    return (
        <View style={styles.geral}>
            <Text style={styles.descricao} numberOfLines={3}>
                {'Pesquise por nome da música, artista, banda, album...'}
            </Text>
            <Pesquisar pesquisar={pesquisar} />
            <FlatList
                style={styles.lista}
                data={resultadoPesquisa}
                renderItem={renderItem}
                keyExtractor={React.useCallback(item => item.id)}
            />
        </View>
    );
};

TelaPesquisa.propTypes = {
    componentId: PropTypes.string.isRequired,
};

TelaPesquisa.options = {
    topBar: {
        title: {
            color: 'black'
        },
        elevation: 0,
    },
};

const styles = StyleSheet.create({
    geral: {
        flex: 1,
        marginBottom: 10,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    lista: {
        width: '100%',
    },
    descricao: {
        fontSize: 28,
        height: 60,
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    musica: {
        flex: 1,
        padding: 5,
    },
    tituloMusica: {
        fontSize: 32,
    },
    artista: {
        fontSize: 18,
    },
});

export default TelaPesquisa;
