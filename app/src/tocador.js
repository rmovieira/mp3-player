import React from 'react';
import { View, ActivityIndicator, Button, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import debounce from 'lodash.debounce';

import { obterMusica } from './servidor';

const Tocador = ({ musica }) => {
    const [playerConfigurado, setPlayerConfigurado] = React.useState(false);

    const tocar = React.useCallback(() => {
        TrackPlayer.play();
    });

    const parar = React.useCallback(() => {
        TrackPlayer.stop();
    });

    React.useEffect(() => {
        if (playerConfigurado) {
            return;
        }
        const configurarPlayer = async () => {
            await TrackPlayer.setupPlayer();
            setPlayerConfigurado(true);
            const track = {
                id: musica.id, // Must be a string, required

                // url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3', // Load media from the network
                url: `http://192.168.15.6:3000/musica/${musica.id}`, // Load media from the network
                // url: require('./avaritia.ogg'), // Load media from the app bundle
                // url: 'file:///storage/sdcard0/Music/avaritia.wav', // Load media from the file system 

                title: musica.titulo,
                artist: musica.artistas[0],
                album: musica.album,
                genre: musica.genero,
            };
            TrackPlayer.add([track]);
        };
        configurarPlayer();
    }, []);

    return (
        <View style={styles.containerPesquisa}>
            <Button
                title={'tocar'}
                onPress={tocar}
            />
            <Button
                title={'parar'}
                onPress={parar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default Tocador;