import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'
import useAxios from '../../../api/estudios.api'
import { useNavigation } from '@react-navigation/native'

const EditResultado = ({route}) => {

    const navigation = useNavigation()
    const axiosInstance = useAxios()
    const { id } = route.params

    //Definiendo el usuario
    const [resultado, setResultado] = useState({})
    
    const editResultado = async () => {
        try {
            await axiosInstance.put(`/resultados_estudios/${id}`, resultado);
            navigation.navigate('Resultados')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const getResultado = async () => {
            try {
                const response = await axiosInstance.get(`/resultados_estudios/${id}`)
                setResultado(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        getResultado();
    }, [])

  return (
    <>
        <View style={styles.container}>
            <Text style={styles.title}>Esditar estudio</Text>
            <View style={styles.form}>
                <TextInput
                    label='Folio'
                    mode='outlined'
                    style={styles.textInput}
                    value={resultado.Folio}
                    disabled={true}
                    // onChangeText={value => setResultado({...resultado, Folio: value })}
                />
                <TextInput
                    label='Rusultados'
                    mode='outlined'
                    multiline
                    style={styles.textInput}
                    value={resultado.Resultados}
                    onChangeText={value => setResultado({...resultado, Resultados: value })}
                />
                <TextInput
                    label='Estatus'
                    mode='outlined'
                    style={styles.textInput}
                    value={resultado.Estatus}
                    onChangeText={value => setResultado({...resultado, Estatus: value })}
                />
                <TextInput
                    label='Observaciones'
                    mode='outlined'
                    style={styles.textInput}
                    value={resultado.Observaciones}
                    onChangeText={value => setResultado({...resultado, Observaciones: value })}
                />
                <Button
                    mode='elevated'
                    style={styles.button}
                    onPress={() => {
                        editResultado();
                    }}
                >
                    Guardar cambios
                </Button>
                
            </View>
        </View>
    </>
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
        marginTop: 20
    }
})

export default EditResultado