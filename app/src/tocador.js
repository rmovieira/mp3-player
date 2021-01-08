import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Entypo';
import Progresso from './Progresso';
import { servidorAtual } from './Servidor';

const Controlador = () => {
    const [tocando, setTocando] = React.useState(false);

    const tocar = React.useCallback(() => {
        TrackPlayer.play();
        setTocando(true);
    });

    const parar = React.useCallback(() => {
        TrackPlayer.stop();
        setTocando(false);
    });

    const pause = React.useCallback(() => {
        TrackPlayer.pause();
        setTocando(false);
    });

    return (
        <View style={styles.controladorGeral}>
            <View style={styles.controladorBotoes}>
                {
                    tocando
                    &&
                    <Icon name="controller-stop" size={80} color="black" onPress={parar} />
                }
            </View>
            <View style={styles.controladorBotoes}>
                {
                    tocando ?
                        <Icon name="controller-paus" size={80} color="black" onPress={pause} />
                        :
                        <Icon name="controller-play" size={80} color="black" onPress={tocar} />
                }
            </View>
            <View style={styles.controladorBotoes}>
                {
                    //apenas para ocupar o espaço
                }
            </View>

        </View>
    );
};

const Tocador = ({ musica }) => {
    const [playerConfigurado, setPlayerConfigurado] = React.useState(false);


    React.useEffect(() => {
        if (playerConfigurado) {
            return;
        }
        const configurarPlayer = async () => {
            await TrackPlayer.setupPlayer();
            setPlayerConfigurado(true);
            const track = {
                id: musica.id,
                url: `${servidorAtual()}/musica/${musica.id}`,
                title: musica.titulo,
                artist: musica.artistas[0],
                album: musica.album,
                genre: musica.genero,
                duration: musica.duracao,
            };
            TrackPlayer.add([track]);
        };
        configurarPlayer();
    }, []);

    return (
        <View style={styles.geral}>
            <View style={styles.descricao}>
                <Text style={styles.titulo}>{musica.titulo}</Text>
                <Text style={styles.artista}>{musica.artistas[0]}</Text>
            </View>
            <Progresso duracao={musica.duracao} />
            <View style={styles.tocador}>
                <Controlador />
            </View>
        </View>
    );
};
Tocador.propTypes = {
    musica: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    geral: {
        justifyContent: 'space-between',
        flex: 1,
    },
    descricao: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 32,
        textAlign: 'center',
    },
    artista: {
        fontSize: 22,
        textAlign: 'center',
    },
    tocador: {
        flexDirection: 'row',
        flex: 1,
    },
    controladorGeral: { width: '100%', flex: 1, flexDirection: 'row', alignItems: 'center' },
    controladorBotoes: { width: '100%', flex: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
});

export default Tocador;