import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import useAxios from '../../../api/estudios.api'

const NuevoResultado = () => {
    const navigation = useNavigation();

    //Definiendo los estados
    const [resultado, setResultado] = useState({
        Paciente_ID: 0,
        Personal_Medico_ID: 0,
        Estudio_ID: 0,
        Folio: '',
        Resultados: '',
        Observaciones: '',
        Estatus: ''
    });
    const axiosInstance = useAxios()

    const nuevoResultado = async () => {
        try {
            const resultadoCompleto = {
                ...resultado,
                Fecha_Registro: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };
            await axiosInstance.post('/resultados_estudios', resultadoCompleto)
            navigation.navigate('Resultados')
        } catch (error) {
            console.error('Error creando estudio:', error)
        }
    }

  return (
    <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>Nuevo resultado</Text>
            <View style={styles.form}>
                <TextInput
                    label='Identificador del Paciente'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={value => {
                        setResultado({...resultado, Paciente_ID: value })
                    }}
                />
                <TextInput
                    label='Identicador del médico'
                    mode='outlined'
                    multilinex
                    style={styles.textInput}
                    onChangeText={value => setResultado({...resultado, Personal_Medico_ID: value})}
                />
                <TextInput
                    label='Identificador del Estudio'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={value => setResultado({...resultado, Solicitud_ID: value})}
                />
                <TextInput
                    label='Folio'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={value => setResultado({...resultado, Folio: value})}
                />
                <TextInput
                    label='Resultados'
                    mode='outlined'
                    multiline
                    style={styles.textInput}
                    onChangeText={value => setResultado({...resultado, Resultados: value})}
                />
                <TextInput
                    label='Observaciones'
                    mode='outlined'
                    multiline
                    style={styles.textInput}
                    onChangeText={value => setResultado({...resultado, Observaciones: value})}
                />
                <TextInput
                    label='Estatus'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={value => setResultado({...resultado, Estatus: value})}
                />
                
                <Button
                    mode='contained-tonal'
                    style={{marginTop: 5}}
                    onPress={() => nuevoResultado()}
                >
                    Nuevo Estudio
                </Button>
            </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    form: {
        marginHorizontal: 20
    },
    textInput: {
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        marginBottom: 20
    }
});

export default NuevoResultado