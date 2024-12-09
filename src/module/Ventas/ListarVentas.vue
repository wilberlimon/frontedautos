<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import RegistrarVentaForm from './components/RegistrarVentaForm.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const ventasData = ref([]) // Datos de ventas

// Función para listar todas las ventas
const ListarVentas = () => {
  axios
    .get('http://localhost:3005/ventas/listar')
    .then((response) => {
      ventasData.value = response.data
    })
    .catch((error) => {
      console.error('Error al obtener la lista de ventas:', error)
    })
}

// Función para eliminar una venta
const EliminarVenta = (ventaId: string) => {
  axios
    .delete(`http://localhost:3005/ventas/${ventaId}`)
    .then(() => {
      console.log('Venta eliminada correctamente')
      ListarVentas() // Actualizar la tabla después de eliminar
    })
    .catch((error) => {
      console.error('Error al eliminar la venta:', error)
    })
}

// Función para manejar la edición de una venta

onMounted(() => {
  ListarVentas() // Cargar datos al montar el componente
})
</script>

<template>
  <div>Listado de Ventas</div>
  <RegistrarVentaForm @event-nueva-venta="ListarVentas"></RegistrarVentaForm>
  <hr />
  <DataTable :value="ventasData"  paginator :rowsPerPageOptions="[2, 4, 6]" tableStyle="min-width: 50rem">
    <!-- Columna de Nombres -->
    <Column field="Cliente.nombre1" header="Nombres" sortable>
      <template #body="slotProps">
        {{ slotProps.data.Cliente.nombre1 }}
        {{ slotProps.data.Cliente.nombre2 }}
      </template>
    </Column>
    <!-- Columna de Apellidos -->
    <Column field="Cliente.apellidoPaterno" header="Apellidos">
      <template #body="slotProps">
        {{ slotProps.data.Cliente.apellidoPaterno }}
        {{ slotProps.data.Cliente.apellidoMaterno }}
      </template>
    </Column>
    <!-- Resto de las columnas -->
    <Column field="Cliente.cedulaIdentidad" header="Cédula Identidad"></Column>
    <Column field="Autos.Marca" header="Marca"></Column>
    <Column field="Autos.Modelo" header="Modelo"></Column>
    <Column field="Autos.Anio" header="Año"></Column>
    <Column field="Autos.Color" header="Color"></Column>
    <Column field="Costo" header="Costo"></Column>
    <Column field="TiempoDeEntrega" header="Tiempo De Entrega"></Column>
    <Column field="Garantia" header="Garantía"></Column>
    <!-- Columna de Acciones -->
    <Column header="Acciones">
      <template #body="slotProps">
        <!-- Botón de Editar -->
        <button class="btn btn-warning" @click="EditarVenta(slotProps.data)">Editar</button>
        <!-- Botón de Eliminar -->
        <button class="btn btn-danger ml-2" @click="EliminarVenta(slotProps.data._id)">
          Eliminar
        </button>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-warning {
  background-color: #ffc107;
  color: #000;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
