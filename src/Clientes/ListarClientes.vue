<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import AddAutos from './components/AddAutos.vue';
import AutosEditar from './components/EditAutos.vue';

interface Cliente {
  _id: string;
  nombre1: string;
  nombre2: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: Date;
  sexo: string;
  cedulaIdentidad: string;
  direccion: string;
  telefono: string;
  email: string;
}

const listaClientes = ref<Cliente[]>([]);
// const busquedaMarca = ref('');
const verFormulario = ref(false);
const clienteSeleccionado = ref<Cliente | null>(null);

// Listar autos desde el servidor
const ListarClientes = () => {
  setTimeout(() => {
    axios.get('http://localhost:3005/clientes').then((response) => {
      listaClientes.value = response.data;
    });
  }, 100);
};
ListarClientes();

// Mostrar u ocultar el formulario
const mostrarFormulario = () => {
  verFormulario.value = !verFormulario.value;
};

// Eliminar auto por ID
// const eliminarAto = (id: string) => {
//   axios
//     .delete(`http://127.0.0.1:3005/autos/${id}`)
//     .then(() => {
//       ListarAutos();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// Ver detalles de un auto por ID
// const verdetalle = (id: string) => {
//   axios
//     .get(`http://127.0.0.1:3005/autos/${id}`)
//     .then((response) => {
//       autoDetalle.value = response.data;
//       verDetalleDiv.value = true;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // Actualizar auto seleccionado
// const actualizarAto = (itemAto: Auto) => {
//   autoSeleccionado.value = itemAto;
// };

// Método de búsqueda
// const methodBuscar = () => {
//   let query = '';
//   if (busquedaMarca.value && busquedaMarca.value.length >= 1) {
//     query += `?Marca=${busquedaMarca.value}`;
//   }
//   // if (busquedaModelo.value && busquedaModelo.value.length >= 1) {
//   //   query += `?Modelo=${busquedaModelo.value}`;
//   // }
//   // if (busquedaTipo.value && busquedaTipo.value.length >= 1) {
//   //   query += `?Tipo=${busquedaTipo.value}`;
//   // }
//   axios
//     .get(`http://127.0.0.1:3005/autos/buscar${query}`)
//     .then((response) => {
//       listaAutos.value = response.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
</script>

<template>
  <!-- <h1>Listado de Autos</h1> -->
  <div class="lado-derecho">
    <button class="toggle-form" @click="mostrarFormulario">
      {{ verFormulario ? 'Ocultar formulario' : 'Nuevo Registro' }}
    </button>
  </div>

  <AddAutos v-if="verFormulario" @cerrar-formulario="() => (verFormulario = false)"
    @event-nuevo-auto="ListarClientes" />

  <div v-if="clienteSeleccionado">
    <AutosEditar :seleccionado="clienteSeleccionado" @cerrar-formulario="clienteSeleccionado = null"
      @event-edit-auto="ListarClientes" />
  </div>

  <!-- Campos de búsqueda en una sola línea
  <div class="buscar-container">
    <input type="text" v-model="busquedaMarca" class="input-busqueda" placeholder="Marca...">
    <input type="text" v-model="busquedaModelo" class="input-busqueda" placeholder="Modelo...">
    <input type="text" v-model="busquedaTipo" class="input-busqueda" placeholder="Tipo...">
    <button @click="methodBuscar" class="buscar">Buscar</button>
  </div>-->

  <div v-if="listaClientes.length > 0" class="block">
    <table border="1">
      <tr>
        <td>Nro</td>
        <td>Primer Nombre</td>
        <td>Segundo Nombre</td>
        <td>Apellido Materno</td>
        <td>Cedula de Identidad</td>
        <td>Telefono</td>
        <td>Acciones</td>
      </tr>
      <tr v-for="(item, index) in listaClientes" :key="item._id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.nombre1 }}</td>
        <td>{{ item.apellidoPaterno }}</td>
        <td>{{ item.apellidoMaterno }}</td>
        <td>{{ item.cedulaIdentidad }}</td>
        <td>{{ item.telefono }}</td>
        <td>
          <button class="editar">Editar</button>
          <button class="eliminar">Eliminar</button>
        </td>
      </tr>
    </table>
  </div>
  <div v-else>cargando datos...</div>
</template>

<style>
/* General Styles */
body {
  overflow-y: auto;
  /* Permite solo un scroll principal */
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

td:first-child {
  background-color: #065813;
  color: white;
  text-align: center;
}

td:last-child {
  width: 1px;
  white-space: nowrap;
  text-align: center;
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
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 10px;
}

button.toggle-form:hover {
  background-color: #065813;
  opacity: 0.9;
}

/* Estilo para los campos de búsqueda en una sola línea */
.buscar-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-busqueda {
  display: inline-block;
  margin-right: 10px;
  padding: 8px;
  width: 150px;
}

button.buscar {
  display: inline-block;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  font-weight: bold;
  background-color: #065813;
  color: white;
}

button.buscar:hover {
  opacity: 0.9;
}

.block {
  overflow: hidden;
  /* Evita scroll adicional */
}
</style>
