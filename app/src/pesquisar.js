import React from 'react';
import { View, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const Pesquisar = (props) => {
    const [texto, setTexto] = React.useState('bic');
    const [pesquisando, setPesquisando] = React.useState(false);
    const pesquisar = React.useCallback(async (texto) => {
        if (!texto) {
            return;
        }
        await props.pesquisar(texto);
        setPesquisando(false);
    });

    const atrasarPesquisar = React.useRef(
        debounce(texto => {
            pesquisar(texto);
        }, 1000)
    );

    React.useEffect(() => {
        setPesquisando(!!texto);
        atrasarPesquisar.current(texto);
    }, [texto]);

    return (
        <View style={styles.containerPesquisa}>
            <TextInput
                style={styles.caixaDeTexto}
                placeholder={'Velho e o moço Los Hermanos'}
                onChangeText={setTexto}
                value={texto}
                numberOfLines={1}
            />
            <View style={styles.indicadorCarregando}>
                {
                    pesquisando &&
                    <ActivityIndicator size="small" color="#0000ff" />
                }
            </View>
        </View>
    );
};

Pesquisar.propTypes = {
    pesquisar: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    containerPesquisa: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomWidth: 1,
        backgroundColor: '#E8E8E8'
    },
    caixaDeTexto: {
        flex: 1,
        fontSize: 22,
    },
    indicadorCarregando: {
        flex: .1,
        justifyContent: 'center',
    },
});

export default Pesquisar;