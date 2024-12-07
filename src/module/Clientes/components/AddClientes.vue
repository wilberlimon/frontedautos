<script setup lang="ts">

import axios from 'axios'
import { reactive } from 'vue';

const emit = defineEmits(['event-nuevo-cliente', 'cerrar-formulario', 'event-nuevo-auto'])
const crearCliente = reactive({
  nombre1: '',
  nombre2: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  FechaNacimiento: '',
  sexo: '',
  cedulaIdentidad: '',
  direccion: '',
  telefono: '',
  email: '',
})

const enviarDatos = () => {
  setTimeout(() => {
    axios
      .post('http://127.0.0.1:3005/clientes/registrar', crearCliente)
      .then((response) => {
        console.log('Datos de respuesta', response.data);
        emit('event-nuevo-cliente', response.data); // Emitir el cliente creado
        emit('cerrar-formulario');
      })
      .catch((err) => {
        console.error('Ocurrió un error', err);
      });
  }, 500);
};


</script>

<template>
  <h1>Formulario de Registro</h1>
  <div>
    <label for="nombre1">Primer Nombre: </label>
    <input id="nombre1" type="text" v-model="crearCliente.nombre1" />
  </div>

  <div>
    <label for="nombre2">Segundo Nombre: </label>
    <input id="nombre2" type="text" v-model="crearCliente.nombre2" />
  </div>

  <div>
    <label for="apellidopaterno">Apellido Paterno: </label>
    <input id="apellidopaterno" type="text" v-model="crearCliente.apellidoPaterno" />
  </div>

  <div>
    <label for="apellidomaterno">Apellido Materno: </label>
    <input id="apellidomaterno" type="text" v-model="crearCliente.apellidoMaterno" />
  </div>

  <div>
    <label for="fechanacimiento">Fecha de Nacimiento:: </label>
    <input id="fechanacimiento" type="Date" v-model="crearCliente.FechaNacimiento" />
  </div>

  <div>
    <label for="sexo">Sexo: </label>
    <select v-model="crearCliente.sexo">
      <option value="M">Masculino</option>
      <option value="F">Femenino</option>
    </select>
  </div>

  <div>
    <label for="cedulaidentidad">Cedula de Identidad: </label>
    <input id="cedulaidentidad" type="text" v-model="crearCliente.cedulaIdentidad" />
  </div>

  <div>
    <label for="direccion">Dirección: </label>
    <input id="direcion" type="text" v-model="crearCliente.direccion" />
  </div>

  <div>
    <label for="telefono">Telefono:</label>
    <input id="telefono" type="text" v-model="crearCliente.telefono" />
  </div>

  <div>
    <label for="email">Correo Electronico:</label>
    <input id="email" type="text" v-model="crearCliente.email" />
  </div>


  <button class="btn-registrar" @click="enviarDatos">Registrar</button>
  <hr class="linea-divisor">
</template>
