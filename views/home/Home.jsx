import React, { useState, useEffect }from 'react'
import { View, ScrollView, StyleSheet, TouchableHighlight, Image, Dimensions } from 'react-native'
import { Text, Modal, Portal, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import useAxios from '../../api/estudios.api'
import { useNavigation } from '@react-navigation/native'
import { PieChart } from 'react-native-chart-kit';

const Home = () => {

  const [user, setUser] = useState('')
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [studyDetails, setStudyDetails] = useState(null);
  const [urgencyStats, setUrgencyStats] = useState([]);
  const instanceAPI = useAxios();

  const navigation = useNavigation()

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

  useEffect(() => {
    const fetchUrgencyStats = async () => {
      try {
        const response = await instanceAPI.get('/estudios');
        const estudios = response.data;

        // Agrupar por nivel de urgencia
        const stats = estudios.reduce((acc, estudio) => {
          const level = estudio.Nivel_Urgencia || 'Desconocido';
          acc[level] = (acc[level] || 0) + 1;
          return acc;
        }, {});

        // Convertir en un array para el gráfico
        const chartData = Object.keys(stats).map((key) => ({
          name: key,
          population: stats[key],
          color: getRandomColor(),
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        }));

        setUrgencyStats(chartData);
      } catch (error) {
        console.error('Error fetching urgency stats:', error);
      }
    };

    fetchUrgencyStats();
  }, []);

   // Función para generar colores aleatorios
   const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
            <Text style={styles.subtitle}>Estudios realizados</Text>
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

          <View>
            <Text style={styles.subtitle}>Categorias</Text>
            <View style={styles.containerCategories}>
                <TouchableHighlight
                  onPress={() => navigation.navigate('Estudios')}
                  underlayColor="transparent"
                >
                  <View style={styles.categories}>
                    <Image
                      source={require('../../src/icons/adn.png')}
                      style={{ width: 22, height: 22 }}
                    />
                    <Text>Estudios  </Text>
                  </View>
                </TouchableHighlight>
              <TouchableHighlight
                onPress={() => navigation.navigate('Resultados')}
                underlayColor="transparent"
              >
                <View style={styles.categories}>
                  <Image
                    source={require('../../src/icons/microscopio.png')}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text>Resultados</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => navigation.navigate('Estudios')}
                underlayColor="transparent"
              >
                <View style={styles.categories}>
                  <Image
                    source={require('../../src/icons/doctor.png')}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text>Médicos   </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.chartContainer}>
          <Text style={styles.subtitle}>Estadísticas por Nivel de Urgencia</Text>
          {urgencyStats.length > 0 ? (
            <PieChart
              data={urgencyStats}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#f5f5f5',
                backgroundGradientTo: '#f5f5f5',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          ) : (
            <Text style={styles.noDataText}>No hay datos disponibles.</Text>
          )}
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
  subtitle: {
    marginVertical: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 20,
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
  containerCategories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  categories: {
    backgroundColor: '#d1d5db',
    padding: 30,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  chartContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
})


export default Home