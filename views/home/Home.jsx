import React, { useState, useEffect }from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {

  const [user, setUser] = useState('')

  //Obtiene el nombre del usuario
  useEffect(() => {
    const getNameUser = async () => {
      try {
        const result = await AsyncStorage.getItem('nombre')
        setUser(result)
      } catch (error) {
        console.log(error)
      }
    };
    getNameUser()
  }, [])

  return (
    <View>
        <ScrollView>
          <View>
            <Text style={styles.title}>Hola, {user}</Text>
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
      fontSize: 20,
      fontWeight: '500',
      marginBottom: 8,
      padding: 10
  },
  buttonExit: {
      marginHorizontal: 10
  }
})


export default Home