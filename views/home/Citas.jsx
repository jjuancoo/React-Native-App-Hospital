import React, {useState, useEffect} from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text, Card, FAB } from 'react-native-paper'
import useAxios from '../../api/estudios.api'
<<<<<<< HEAD
=======
import LoadingStudios from './Screens/LoadingStudios'
import { formatearFecha } from '../../components'
>>>>>>> develop/Juan

const Citas = () => {

  //Creando el esta
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
    <View>
      <ScrollView style={styles.scroll}>
        <View>
          <Text style={styles.title}>Estudios</Text>
          <View>
<<<<<<< HEAD
            {studios.map(studio => (
              <View style={{marginVertical: 6, padding: 2}} key={studio.id}>
                <Card>
                  <Card.Content>
                    <Text style={styles.titleCard}>{studio.Tipo}</Text>
                    <Text>Estado: {studio.Estatus}</Text>
                    <Text>Costo: {studio.Total_Costo}</Text>
                    <Text>Dirigido a: {studio.Dirigido_A}</Text>
                    <Text>Observaciones: {studio.Observaciones}</Text>
                    <Text>Creada: {studio.Fecha_Registro}</Text>
                  </Card.Content>
                </Card>
              </View>
            ))}
=======
            {studios.length === 0 ? (
              <LoadingStudios />
            ) : (
              studios.map(studio => (
                <View style={{marginVertical: 6, padding: 2}} key={studio.id}>
                  <TouchableHighlight
                    onPress={() =>
                      navigation.navigate('Modals', {id: studio.id})
                    }
                    underlayColor="transparent">
                    <Card>
                      <Card.Content>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text style={styles.titleCard}>{studio.Tipo}</Text>
                          <IconButton
                            icon={({size, color}) => (
                              <Image
                                source={require('../../src/icons/lapiz.png')}
                                style={{
                                  width: size,
                                  height: size,
                                  tintColor: color,
                                }}
                              />
                            )}
                            onPress={() =>
                              navigation.navigate('EditEstudio', {
                                id: studio.id,
                              })
                            }
                          />
                        </View>
                        <Text>Estado: {studio.Estatus}</Text>
                        <Text>Costo: {studio.Total_Costo}</Text>
                        <Text>Dirigido a: {studio.Dirigido_A}</Text>
                        <Text>Observaciones: {studio.Observaciones}</Text>
                        <Text>Creada: {formatearFecha(studio.Fecha_Registro)}</Text>
                        <Text>ID: {studio.id}</Text>
                      </Card.Content>
                    </Card>
                  </TouchableHighlight>
                </View>
              ))
            )}
>>>>>>> develop/Juan
          </View>
        </View>
      </ScrollView>
      <FAB
        icon={'plus'}
        style={styles.fab}
        label='Nuevo Estudio'
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
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

export default Citas