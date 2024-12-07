<script setup lang="ts">
import { reactive, defineEmits, defineProps } from 'vue';
import axios from 'axios';

// Definir eventos que el componente emitirá
const emit = defineEmits(['event-edit-cliente', 'cerrar-formulario']);

// Definir las propiedades que el componente recibe
const prop = defineProps({
  seleccionado: {
    type: Object,
    required: false,
    default: null,
  },
});

// Inicializar datos reactivos para la edición
const datosAEditar = reactive({
  nombre1: prop.seleccionado?.nombre1 || '',
  nombre2: prop.seleccionado?.nombre2 || '',
  apellidoPaterno: prop.seleccionado?.apellidoPaterno || '',
  apellidoMaterno: prop.seleccionado?.apellidoMaterno || '',
  fechaNacimiento: prop.seleccionado?.fechaNacimiento
    ? new Date(prop.seleccionado.fechaNacimiento).toISOString().slice(0, 10)
    : '',
  sexo: prop.seleccionado?.sexo || '',
  cedulaIdentidad: prop.seleccionado?.cedulaIdentidad || '',
  direccion: prop.seleccionado?.direccion || '',
  telefono: prop.seleccionado?.telefono || '',
  email: prop.seleccionado?.email || '',
});

// Función para enviar datos editados al servidor
const enviarDatos = () => {
  if (!prop.seleccionado?._id) {
    console.error('No se ha seleccionado un cliente para editar.');
    return;
  }

  setTimeout(() => {
    axios
      .patch(`http://127.0.0.1:3005/clientes/${prop.seleccionado._id}`, datosAEditar)
      .then(() => {
        emit('event-edit-cliente'); // Notifica al componente padre que se realizó la edición
        emit('cerrar-formulario'); // Cierra el formulario de edición
      })
      .catch((err) => {
        console.error('Ocurrió un error al actualizar el cliente:', err);
      });
  }, 500);
};
</script>

<template>
  <h1>Formulario de Edición</h1>
  <div>
    <label for="nombre1">Primer Nombre:</label>
    <input id="nombre1" type="text" v-model="datosAEditar.nombre1" />
  </div>

  <div>
    <label for="nombre2">Segundo Nombre:</label>
    <input id="nombre2" type="text" v-model="datosAEditar.nombre2" />
  </div>

  <div>
    <label for="apellidopaterno">Apellido Paterno:</label>
    <input id="apellidopaterno" type="text" v-model="datosAEditar.apellidoPaterno" />
  </div>

  <div>
    <label for="apellidomaterno">Apellido Materno:</label>
    <input id="apellidomaterno" type="text" v-model="datosAEditar.apellidoMaterno" />
  </div>

  <div>
    <label for="fechanacimiento">Fecha de Nacimiento:</label>
    <input id="fechanacimiento" type="date" v-model="datosAEditar.fechaNacimiento" />
  </div>

  <div>
    <label for="sexo">Sexo:</label>
    <select id="sexo" v-model="datosAEditar.sexo">
      <option value="M">Masculino</option>
      <option value="F">Femenino</option>
    </select>
  </div>

  <div>
    <label for="cedulaidentidad">Cédula de Identidad:</label>
    <input id="cedulaidentidad" type="text" v-model="datosAEditar.cedulaIdentidad" />
  </div>

  <div>
    <label for="direccion">Dirección:</label>
    <input id="direccion" type="text" v-model="datosAEditar.direccion" />
  </div>

  <div>
    <label for="telefono">Teléfono:</label>
    <input id="telefono" type="text" v-model="datosAEditar.telefono" />
  </div>

  <div>
    <label for="email">Correo Electrónico:</label>
    <input id="email" type="email" v-model="datosAEditar.email" />
  </div>

  <button class="btn-registrar" @click="enviarDatos">Actualizar</button>
  <hr class="linea-divisor" />
</template>

<style>
/* Estilos del formulario */
div {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="date"],
input[type="email"],
select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-registrar {
  width: 100%;
  padding: 10px;
  background-color: #065813;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-registrar:hover {
  background-color: #044c0d;
}

.linea-divisor {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-top: 3px solid #065813;
}
</style>
