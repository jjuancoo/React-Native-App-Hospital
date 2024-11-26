import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button, TextInput, Card } from 'react-native-paper'
import useAxios from '../../../api/estudios.api'

const EditForms = ({navigation, route}) => {
    //Definiendo el usuario
    const [user, setUser] = useState({})

    const {id} = route.params
    const axiosInstance = useAxios()

    //Cargar el usuario una vez abierto el modal
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axiosInstance.get(`/estudios/${id}`)
                setUser(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    }, [])
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudio</Text>
      <Card>
        <Text style={styles.subTitle}>{user.Tipo}</Text>
        <Text>{user.Nivel_Urgencia}</Text>
        <Text>{user.Dirigido_A}</Text>
        <Text>{user.Observaciones}</Text>
        <Text>{user.Estatus}</Text>
        <Text>{user.Fecha_Registro}</Text>
        <Button 
            title="Cerrar Modal" 
            onPress={() => navigation.goBack()}
            mode='outlined'
        >
          Borrar estudio
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default EditForms