import React, { useState, useEffect }from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text, Modal, Portal, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import useAxios from '../../api/estudios.api'

const Home = () => {

  const [user, setUser] = useState('')
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [studyDetails, setStudyDetails] = useState(null);
  const instanceAPI = useAxios();

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

  //Obtener las fechas de los estudios
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await instanceAPI.get('/estudios');
        const estudios = response.data;

        // Formatear las fechas para el calendario
        const dates = {};
        const studyDetailsMap = {};
        estudios.forEach((studio) => {
          const date = studio.Fecha_Registro.split('T')[0]; // Extraer solo la fecha
          dates[date] = {
            marked: true,
            dotColor: '#50C878',
            activeOpacity: 0,
            selectedColor: 'blue',
            selected: true
          };
          studyDetailsMap[date] = studio;
          setStudyDetails(studyDetailsMap);
        });

        setMarkedDates(dates);
      } catch (error) {
        console.error('Error fetching estudios:', error);
      }
    };

    fetchDates();
  }, []);

  const handleDayPress = (day) => {
    const date = day.dateString;
    setSelectedDate(date);

    if (studyDetails && studyDetails[date]) {
      setStudyDetails(studyDetails[date]); // Mostrar detalles del estudio
    } else {
      setStudyDetails(null); 
    }

    setModalVisible(true);
  };

  LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    monthNamesShort: [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ],
    dayNames: [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: "Hoy"
  }
  LocaleConfig.defaultLocale = 'es'

  return (
    <>
        <ScrollView>
          <View>
            <Text style={styles.title}>Hola, {user}</Text>
          </View>
          <View>
            <Text>Proximos estudios</Text>
            <View>
              <Calendar
                theme={{
                  backgroundColor: '#ffffff',
                  textMonthFontWeight: 'bold',
                }}
                markedDates={markedDates}
                onDayPress={handleDayPress}
              />
            </View>
          </View>
        </ScrollView>
        <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            {studyDetails ? (
              <>
                <Text style={styles.modalText}>
                  <Text style={{ fontWeight: 'bold' }}>Estudio:</Text> {studyDetails.Tipo}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={{ fontWeight: 'bold' }}>Estado:</Text> {studyDetails.Estatus}
                </Text>
              </>
            ) : (
              <Text style={styles.modalText}>Ningún estudio realizado para esta fecha.</Text>
            )}
            <Button onPress={() => setModalVisible(false)}>Cerrar</Button>
          </View>
        </Modal>
      </Portal>
    </>
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
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
})


export default Home