<script setup lang="ts">
import axios from 'axios'
import { ref, nextTick} from 'vue'
import 'primeicons/primeicons.css'
import AddClientes from './components/AddClientes.vue'
import EditClientes from './components/EditClientes.vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import 'primeicons/primeicons.css'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'


interface Cliente {
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
const verFormularioEditar = ref(false)
const busquedacedulaIdentidad = ref('') // Campo de búsqueda por cédula
const clienteSeleccionado = ref<Cliente | null>(null)
  const dialogEliminar = ref(false)
const clienteAEliminar = ref<string | null>(null)
const toast = useToast()

// desdeaqui
const AddClientesRef = ref<InstanceType<typeof AddClientes> | null>(null)
const EditClientesRef = ref<InstanceType<typeof EditClientes> | null>(null)
// hastaaqui

const ListarClientes = () => {
  axios
    .get('http://localhost:3005/clientes/Listar')
    .then((response) => {
      listaClientes.value = response.data
    })
    .catch((error) => {
      console.error('Error al obtener la lista de clientes:', error)
    })
}
ListarClientes()

// desdeaqui
const mostrarFormulario = () => {
  if (AddClientesRef.value) {
    AddClientesRef.value.abrirDialog()
  } else {
    console.error('Referencia AddAutosRef no está definida')
  }
}
// hastaaqui
const cerrarFormulario = () => {
  verFormulario.value = false
}

const confirmarEliminar = (id: string) => {
  clienteAEliminar.value = id
  dialogEliminar.value = true
}


// desdeaqui
const eliminarCliente = () => {
  if (clienteAEliminar.value) {
    axios
    .delete(`http://localhost:3005/clientes/${clienteAEliminar.value}`)
    .then(() => {
      ListarClientes()
        toast.add({
          severity: 'error',
          summary: 'Eliminado',
          detail: 'Registro eliminado exitosamente',
          life: 3000,
        })
        dialogEliminar.value = false
        clienteAEliminar.value = null
      })
      .catch((error) => {
        console.error('Error al eliminar cliente:', error)
      })
  }
}
// hastaaqui

// desde aqui
const actualizarCliente = (itemcliente: Cliente) => {
  clienteSeleccionado.value = itemcliente
  verFormularioEditar.value = true
  nextTick(() => {
    // Asegura que Vue actualice la vista
  })
}
// hasta aqui


const methodBuscar = () => {
  // Validar si el campo está vacío
  if (!busquedacedulaIdentidad.value.trim()) {
    ListarClientes() // Llama a la función para listar todos los clientes
    return
  }

  // Construir la consulta para buscar por cédula
  const query = `?cedulaIdentidad=${encodeURIComponent(busquedacedulaIdentidad.value.trim())}`

  axios
    .get(`http://127.0.0.1:3005/clientes/buscar${query}`)
    .then((response) => {
      const cliente = response.data

      // Validar si la respuesta contiene datos
      if (cliente && Object.keys(cliente).length > 0) {
        listaClientes.value = [cliente] // Convertir el objeto en un arreglo para mostrarlo
      } else {
        alert('No se encontraron resultados para esta cédula.')
        listaClientes.value = [] // Limpiar la tabla
      }
    })
    .catch((err) => {
      console.error('Error al buscar cliente:', err)
      alert('Ocurrió un error al realizar la búsqueda.')
    })
}
</script>

<template>
 <div>
    <Toast />
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

    <Button
      icon="pi pi-plus"
      aria-label="Añadir"
      @click="mostrarFormulario"
      style="background-color: #065813; color: white; border-color: #065813; margin-bottom: 15px;"
    />
    <hr />
    <AddClientes
      ref="AddClientesRef"
      @cerrar-formulario="cerrarFormulario"
      @event-nuevo-auto="ListarClientes"
    />

    <EditAutos
      ref="EditClientesRef"
      v-if="verFormularioEditar && clienteSeleccionado"
      :seleccionado="clienteSeleccionado"
      @cerrar-formulario="cerrarFormulario"
      @event-edit-auto="ListarClientes"
    />

    <!-- Caja de búsqueda encima de la tabla -->
     <br>
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
          :rows="5"
          :rowsPerPageOptions="[2, 3]"
          tableStyle="min-width: 50rem"
        >
          <Column field="nombre1" header="Primer Nombre" sortable></Column>
          <Column field="apellidoPaterno" header="Apellido Paterno" sortable></Column>
          <Column field="apellidoMaterno" header="Apellido Materno " sortable></Column>
          <Column field="cedulaIdentidad" header="Cedula de Identidad" sortable></Column>
          <Column field="telefono" header="Telefono" sortable></Column>
          <Column header="Acciones">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                @click="actualizarCliente(slotProps.data)"
                style="background-color: #065813; color: white; border-color: #065813; margin-right: 15px;"
              />
              <Button
                icon="pi pi-times"
                @click="confirmarEliminar(slotProps.data._id)"
                style="background-color: #E00000; color: white; border-color: #E00000;"
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
  margin-bottom: 15px; /* Espacio debajo de la caja de búsqueda */
}

.input-busqueda {
  flex: 1;
  padding: 8px;
  font-size: 14px;
}

.card {
  margin-top: 20px; /* Espacio entre la caja de búsqueda y la tabla */
}
</style>
