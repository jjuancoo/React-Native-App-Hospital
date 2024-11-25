import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Text, ActivityIndicator } from 'react-native-paper'

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../src/img/medicine_ss.png')}
        style={styles.image}
      />
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Privilege Care</Text>
      {/* Add your loading animation here */}
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
        marginVertical: 25
    },
    text: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
})

export default Splash