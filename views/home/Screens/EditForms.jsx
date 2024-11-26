import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text,Button } from 'react-native-paper'
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
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    }, [])
    
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30}}>Este es un modal!</Text>
      <Text>{user.Tipo}</Text>
      <Button title="Cerrar Modal" onPress={() => navigation.goBack()} >Volver</Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    }
})

export default EditForms