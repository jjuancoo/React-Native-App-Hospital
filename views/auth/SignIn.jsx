import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button, Dialog, Portal } from 'react-native-paper'

const SignIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //Mostrar el dialog
  const [alert, setAlert] = useState(false)

  //Validacion
  const validateInputs = () => {
    if (email.trim() === '' || password.trim() === '') {
      setAlert(true)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

      <TextInput
        mode='outlined'
        label='Correo electrónico'
        style={styles.textInput}
        placeholder='Tu correo'
        onChange={value => setEmail(value)}
      />

      <TextInput
        mode='outlined'
        label='Contraseña'
        style={styles.textInput}
        placeholder='**********'
        onChange={value => setPassword(value)}
      />

      <Button
        mode="elevated"
        style={styles.button}
        onPress={() => {validateInputs()}}>
        Ingresar
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