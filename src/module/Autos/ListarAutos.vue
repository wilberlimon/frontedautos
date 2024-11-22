<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import AddAutos from './components/AddAutos.vue';
import AutosEditar from './components/EditAutos.vue';

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
const listaAutos = ref<Auto[]>([])


const ListarAutos = () => {
  // tiene tiempo de retardo
  setTimeout(() => {
    axios.get('http://127.0.0.1:3005/autos').then((response) => {
      listaAutos.value = response.data
    })
  }, 100)
}
ListarAutos()

const verFormulario = ref(false)

const mostrarFormulario = () => {
  verFormulario.value = !verFormulario.value
}

const eliminarAto = (id: string) => {
  axios.delete(`http://127.0.0.1:3005/autos/${id}`).then(() => {
    ListarAutos()
  }).catch((err) => {
    console.log(err)
  })
}

const verDetalleDiv = ref(false);
const autoDetalle = ref(null);
const verdetalle = (id: string) => {
  axios.get(`http://127.0.0.1:3005/autos/${id}`).then((response) => {
    autoDetalle.value = response.data
    verDetalleDiv.value = true
  }).catch((err) => {
    console.log(err)
  })
}

const autoSeleccionado = ref(null);


const actualizarAto = (itemAto) => {
  autoSeleccionado.value = itemAto;
}
</script>

<template>
  <h1>Listado de Autos</h1>
  <div class="lado-derecho">
    <button class="toggle-form" @click="mostrarFormulario">
      {{ verFormulario ? 'Ocultar formulario' : 'Mostrar formulario' }}
    </button>
  </div>

  <AddAutos v-if="verFormulario" @cerrar-formulario="() => (verFormulario = false)" @event-nuevo-auto="ListarAutos" />

  <AutosEditar v-if="autoSeleccionado" !=null :seleccionado="autoSeleccionado" />
  <!-- Ahora debería mostrarse correctamente -->

  <!-- <hr class="linea-divisor" /> -->
  <div v-if="listaAutos.length > 0" class="block">
    <table border="1">
      <tr>
        <td>Nro</td>
        <td>Marca</td>
        <td>Modelo</td>
        <td>Año</td>
        <td>Color</td>
        <td>Tipo</td>
        <td>Acciones</td>
      </tr>
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
          <button class="detalle" @click="verdetalle(item._id)">Detalle</button>
          <button>Reporte</button>
        </td>

      </tr>
    </table>
  </div>
  <div v-else>cargando datos.....</div>
  <!-- <hr /> -->
  <div v-if="autoDetalle != null" class="block">
    <p>ID: {{ autoDetalle._id }}</p>
    <p>Marca: {{ autoDetalle.Marca }}</p>
    <p>Modelo: {{ autoDetalle.Modelo }}</p>
    <p>Año: {{ autoDetalle.Anio }}</p>
    <p>Color: {{ autoDetalle.Color }}</p>
    <p>Tipo: {{ autoDetalle.Tipo }}</p>
    <p>Chasis: {{ autoDetalle.Chasis }}</p>
    <p>Vin: {{ autoDetalle.Vin }}</p>
    <p>Otras Caracteristicas: {{ autoDetalle.OtrasCaracteristicas }}</p>
    <p>Fecha Ingreso: {{ autoDetalle.FechaIngreso }}</p>

  </div>
</template>

<style>
/* Estilos generales de la tabla */
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

/* Estilo para el encabezado de la tabla */
table tr:first-child {
  background-color: #065813;
  /* Fondo verde */
  color: white;
  /* Texto blanco */
  text-align: center;
  /* Texto centrado */
  font-weight: bold;
}

/* Columna de número con el mismo estilo de encabezado */
td:first-child {
  background-color: #065813;
  color: white;
  text-align: center;
}

/* Ajuste de ancho para la columna de acciones */
td:last-child {
  width: 1px;
  /* Ajusta el ancho de la columna para que se ajuste al contenido */
  white-space: nowrap;
  /* Impide que la columna se expanda */
  text-align: center;
}

/* Espaciado y estilo para los botones */
button {
  padding: 8px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  opacity: 0.9;
}

button.editar {
  background-color: #ffa500;
}

button.eliminar {
  background-color: #ff6347;
}

button.detalle {
  background-color: #1e90ff;
}

button.toggle-form {
  background-color: #065813;
  /* Fondo verde */
  color: white;
  /* Texto blanco */
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 10px;
  /* Espacio debajo del botón */
}

button.toggle-form:hover {
  background-color: #065813;
  /* Fondo verde más oscuro al pasar el ratón */
  opacity: 0.9;
}
</style>
