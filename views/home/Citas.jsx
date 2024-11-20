import React, {useState, useEffect} from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import useAxios from '../../api/estudios.api'

const Citas = () => {

  const [studios, setStudios] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const response = await axiosInstance.get('/estudios');
        setStudios(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching estudios:', error);
      }
    };

    fetchStudios();
  }, []);
  
  return (
    <ScrollView>
        <View>
          <Text style={styles.title}>Estudios</Text>
          <View>
            {studios.map((studio) => (
              <Text key={studio.id}>{studio.nombre}</Text>
            ))}
          </View>
        </View>
    </ScrollView>
  )
};

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
      padding: 10
  },
  buttonExit: {
      marginHorizontal: 10
  }
});

export default Citas