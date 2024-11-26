import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text, ActivityIndicator} from 'react-native-paper'

const LoadingStudios = () => {
  return (
    <View>
      <Image
        source={require('../../../src/img/no_data.png')}
        style={styles.image}
      />
      <ActivityIndicator animating={true} style={{marginBottom: 12}} />
      <Text style={styles.favorite}>Se estan cargando los resultados...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    image: {
      width: 250,
      height: 250,
      marginBottom: 20,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    favorite: {
      textAlign: 'center',
      fontSize: 20,
    }
  });
  

export default LoadingStudios