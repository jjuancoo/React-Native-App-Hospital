import React, {useState, useEffect} from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Citas = () => {

  const [studios, setStudios] = useState([])
  const [consultarAPI, setConsultarAPI] = useState(true)

  useEffect(() =>{
    const getStudios = async () => {
      try {
        const url = 'https://privilegecare-deploy-gqmt.onrender.com/estudios';
        const result = await axios.get(url);
        const token = AsyncStorage.getItem('token', 'jjj')
        console.log(token)
        setConsultarAPI(false);
        setStudios(result.data);
        console.log('Se consulta a la api')
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    if(consultarAPI){
      getStudios()
    }
  }, [setConsultarAPI]);

  return (
    <ScrollView>
        <View>
          <Text style={styles.title}>Estudios</Text>
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