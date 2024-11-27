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
const autoSeleccionado = ref<Auto | null>(null); // Datos del auto seleccionado para editar
const mostrarFormularioRegistro = ref(false); // Control para mostrar/ocultar el formulario de registro

// Función para listar autos desde el servidor
const ListarAutos = () => {
  setTimeout(() => {
    axios.get('http://127.0.0.1:3005/autos').then((response) => {
      listaAutos.value = response.data;
    });
  }, 100);
};
ListarAutos(); // Llama a la función al cargar el componente

// Función para mostrar el formulario de registro
const mostrarFormulario = () => {
  autoSeleccionado.value = null; // Ocultar formulario de edición si está abierto
  mostrarFormularioRegistro.value = !mostrarFormularioRegistro.value;
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

// Función para actualizar un auto seleccionado
const actualizarAto = (itemAto: Auto) => {
  mostrarFormularioRegistro.value = false; // Ocultar formulario de registro si está abierto
  autoSeleccionado.value = itemAto; // Configura el auto seleccionado para editar
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
      {{ mostrarFormularioRegistro ? 'Ocultar formulario' : 'Nuevo Registro' }}
    </button>
  </div>

  <!-- Componente de formulario para agregar autos -->
  <AddAutos v-if="mostrarFormularioRegistro" @cerrar-formulario="mostrarFormularioRegistro = false"
    @event-nuevo-auto="ListarAutos" />

  <!-- Componente de formulario para editar autos -->
  <AutosEditar v-if="autoSeleccionado" :seleccionado="autoSeleccionado" @cerrar-formulario="autoSeleccionado = null"
    @event-edit-auto="ListarAutos" />

  <!-- Campos de búsqueda -->
  <div class="buscar-container">
    <input type="text" v-model="busquedaMarca" class="input-busqueda" placeholder="Marca..." />
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
        <tr v-for="(item, index) in listaAutos" :key="item._id" :class="{ 'highlight': index === 0 }">
          <td>{{ index + 1 }}</td>
          <td>{{ item.Marca }}</td>
          <td>{{ item.Modelo }}</td>
          <td>{{ item.Anio }}</td>
          <td>{{ item.Color }}</td>
          <td>{{ item.Tipo }}</td>
          <td class="acciones">
            <button class="editar" @click="actualizarAto(item)">Editar</button>
            <button class="eliminar" @click="eliminarAto(item._id)">Eliminar</button>
            <button>Reporte</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>cargando datos...</div>
</template>

<style>
/* Estilos generales para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

/* Fondo verde y texto blanco para encabezados */
table thead th {
  background-color: #065813;
  color: white;
}

/* Fondo blanco para todas las filas */
table tbody tr {
  background-color: white;
}

/* Resaltar el texto del primer registro en negro */
table tbody tr.highlight {
  background-color: #f9f9f9;
  /* Fondo gris claro */
  color: black;
  /* Texto negro */
}

/* Alineación horizontal de los botones */
table tbody td.acciones {
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  /* Espaciado uniforme entre botones */
}

/* Botones */
button {
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

button.editar {
  background-color: #ffa500;
  color: white;
}

button.eliminar {
  background-color: #ff6347;
  color: white;
}

button:hover {
  opacity: 0.8;
}

button.reporte {
  background-color: #ddd;
  color: black;
}
</style>
