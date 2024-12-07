<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import AddVentas from './components/AddVentas.vue'

interface Venta {
  _id: string
  FechaVenta: string
  Cliente: {
    nombre1: string
    nombre2: string
    apellidoPaterno: string
    apellidoMaterno: string
    cedulaIdentidad: string
  }
  Auto: { Marca: string; Color: string; Modelo: string; Anio: number }
  Costo: string
  TiempoDeEntrega: string
  Garantia: string
}

const listaVentas = ref<Venta[]>([])
const verFormulario = ref(false)

// Listar todas las ventas desde el backend
const ListarVentas = () => {
  axios
    .get('http://localhost:3005/ventas') // Asegúrate que esta URL sea la correcta
    .then((response) => {
      listaVentas.value = response.data // Asignar las ventas obtenidas a la lista
    })
    .catch((error) => {
      console.error('Error al obtener la lista de Ventas:', error)
    })
}

ListarVentas() // Llamar la función para cargar las ventas cuando el componente se cargue

// Mostrar u ocultar el formulario
const mostrarFormulario = () => {
  verFormulario.value = !verFormulario.value
}
</script>

<template>
  <div>
    <!-- Botón para mostrar/ocultar el formulario de agregar venta -->
    <button class="toggle-form" @click="mostrarFormulario">
      {{ verFormulario ? 'Ocultar formulario' : 'Nuevo Registro' }}
    </button>

    <!-- Mostrar el formulario AddVentas solo cuando verFormulario es verdadero -->
    <AddVentas v-if="verFormulario" @event-nueva-venta="ListarVentas" />

    <div v-if="listaVentas.length > 0" class="block">
      <table border="1">
        <thead>
          <tr>
            <th rowspan="2">Nro</th>

            <!-- Encabezado agrupado para Datos del Cliente -->
            <th colspan="5">Datos del Cliente</th>

            <!-- Encabezado agrupado para Datos del Auto -->
            <th colspan="4">Datos del Auto</th>

            <th rowspan="2">Costo</th>
            <th rowspan="2">Tiempo de Entrega</th>
            <th rowspan="2">Garantía</th>
            <th rowspan="2">Acciones</th>
          </tr>
          <tr>
            <!-- Subencabezados para los Datos del Cliente -->
            <th>Primer Nombre</th>
            <th>Segundo Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Cédula de Identidad</th>

            <!-- Subencabezados para los Datos del Auto -->
            <th>Marca</th>
            <th>Color</th>
            <th>Modelo</th>
            <th>Año</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listaVentas" :key="item._id">
            <td>{{ index + 1 }}</td>

            <!-- Datos del Cliente -->
            <td>{{ item.Cliente.nombre1 }}</td>
            <td>{{ item.Cliente.nombre2 }}</td>
            <td>{{ item.Cliente.apellidoPaterno }}</td>
            <td>{{ item.Cliente.apellidoMaterno }}</td>
            <td>{{ item.Cliente.cedulaIdentidad }}</td>

            <!-- Datos del Auto -->
            <td>{{ item.Auto.Marca }}</td>
            <td>{{ item.Auto.Color }}</td>
            <td>{{ item.Auto.Modelo }}</td>
            <td>{{ item.Auto.Anio }}</td>

            <!-- Otros datos de la venta -->
            <td>{{ item.Costo }}</td>
            <td>{{ item.TiempoDeEntrega }}</td>
            <td>{{ item.Garantia }}</td>

            <td>
              <button class="editar">Editar</button>
              <button class="eliminar">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>cargando datos...</div>
  </div>
</template>
