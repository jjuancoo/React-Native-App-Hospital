import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, Button, Dialog, Portal } from 'react-native-paper'

const Configuracion = () => {

     //Mostrar el dialog
    const [alert, setAlert] = useState(false)


  return (
    <View>
        <ScrollView style={styles.scroll}>
            <Text style={styles.title}>Configuración</Text>

            <View>
                <Button
                    mode='outlined'
                >
                    Cerrar Sesión
                </Button>
            </View>
        </ScrollView>
    </View>
  )
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