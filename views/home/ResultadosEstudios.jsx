import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const ResultadosEstudios = () => {
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.title}>Resultados de estudios</Text>
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
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 8,
        padding: 8
    },
    titleCard: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
      padding: 4,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });

export default ResultadosEstudios