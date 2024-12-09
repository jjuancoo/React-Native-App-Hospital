import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button, TextInput, Card, Dialog, Portal } from 'react-native-paper'
import useAxios from '../../../api/estudios.api'
import { useNavigation } from '@react-navigation/native'

const EditForms = ({ route }) => {
    const navigation = useNavigation()

    //Definiendo el usuario
    const [user, setUser] = useState({})
    const [visible, setVisible] = useState(false)

    const { id } = route.params
    const axiosInstance = useAxios()

    const showAlert = () => {
      setVisible(true)
    }

    const deleteStudio = async (id) => {
      try {
        await axiosInstance.delete(`/estudios/${id}`)
        console.log(`deleted ${id}`)
      } catch (error) {
        console.log(error)
      }
      navigation.navigate('Estudios')
    }

    //Cargar el usuario una vez abierto el modal
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
        <Text style={styles.title}>Estudio</Text>
        <View style={{marginHorizontal: 12}}>
          <Card>
            <Card.Content>
              <Text style={styles.subTitle}>{user.Tipo}</Text>
              <Text>{user.Nivel_Urgencia}</Text>
              <Text>{user.Dirigido_A}</Text>
              <Text>{user.Observaciones}</Text>
              <Text>{user.Estatus}</Text>
              <Text>{user.Fecha_Registro}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                title="Cerrar Modal"
                onPress={() => navigation.goBack()}
                mode="outlined">
                Volver
              </Button>
              <Button
                title="Cerrar Modal"
                onPress={showAlert}
                mode="contained">
                Borrar estudio
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Eliminar</Dialog.Title>
          <Dialog.Content>
            <Text>¿Está seguro de que desea eliminar el estudio?</Text>
            <Text>Esta acción no se puede revertir</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cerrar</Button>
            <Button 
              mode='contained'
              onPress={() => deleteStudio(id)}
            >
              Eliminar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
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