import React, {useState, useEffect} from 'react'
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { Text, Card, FAB, ActivityIndicator } from 'react-native-paper'
import useAxios from '../../api/estudios.api'

const ResultadosEstudios = () => {

    const [resultStudies, setResultStudies] = useState([])
    const axiosInstance = useAxios()

    useEffect(() =>{
        const getStudies = async () => {
            try {
                const response = await axiosInstance.get('/resultados_estudios')
                setResultStudies(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        getStudies();
    }, [])

  return (
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.title}>Resultados de estudios</Text>
          <View>
            {resultStudies.length == 0 ? (
                <View>
                    <Image
                        source={require('../../src/img/no_data.png')}
                        style={styles.image}
                    />
                    <ActivityIndicator
                      animating={true}
                      style={{marginBottom: 12}}
                    />
                    <Text style={styles.favorite}>Se estan cargando los resultados...</Text>
                </View>
            ) : (
                resultStudies.map((result) => (
                    <View key={result.id}>
                        <Text>{result.Resultados}</Text>
                    </View>
                ))
            )}
          </View>
        </ScrollView>
        <FAB
          icon="plus"
          style={styles.fab}
          label='Nuevo Resultado'
          onPress={() => console.log('Pressed')}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    padding: 8,
  },
  titleCard: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    padding: 4,
  },
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
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ResultadosEstudios