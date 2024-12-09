import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableHighlight, Image} from 'react-native'
import { Text, Button, Dialog, Portal, Divider, Snackbar } from 'react-native-paper'
import { useAuth } from '../../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

const Configuracion = () => {

    const items = [
      {title: 'Notificaciones', subtitle: 'Todo lo que pasa en radiologia', icon: 'campana'},
      {title: 'Ayuda', subtitle: 'Respuesta a preguntas más comunes', icon: 'ayuda'},
      {title: 'Perfil', subtitle: 'Tu correo, nombre, y mucho más', icon: 'usuario'},
      {title: 'Seguridad', subtitle: 'Cambia tu contraseña y autenticación', icon: 'escudo'},
    ]

    const icons = {
      campana: require('../../src/icons/campana.png'),
      ayuda: require('../../src/icons/ayuda.png'),
      usuario: require('../../src/icons/usuario.png'),
      escudo: require('../../src/icons/escudo.png'),
    };

    const navigation = useNavigation()

     //Mostrar el dialog
    const [alert, setAlert] = useState(false)
    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const {signOut} = useAuth();

    //Cerrar sesion
    const cerrarSesion = () => {
        setAlert(true);
    }

  return (
    <>
      <View>
        <ScrollView style={styles.scroll}>
          <Text style={styles.title}>Configuración</Text>

          <View style={{marginBottom: 12, padding: 12}}>
            <Text style={styles.subtitle}>Pefil</Text>
            {items.map((item, index) => (
              <>
                <TouchableHighlight 
                  key={index}
                  underlayColor="transparent"
                  style={{paddingVertical: 14}}
                  onPress={onToggleSnackBar}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={icons[item.icon]}
                      style={{
                        width: 22,
                        height: 22,
                        marginRight: 14,
                      }}
                    />
                    <View>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
                <Divider/>
              </>
            ))}
          </View>

          <View>
            <Text style={styles.subtitle}>Cuenta</Text>
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

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Cerrar'
        }}
      >
        Disponible proximamente
      </Snackbar>
    </>
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
    subtitle: {
      fontSize: 20,
      fontWeight: '800',
      marginBottom: 12
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    itemSubtitle: {
      fontSize: 14,
      color: '#666'
    },
    buttonExit: {
        marginHorizontal: 10
    }
})

export default Configuracion