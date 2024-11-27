import React, {useState, useEffect} from 'react'
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { Text, Card, FAB } from 'react-native-paper'
import useAxios from '../../api/estudios.api'
import LoadingStudios from './Screens/LoadingStudios'

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
              <LoadingStudios/>
            ) : (
                resultStudies.map((result) => (
                    <View key={result.id} style={{marginVertical: 6, padding: 2}}>
                        <Card>
                          <Card.Content>
                            <Text style={styles.titleCard}>{result.Resultados}</Text>
                            <Text>{result.Observaciones}</Text>
                            <Text>{result.Estatus}</Text>
                            <Text>{result.Folio}</Text>
                            <Text>{result.Fecha_Registro}</Text>
                          </Card.Content>
                        </Card>
                    </View>
                ))
            )}
          </View>
        </ScrollView>
        <FAB
          icon={({ size, color }) => (
            <Image
              source={require('../../src/icons/mas.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          )}
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ResultadosEstudios