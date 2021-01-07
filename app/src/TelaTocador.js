import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Tocador from './tocador';
const TelaTocador = (props) => {
    return (
        <View style={styles.root}>
            <Tocador musica={props.musica} />
        </View>
    );
};

TelaTocador.options = {
    topBar: {
        title: {
            text: 'Mp3 player',
            color: 'black'
        },
        // background: {
        //     color: 'whitesmoke'
        // },
        elevation: 0,
    }
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'whitesmoke'
    }
});

export default TelaTocador;