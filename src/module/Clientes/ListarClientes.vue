<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import 'primeicons/primeicons.css'
import AddClientes from './components/AddClientes.vue'
import EditClientes from './components/EditClientes.vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

export interface Cliente {
  _id: string
  nombre1: string
  nombre2: string
  apellidoPaterno: string
  apellidoMaterno: string
  fechaNacimiento: string
  sexo: string
  cedulaIdentidad: string
  direccion: string
  telefono: string
  email: string
}

const listaClientes = ref<Cliente[]>([])
const verFormulario = ref(false)
const busquedacedulaIdentidad = ref('') // Campo de búsqueda por cédula
const dialogEliminar = ref(false)
const clienteAEliminar = ref<string | null>(null)
const toast = useToast()

// Referencias a componentes
const AddClientesRef = ref<InstanceType<typeof AddClientes> | null>(null)
const EditClientesRef = ref<InstanceType<typeof EditClientes> | null>(null)

// Listar clientes desde la API
const ListarClientes = async () => {
  try {
    const response = await axios.get('http://localhost:3005/clientes/Listar')
    listaClientes.value = response.data
  } catch (error) {
    console.error('Error al obtener la lista de clientes:', error)
  }
}
ListarClientes()

// Mostrar formulario para añadir cliente
const mostrarFormulario = () => {
  if (AddClientesRef.value) {
    AddClientesRef.value.abrirDialog()
    // Después de abrir el formulario, actualizamos la lista de clientes
    ListarClientes()
  } else {
    console.error('Referencia AddClientesRef no está definida')
  }
}

// Cerrar formulario
const cerrarFormulario = () => {
  verFormulario.value = false
}

// Confirmar eliminación
const confirmarEliminar = (id: string) => {
  clienteAEliminar.value = id
  dialogEliminar.value = true
}

// Eliminar cliente
const eliminarCliente = async () => {
  if (clienteAEliminar.value) {
    try {
      await axios.delete(`http://localhost:3005/clientes/${clienteAEliminar.value}`)
      toast.add({
        severity: 'error',
        summary: 'Eliminado',
        detail: 'Registro eliminado exitosamente',
        life: 3000,
      })
      // Actualizamos la lista de clientes después de la eliminación
      ListarClientes()
      dialogEliminar.value = false
      clienteAEliminar.value = null
    } catch (error) {
      console.error('Error al eliminar cliente:', error)
    }
  }
}

// Actualizar cliente
const actualizarCliente = (itemcliente: Cliente) => {
  EditClientesRef.value?.abrirDialog(itemcliente)
  // Después de que se actualice, volvemos a listar los clientes
  ListarClientes()
}

// Buscar cliente por cédula
const methodBuscar = async () => {
  if (!busquedacedulaIdentidad.value.trim()) {
    ListarClientes()
    return
  }

  const query = `?cedulaIdentidad=${encodeURIComponent(busquedacedulaIdentidad.value.trim())}`

  try {
    const response = await axios.get(`http://127.0.0.1:3005/clientes/buscar${query}`)
    const cliente = response.data
    if (cliente && Object.keys(cliente).length > 0) {
      listaClientes.value = [cliente]
    } else {
      alert('No se encontraron resultados para esta cédula.')
      listaClientes.value = []
    }
  } catch (err) {
    console.error('Error al buscar cliente:', err)
    alert('Ocurrió un error al realizar la búsqueda.')
  }
}
</script>

<template>
  <div>
    <Toast />
    <!-- Diálogo de confirmación de eliminación -->
    <Dialog
      v-model:visible="dialogEliminar"
      header="Confirmar eliminación"
      modal
      style="width: 30vw"
      :closable="false"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="dialog-buttons">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogEliminar = false"
        />
        <Button label="Eliminar" icon="pi pi-check" severity="danger" @click="eliminarCliente" />
      </div>
    </Dialog>

    <!-- Botón para añadir cliente -->
    <Button
      icon="pi pi-plus"
      aria-label="Añadir"
      @click="mostrarFormulario"
      style="background-color: #2271B3; color: white; border-color: #2271B3; margin-bottom: 15px;"
    />
    <hr />
    <br />

    <!-- Componentes AddClientes y EditClientes -->
    <AddClientes
      ref="AddClientesRef"
      @cerrar-formulario="cerrarFormulario"
      @event-nuevo-auto="ListarClientes"
    />
    <EditClientes
      ref="EditClientesRef"
      @cerrar-formulario="cerrarFormulario"
      @event-edit-auto="ListarClientes"
    />

    <!-- Búsqueda por cédula -->
    <div class="buscar-container">
      <input
        type="text"
        v-model="busquedacedulaIdentidad"
        class="input-busqueda"
        placeholder="Cedula de Identidad..."
      />
      <Button
        icon="pi pi-search"
        aria-label="Search"
        @click="methodBuscar"
        style="background-color: #065813; color: white; border-color: #065813; margin-left: 10px;"
      />
    </div>

    <!-- Tabla de clientes -->
    <div v-if="listaClientes.length > 0" class="block">
      <div class="card">
        <DataTable
          :value="listaClientes"
          showGridlines
          paginator
          :rows="2"
          :rowsPerPageOptions="[2, 4, 6]"
          tableStyle="min-width: 50rem"
        >
          <Column field="nombre1" header="Primer Nombre" sortable></Column>
          <Column field="apellidoPaterno" header="Apellido Paterno"></Column>
          <Column field="apellidoMaterno" header="Apellido Materno"></Column>
          <Column field="cedulaIdentidad" header="Cedula de Identidad"></Column>
          <Column field="telefono" header="Telefono"></Column>
          <Column header="Acciones" style="width: 150px;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                @click="actualizarCliente(slotProps.data)"
                style="background-color: #F7BB07; color: white; border-color: #F7BB07; margin-right: 15px;"
              />
              <Button
                icon="pi pi-times"
                @click="confirmarEliminar(slotProps.data._id)"
                style="background-color: #e00000; color: white; border-color: #e00000"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div v-else>cargando datos...</div>
  </div>
</template>

<style scoped>
.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.buscar-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.input-busqueda {
  flex: 1;
  padding: 8px;
  font-size: 14px;
}

.card {
  margin-top: 20px;
}
</style>
