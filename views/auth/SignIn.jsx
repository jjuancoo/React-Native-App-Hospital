import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'

const SignIn = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        <TextInput
          placeholder='Correo electrónico'
          label='Correo electrónico'
          mode='outlined'

        />
        <TextInput
          placeholder='Contraseña'
          mode='outlined'
        />
        <Button mode='contained'>
          Ingresar
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    padding: 10
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  }
})

export default SignIn