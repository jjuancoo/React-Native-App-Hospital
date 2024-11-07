import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button, Dialog, Portal } from 'react-native-paper'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../../context/AuthContext'

const SignIn = () => {

  const [Nombre_Usuario, setNombre_Usuario] = useState('')
  const [Correo_Electronico, setCorreo_Electronico] = useState('')
  const [Contrasena, setContrasena] = useState('')
  const [Numero_Telefono_Movil, setNumero_Telefono_Movil] = useState('')
  const {signIn} = useAuth()

  //Mostrar el dialog
  const [alert, setAlert] = useState(false)

  //Validacion
  const authenticateUser = async () => {
    if (Nombre_Usuario === '' || Correo_Electronico === '' || Contrasena === '' || Numero_Telefono_Movil === '') {
      setAlert(true)
      return;
    }
    //Alamcena el usuario
    const user = { Nombre_Usuario,  Contrasena, Numero_Telefono_Movil, Correo_Electronico}
    
    try {
      const url = 'https://privilegecare-deploy-gqmt.onrender.com/login/';
      await axios
        .post(url, user)
        .then(response => {
          const token = response.data;
          console.log(token);
          //Almacenar los datos en el storage
          // Almacenar el token y el correo en AsyncStorage
          AsyncStorage.setItem('token', token);
          AsyncStorage.setItem('correo', Correo_Electronico);
          console.log('Token y correo almacenados correctamente');

          signIn();
        })
        .catch(function (error) {
          console.log('Este es el: ', error);
        });

      // setTimeout(() => {
      //   AsyncStorage.clear().then(() => {console.log('Se vacion el async')})
      // }, 5000);
    } catch (error) {
      console.log(error)
    }
  }

  //Limpiar el async storage
  const cleanStorage = () => AsyncStorage.clear().then(() => {console.log('Storage limpiado')});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

      <TextInput
        mode='outlined'
        label='Nombre de usuario'
        style={styles.textInput}
        placeholder='Tu usuario'
        onChangeText={value => setNombre_Usuario(value)}
      />

      <TextInput
        mode='outlined'
        label='Correo electrónico'
        style={styles.textInput}
        placeholder='Tu correo'
        onChangeText={value => setCorreo_Electronico(value)}
      />

      <TextInput
        mode='outlined'
        label='Contraseña'
        style={styles.textInput}
        placeholder='**********'
        onChangeText={value => setContrasena(value)}
      />

      <TextInput
        mode='outlined'
        label='Telefono'
        style={styles.textInput}
        placeholder='Tu numero'
        onChangeText={value => setNumero_Telefono_Movil(value)}
      />

      <Button
        mode="elevated"
        style={styles.button}
        onPress={() => {authenticateUser()}}>
        Ingresar
      </Button>

      <Button
        mode="text"
        style={styles.button}
        onPress={() => {cleanStorage()}}>
        Limpiar Credenciales
      </Button>

      <Portal>
        <Dialog
          visible={alert}
          onDismiss={() => setAlert(false)}
        >
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Text variant='bodyMedium'>Todos los campos son obligatorios</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setAlert(false)}>Cerrar</Button>
        </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    padding: 18
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 110,
  },
  textInput: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20
  }
})

export default SignIn