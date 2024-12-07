<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import AddClientes from './components/AddClientes.vue';
import EditClientes from './components/EditClientes.vue';

interface Cliente {
  _id: string;
  nombre1: string;
  nombre2: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  sexo: string;
  cedulaIdentidad: string;
  direccion: string;
  telefono: string;
  email: string;
}

const listaClientes = ref<Cliente[]>([]);
const verFormulario = ref(false);
const busquedacedulaIdentidad = ref(''); // Campo de búsqueda por cédula
const clienteSeleccionado = ref<Cliente | null>(null);

const ListarClientes = () => {
  axios
    .get('http://localhost:3005/clientes')
    .then((response) => {
      listaClientes.value = response.data;
    })
    .catch((error) => {
      console.error('Error al obtener la lista de clientes:', error);
    });
};
ListarClientes();

const mostrarFormulario = () => {
  verFormulario.value = !verFormulario.value;
};

const eliminarCliente = (id: string) => {
  axios
    .delete(`http://localhost:3005/clientes/${id}`)
    .then(() => {
      ListarClientes();
    })
    .catch((error) => {
      console.error('Error al eliminar cliente:', error);
    });
};

const actualizarCliente = (itemcliente: Cliente) => {
  clienteSeleccionado.value = { ...itemcliente }; // Copia para evitar mutación directa
};

const methodBuscar = () => {
  // Validar si el campo está vacío
  if (!busquedacedulaIdentidad.value.trim()) {
    ListarClientes(); // Llama a la función para listar todos los clientes
    return;
  }

  // Construir la consulta para buscar por cédula
  const query = `?cedulaIdentidad=${encodeURIComponent(busquedacedulaIdentidad.value.trim())}`;

  axios
    .get(`http://127.0.0.1:3005/clientes/buscar${query}`)
    .then((response) => {
      const cliente = response.data;

      // Validar si la respuesta contiene datos
      if (cliente && Object.keys(cliente).length > 0) {
        listaClientes.value = [cliente]; // Convertir el objeto en un arreglo para mostrarlo
      } else {
        alert('No se encontraron resultados para esta cédula.');
        listaClientes.value = []; // Limpiar la tabla
      }
    })
    .catch((err) => {
      console.error('Error al buscar cliente:', err);
      alert('Ocurrió un error al realizar la búsqueda.');
    });
};


</script>

<template>
  <div>
    <button class="toggle-form" @click="mostrarFormulario">
      {{ verFormulario ? 'Ocultar formulario' : 'Nuevo Registro' }}
    </button>

    <AddClientes v-if="verFormulario" @cerrar-formulario="verFormulario = false"
      @event-nuevo-cliente="ListarClientes" />

    <EditClientes v-if="clienteSeleccionado" :seleccionado="clienteSeleccionado"
      @cerrar-formulario="clienteSeleccionado = null" @event-edit-cliente="ListarClientes" />

    <!-- Campos de búsqueda -->
    <div class="buscar-container">
      <input type="text" v-model="busquedacedulaIdentidad" class="input-busqueda"
        placeholder="Cedula de Identidad..." />
      <button @click="methodBuscar" class="buscar">Buscar</button>
    </div>

    <div v-if="listaClientes.length > 0" class="block">
      <table border="1">
        <tr>
          <td>Nro</td>
          <td>Primer Nombre</td>
          <td>Apellido Paterno</td>
          <td>Apellido Materno</td>
          <td>Cédula de Identidad</td>
          <td>Teléfono</td>
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
            <button class="editar" @click="actualizarCliente(item)">Editar</button>
            <button class="eliminar" @click="eliminarCliente(item._id)">Eliminar</button>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>cargando datos...</div>
  </div>
</template>
