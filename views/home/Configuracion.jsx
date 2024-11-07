import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, Button, Dialog, Portal } from 'react-native-paper'
import { useAuth } from '../../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

const Configuracion = () => {

    const navigation = useNavigation()

     //Mostrar el dialog
    const [alert, setAlert] = useState(false)

    const {signOut} = useAuth();

    //Cerrar sesion
    const cerrarSesion = () => {
        setAlert(true);
    }

  return (
    <View>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Configuración</Text>

        <View>
          <Button mode="outlined" onPress={cerrarSesion}>
            Cerrar Sesión
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Dialog visible={alert} onDismiss={() => setAlert(false)}>
          <Dialog.Title>Cerrar Sesión</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">¿Seguro que quieres salir?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setAlert(false);
              }}>
              Cerrar
            </Button>
            <Button
              onPress={() => {
                signOut();
                AsyncStorage.clear();
                console.log('Sesion cerrada');
              }}>
              Salir
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        marginHorizontal: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        padding: 10
    },
    buttonExit: {
        marginHorizontal: 10
    }
})

export default Configuracion