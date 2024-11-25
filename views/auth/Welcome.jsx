import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../src/img/medicine_ss.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Bienvenido a Privilege Care</Text>
      <View style={{marginVertical: 20}}>
        <Button mode="contained" onPress={() => navigation.navigate('Login')} style={styles.button}>
            Iniciar Sesión
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('Register')} style={styles.button}>
            Registrate
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 25
    },
    text: {
        marginTop: 20,
        marginBottom: 40,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    button: {
        width: 280,
        marginBottom: 18
    }
})

export default Welcome;
