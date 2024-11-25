import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const Home = () => {
  return (
    <View>
        <ScrollView>
          <Text style={styles.title}>Bienvenido a Privilege Care</Text>
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


export default Home