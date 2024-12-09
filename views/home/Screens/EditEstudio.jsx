import React, {useEffect, useState} from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import useAxios from '../../../api/estudios.api'

const EditEstudio = ({ route }) => {

    const navigation = useNavigation();
    const axiosInstance = useAxios()

    const { id } = route.params;

    //States
    const [user, setUser] = useState({})

    const editStudio = async () => {
        try {
            await axiosInstance.put(`/estudios/${id}`, user)
            navigation.navigate('Estudios')
        } catch (error) {
            console.error(error)
        }
        navigation.navigate('Estudios');
        console.log('Estudio editado correctamente')
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axiosInstance.get(`/estudios/${id}`)
                setUser(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    }, [])

  return (
    <>
        <View style={styles.container}>
            <Text style={styles.title}>Esditar estudio</Text>
            <View style={styles.form}>
                <TextInput
                    label='Tipo'
                    mode='outlined'
                    style={styles.textInput}
                    value={user.Tipo}
                    onChangeText={value => setUser({...user, Tipo: value })}
                />
                <TextInput
                    label='Nivel de urgencia'
                    mode='outlined'
                    style={styles.textInput}
                    value={user.Nivel_Urgencia}
                    onChangeText={value => setUser({...user, Nivel_Urgencia: value })}
                />
                <TextInput
                    label='Dirigido a'
                    mode='outlined'
                    style={styles.textInput}
                    value={user.Dirigido_A}
                    onChangeText={value => setUser({...user, Dirigido_A: value })}
                />
                <TextInput
                    label='Observaciones'
                    mode='outlined'
                    style={styles.textInput}
                    value={user.Observaciones}
                    onChangeText={value => setUser({...user, Observaciones: value })}
                />
                <TextInput
                    label='Costo total'
                    mode='outlined'
                    style={styles.textInput}
                    value={user.Total_Costo}
                    onChangeText={value => setUser({...user, Total_Costo: value })}
                />
                <Button
                    mode='elevated'
                    style={styles.button}
                    onPress={() => {
                        editStudio();
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

export default EditEstudio