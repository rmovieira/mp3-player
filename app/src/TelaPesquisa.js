import React from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import Pesquisar from './pesquisar';

import { pesquisarMusica } from './servidor';


const Musica = ({ item, tocarMusica }) => {
    const tocar = React.useCallback(() => {
        tocarMusica(item);
    }, []);
    return (
        <Pressable onPress={tocar}>
            <View style={styles.musica}>
                <Text style={styles.tituloMusica}>{item.titulo}</Text>
                <Text>{item.artistas[0]}</Text>
            </View>
        </Pressable>
    );
};

const TelaPesquisa = (props) => {
    const [resultadoPesquisa, setResultadoPesquisa] = React.useState([]);
    const pesquisar = async (texto) => {
        if (!texto) {
            return;
        }
        const resultado = await pesquisarMusica(texto);
        setResultadoPesquisa(resultado);
    };

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
            <Text style={styles.descricao} numberOfLines={2}>
                {'Pesquise por nome da música, artista, banda, album...'}
            </Text>
            <Pesquisar pesquisar={pesquisar} />
            <FlatList
                data={resultadoPesquisa}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

TelaPesquisa.options = {
    topBar: {
        visible: false,
    }
};

const styles = StyleSheet.create({
    geral: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 1
    },
    descricao: {
        textAlign: 'center',
        fontSize: 22,
        paddingHorizontal: 20,
        height: 55,
        justifyContent: 'flex-start',
    },
    containerPesquisa: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        borderBottomWidth: 1,
    },
    pesquisa: {
        flex: 1,
    },
    indicadorCarregando: {
        flex: .1,
        justifyContent: 'center',
    },
    musica: {
        flex: 1,
    },
    tituloMusica: {
        fontSize: 20,
    },


});

export default TelaPesquisa;