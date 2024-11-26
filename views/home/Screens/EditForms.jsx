import React from 'react'
import { View } from 'react-native'
import { Text,Button } from 'react-native-paper'

const EditForms = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>Este es un modal!</Text>
      <Button title="Cerrar Modal" onPress={() => navigation.goBack()} >Cerrar modal</Button>
    </View>
  );
}



export default EditForms