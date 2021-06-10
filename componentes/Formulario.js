import React, { useState } from 'react';

import {
    Text,
    StyleSheet,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Alert,
    ScrollView,
    
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shorid from 'shortid'


const Formulario = ({citas, setCitas, setMostrarForm}) => {

    const [paciente, setPaciente]=useState('');
    const [propietario, setPropietario]=useState('');
    const [telefono, setTelefono]=useState('');
    const [sintomas, setSintomas]=useState('');
    const [fecha, setFecha]= useState('');
    const [hora, setHora]=useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmarFecha = (date) => {
        //Formatear fecha
        const opciones = {year: 'numeric', month: 'long', day: "2-digit"};
        setFecha(date.toLocaleDateString('es-ES', opciones))
        hideDatePicker();
    };

    //Muestra la hora
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmarHora = (hora) => {
        //Formatear hora
        const opciones = {hour: 'numeric', minute: "2-digit", hour12: false };
        setHora(hora.toLocaleString('es-ES', opciones))
        hideTimePicker();
    };

    const crearNuevaCita = () =>{
        //Validar

        if(paciente.trim()=== ''|| propietario.trim()=== ''|| telefono.trim() === ''|| fecha === '' || hora === '' || sintomas.trim() === ''){
            //Falla la validación
            mostrarAlerta()
            return;

        }
        //Crear nueva Cita
        const cita = {paciente, propietario, telefono, fecha, hora, sintomas}
            cita.id = shorid.generate();
        //Agregar al State
        const citasNuevas = [...citas, cita];
        setCitas(citasNuevas)

        //Ocultar formulario
        setMostrarForm(false)
        //Resetear formulario
    }

    //Muestra la alerta si falla la validacion
    const mostrarAlerta = () =>{

        Alert.alert(
            'Error', //Esto es el título
            'Todos los campos son obligatorios', //Cuerpo de la alerta
            [{
                text: 'OK' // array de botones
            }]
        )
    }



    return (

        <>
            <ScrollView style={styles.formulario}>


                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => setPaciente(texto)}

                    />
                </View>
                <View>
                    <Text style={styles.label}>Propietario:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => setPropietario(texto)}

                    />
                </View>
                <View>
                    <Text style={styles.label}>Teléfono Contacto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => setTelefono(texto)}
                        keyboardType='numeric'

                    />
                </View>
                <View>
                <Text style={styles.label}>Fecha</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                         headerTextIOS="Elige una Fecha"
                        cancelTextIOS= "Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmarHora}
                        onCancel={hideTimePicker}
                         headerTextIOS='Elige una Hora'
                        cancelTextIOS= "Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{hora}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Síntomas</Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={texto => setSintomas(texto)}


                    />
                </View>
                <View>

          <TouchableHighlight onPress={ () => crearNuevaCita()} style={styles.botonSubmit}>
              <Text style={styles.textoSubmit}>Nueva Cita</Text>

          </TouchableHighlight>
      </View>
        
            </ScrollView>
        </>

    );
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    botonSubmit:{
        padding:10,
        backgroundColor:'#7d024e',
        marginVertical:10
      },
      textoSubmit:{
        color:'white',
        fontWeight:'bold',
        textAlign:'center'
  
      }
})

export default Formulario;