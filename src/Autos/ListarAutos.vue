<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import AddAutos from './components/AddAutos.vue';
import AutosEditar from './components/EditAutos.vue';

// Interface para el objeto Auto
interface Auto {
  _id: string;
  Marca: string;
  Modelo: string;
  Anio: string;
  Color: string;
  Tipo: string;
  Chasis: string;
  Vin: string;
  OtrasCaracateristicas: string;
  FechaIngreso: Date;
}

// Variables y referencias reactivas
const listaAutos = ref<Auto[]>([]); // Lista de autos
const busquedaMarca = ref(''); // Campo de búsqueda por marca
const verFormulario = ref(false); // Control para mostrar/ocultar el formulario de registro
const autoSeleccionado = ref<Auto | null>(null); // Datos del auto seleccionado para editar

// Función para listar autos desde el servidor
const ListarAutos = () => {
  setTimeout(() => {
    axios.get('http://127.0.0.1:3005/autos').then((response) => {
      listaAutos.value = response.data;
    });
  }, 100);
};
ListarAutos(); // Llama a la función al cargar el componente

// Función para mostrar u ocultar el formulario de registro
const mostrarFormulario = () => {
  verFormulario.value = !verFormulario.value;
};

// Función para eliminar un auto por ID
const eliminarAto = (id: string) => {
  axios
    .delete(`http://127.0.0.1:3005/autos/${id}`)
    .then(() => {
      ListarAutos(); // Actualiza la lista después de eliminar
    })
    .catch((err) => {
      console.error(err);
    });
};

// Función para ver detalles de un auto por ID

// Función para actualizar un auto seleccionado
const actualizarAto = (itemAto: Auto) => {
  autoSeleccionado.value = itemAto;
};

// Método de búsqueda por marca
const methodBuscar = () => {
  let query = '';
  if (busquedaMarca.value && busquedaMarca.value.length >= 1) {
    query += `?Marca=${busquedaMarca.value}`;
  }
  axios
    .get(`http://127.0.0.1:3005/autos/buscar${query}`)
    .then((response) => {
      listaAutos.value = response.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<template>
  <!-- Botón para mostrar/ocultar formulario -->
  <div class="lado-derecho">
    <button class="toggle-form" @click="mostrarFormulario">
      {{ verFormulario ? 'Ocultar formulario' : 'Nuevo Registro' }}
    </button>
  </div>

  <!-- Componente de formulario para agregar autos -->
  <AddAutos v-if="verFormulario" @cerrar-formulario="() => (verFormulario = false)" @event-nuevo-auto="ListarAutos" />

  <!-- Componente de formulario para editar autos -->
  <div v-if="autoSeleccionado">
    <AutosEditar :seleccionado="autoSeleccionado" @cerrar-formulario="autoSeleccionado = null"
      @event-edit-auto="ListarAutos" />
  </div>

  <!-- Campos de búsqueda -->
  <div class="buscar-container">
    <input type="text" v-model="busquedaMarca" class="input-busqueda" placeholder="Marca...">
    <button @click="methodBuscar" class="buscar">Buscar</button>
  </div>

  <!-- Tabla para mostrar la lista de autos -->
  <div v-if="listaAutos.length > 0" class="block">
    <table border="1">
      <thead>
        <tr>
          <th>Nro</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Año</th>
          <th>Color</th>
          <th>Tipo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listaAutos" :key="item._id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.Marca }}</td>
          <td>{{ item.Modelo }}</td>
          <td>{{ item.Anio }}</td>
          <td>{{ item.Color }}</td>
          <td>{{ item.Tipo }}</td>
          <td>
            <button class="editar" @click="actualizarAto(item)">Editar</button>
            <button class="eliminar" @click="eliminarAto(item._id)">Eliminar</button>
            <button>Reporte</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>cargando datos...</div>

  <!-- Detalles de un auto -->
</template>

<style>
/* Estilos generales para botones y tabla */
body {
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table,
td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:first-child {
  background-color: #065813;
  color: white;
  text-align: center;
  font-weight: bold;
}

button {
  padding: 8px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  font-weight: bold;
}

button.editar {
  background-color: #ffa500;
}

button.eliminar {
  background-color: #ff6347;
}

.toggle-form {
  background-color: #065813;
  color: white;
}
</style>
