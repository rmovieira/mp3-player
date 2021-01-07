import React from 'react';
import { View, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import debounce from 'lodash.debounce';

const Pesquisar = (props) => {
    const [texto, setTexto] = React.useState('fresno');
    const [pesquisando, setPesquisando] = React.useState(false);
    const pesquisar = async (texto) => {
        if (!texto) {
            return;
        }
        await props.pesquisar(texto);
        setPesquisando(false);
    };

    const atrasarPesquisar = React.useRef(
        debounce(texto => {
            pesquisar(texto);
        }, 1000)
    );

    React.useEffect(() => {
        setPesquisando(true);
        atrasarPesquisar.current(texto);
    }, [texto]);

    return (
        <View style={styles.containerPesquisa}>
            <TextInput
                style={styles.pesquisa}
                placeholder={'Velho e o moço Los Hermanos'}
                onChangeText={setTexto}
                value={texto}
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

export default Pesquisar;