import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';

export default class Progresso extends ProgressComponent {

    formatarDuracao = () => {

        var date = new Date(0);
        date.setSeconds(this.props.duracao - this.state.position); // specify value for SECONDS here
        var timeString = date.toISOString().substr(11, 8);
        return timeString;
    }

    render() {
        return (
            <View style={styles.geral}>
                <Text style={styles.contador}>
                    {this.formatarDuracao()}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    geral: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    contador: {
        fontSize: 32,
    }
});
