import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'

const SignIn = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        <TextInput
          placeholder='Correo electrónico'
          label='Correo electrónico'
          mode='outlined'
          style={styles.textInput}
        />
        <TextInput
          placeholder='**********'
          mode='outlined'
          label="Contraseña"
          style={styles.textInput}
        />
        <Button mode='elevated' style={styles.button}>
          Ingresar
        </Button>
    </View>
  )
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