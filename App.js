
import React, { useState } from 'react';

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  Keyboard

} from 'react-native';
import Cita from './componentes/Cita'
import Formulario from './componentes/Formulario'

const App = () => {



  const [mostrarForm, setMostrarForm] = useState(false);

  //Definir el state de citas

  const [citas, setCitas] = useState([
    { id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No come' },
    { id: '2', paciente: 'Reduux', propietario: 'Pedro', sintomas: 'No duerme' },
    { id: '3', paciente: 'Native', propietario: 'Marcos', sintomas: 'No canta' },
  ]);

  //Elimina los pacientes del State

  const eliminarPacientes = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id)
    })
  }

  //Muestra u oculta formulario
  const mostrarFormulario = () => {
    setMostrarForm(!mostrarForm)

  }

  //Cerrar Teclado
  const cerrarTeclado = () =>{
    Keyboard.dismiss();
  }


  return (
    <TouchableWithoutFeedback onPress={()=> cerrarTeclado}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <View>

          <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.botonMostrarForm}>
            <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Nueva cita' : 'Administrar Citas'}</Text>

          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                setMostrarForm={setMostrarForm}
              />
            </>
          ) : (
              <>

                <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas'}</Text>

                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem={({ item }) => <Cita cita={item} eliminarPacientes={eliminarPacientes} />}
                  keyExtractor={cita => cita.id}

                />
              </>
            )}




        </View>

        {/* {citas.map(cita => (
          <View>
            <Text>{cita.paciente}</Text>
            </View>
        ))} */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076b',
    flex: 1
  },

  titulo: {
    color: 'white',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1
  },
  botonMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10
  },
  textoMostrarForm: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'

  }
})


export default App;
