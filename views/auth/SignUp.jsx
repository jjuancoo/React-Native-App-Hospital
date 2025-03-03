import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text, TextInput, Button, Chip } from 'react-native-paper'

const SignUp = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Registrate</Text>
        <Text style={styles.subtitle}>Crea una nueva cuenta</Text>
        <Chip
          icon={({size, color}) => (
            <Image
              source={require('../../src/icons/ayuda.png')}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          )}
          style={{marginBottom: 30}}
        >Para registrarte consulta al area de Registro</Chip>

        <TextInput
          style={styles.textInput}
          label="Nombre"
          mode="outlined"
        />

        <TextInput
          style={styles.textInput}
          label="Correo electrónico"
          mode="outlined"
        />

        <TextInput
          style={styles.textInput}
          label="Numero de Telefono"
          mode="outlined"
        />

        <TextInput
          style={styles.textInput}
          label="Contraseña"
          mode="outlined"
          secureTextEntry={true}
        />

        <Button
          mode="contained"
          style={styles.button}
          disabled={true}
        >
          Registrar
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
    marginBottom: 80,
  },
  textInput: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20
  }
})

export default SignUp