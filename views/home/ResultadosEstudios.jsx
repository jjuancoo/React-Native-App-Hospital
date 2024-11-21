import React, {useState, useEffect} from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import useAxios from '../../api/estudios.api'

const ResultadosEstudios = () => {

    const [resultStudies, setResultStudies] = useState([])
    const axiosInstance = useAxios()

    useEffect(() =>{
        const getStudies = async () => {
            try {
                const response = await axiosInstance.get('/estudios')
                setResultStudies(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        getStudies()
        // Cleanup function
        return () => {
            // Cancel the API request
            axiosInstance.cancel('API request canceled')
        }
    }, [])

  return (
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.title}>Resultados de estudios</Text>
          <View>
            {resultStudies.length == 0 ? (
                <>
                    <Text>No hay resultados aún</Text>
                </>
            ) : (
                resultStudies.map((result) => {
                    <>
                        <Text key={result.id}>{result.Resultado}</Text>
                    </>
                })
            )}
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