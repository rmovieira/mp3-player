import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import TrackPlayer, { STATE_NONE } from 'react-native-track-player';

import Tocador from './Tocador';

const TelaTocador = ({ musica, componentId }) => {
    return (
        <View style={styles.geral}>
            <Tocador musica={musica} />
        </View>
    );
};
TelaTocador.propTypes = {
    musica: PropTypes.object.isRequired,
    componentId: PropTypes.string.isRequired,
};

TelaTocador.options = {
    topBar: {
        title: {
            color: 'black'
        },
        elevation: 0,
    }
};

const styles = StyleSheet.create({
    geral: {
        flex: 1,
        marginBottom: 10,
        marginHorizontal: 10,
        alignItems: 'center'
    },
});

export default TelaTocador;