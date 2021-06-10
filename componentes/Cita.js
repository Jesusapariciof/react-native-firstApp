
import React, { useState } from 'react';

import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight

} from 'react-native';

const Cita = ({ cita, eliminarPacientes }) => {

  const dialogoEliminar = (id) =>{
    console.log('eliminar', id)
    eliminarPacientes(id)
  }




  return ((
    <View style ={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.texto}>{cita.paciente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Propietario:</Text>
        <Text style={styles.texto}>{cita.propietario}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sítomas:</Text>
        <Text style={styles.texto}>{cita.sintomas}</Text>
      </View>
      <View>

          <TouchableHighlight onPress={ () => dialogoEliminar(cita.id)} style={styles.botonEliminar}>
              <Text style={styles.textoEliminar}>Eliminar &times;</Text>

          </TouchableHighlight>
      </View>
        
    </View>
  ));
}

const styles = StyleSheet.create({
    cita:{
      backgroundColor:'white',
      borderBottomColor: '#e1e1e1',
      borderStyle: 'solid',
      borderBottomWidth:1,
      paddingVertical: 20,
      paddingRight: 10,
      paddingHorizontal:10
    },
    label:{
      fontWeight:'bold',
      fontSize:18,
      marginTop:20
    },
    texto:{
      fontSize:18,
    },
    botonEliminar:{
      padding:10,
      backgroundColor:'red',
      marginVertical:10
    },
    textoEliminar:{
      color:'white',
      fontWeight:'bold',
      textAlign:'center'

    }
})

export default Cita;