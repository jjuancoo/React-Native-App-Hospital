import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Text, TextInput, Dialog, Portal } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import useAxios from '../../../api/estudios.api'

const CreateEstudio = () => {

    const navigation = useNavigation();

    //Definiendo los estados
    const [estudio, setEstudio] = useState({
        Tipo: '',
        Nivel_Urgencia: '',
        Solicitud_ID: 0,
        Consumibles_ID: 0,
        Estatus: '',
        Total_Costo: 0,
        Dirigido_A: '',
        Observaciones: ''
    });
    const [alert, setAlert] = useState(false)
    const axiosInstance = useAxios()

    const nuevoEstudio = async () => {
        //Validar el objeto
        for(const key in estudio) {
            const value = estudio[key];
            if(value === "" || value === 0) {
                setAlert(true)
                return;
            }
        }
        try {
            const estudioCompleto = {
                ...estudio,
                Fecha_Registro: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };
            await axiosInstance.post('/estudios', estudioCompleto)
            navigation.navigate('Estudios')
        } catch (error) {
            console.error('Error creando estudio:', error)
        }
    }

  return (
    <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>Nuevo estudio</Text>
            <View style={styles.form}>
                <TextInput
                    label='Tipo de Estudio'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={value => {
                        setEstudio({...estudio, Tipo: value })
                    }}
                />
                <TextInput
                    label='Observaciones'
                    mode='outlined'
                    multilinex
                    style={styles.textInput}
                    onChangeText={value => setEstudio({...estudio, Observaciones: value})}
                />
                <TextInput
                    label='Estatus'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={value => setEstudio({...estudio, Estatus: value})}
                />
                <TextInput
                    label='Nivel Urgencia'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={value => setEstudio({...estudio, Nivel_Urgencia: value})}
                />
                <TextInput
                    label='Costo total'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={value => setEstudio({...estudio, Total_Costo: value})}
                />
                <TextInput
                    label='Dirigido a'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={value => setEstudio({...estudio, Dirigido_A: value})}
                />
                <TextInput
                    label='Solicitud_Id'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={value => setEstudio({...estudio, Solicitud_ID: value})}
                />
                <TextInput
                    label='Consumibles_ID'
                    mode='outlined'
                    style={styles.textInput}
                    onChangeText={value => setEstudio({...estudio, Consumibles_ID: value})}
                />
                <Button
                    mode='contained-tonal'
                    style={{marginTop: 5}}
                    onPress={() => nuevoEstudio()}
                >
                    Nuevo Estudio
                </Button>
            </View>
        </View>

        <Portal>
            <Dialog
            visible={alert}
            onDismiss={() => setAlert(false)}
            >
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
                <Text variant='bodyMedium'>Error Tdos los campos son obligatorios</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => setAlert(false)}>Cerrar</Button>
            </Dialog.Actions>
            </Dialog>
        </Portal>
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

export default CreateEstudio