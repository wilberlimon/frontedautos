<script setup lang="ts">
import axios from 'axios'
import { ref, nextTick } from 'vue'
import 'primeicons/primeicons.css'
import Button from 'primevue/button'
import AddAutos from './components/AddAutos.vue'
import EditAutos from './components/EditAutos.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

interface Autos {
  _id: string
  Marca: string
  Modelo: string
  Anio: string
  Color: string
  Tipo: string
  Chasis: string
  Vin: string
  OtrasCaracteristicas: string
  FechaIngreso: string
}

const listaAutos = ref<Autos[]>([])
const verFormulario = ref(false)
const verFormularioEditar = ref(false) // Variable para controlar la visibilidad del formulario de edición
const busquedamarca = ref('') // Campo de búsqueda por marca
const AutoSeleccionado = ref<Autos | null>(null)
const dialogEliminar = ref(false) // Controla la visibilidad del diálogo de confirmación
const autoAEliminar = ref<string | null>(null) // ID del auto a eliminar
const toast = useToast() // Instancia del toast

// Listar todos los autos
const ListarAutos = () => {
  axios
    .get('http://localhost:3005/autos')
    .then((response) => {
      listaAutos.value = response.data
    })
    .catch((error) => {
      console.error('Error al obtener la lista de autos:', error)
    })
}
ListarAutos()

const AddAutosRef = ref<InstanceType<typeof AddAutos> | null>(null) // Ref al componente AddAutos
const EditAutosRef = ref<InstanceType<typeof EditAutos> | null>(null)

const mostrarFormulario = () => {
  verFormulario.value = true
  if (AddAutosRef.value) {
    AddAutosRef.value.abrirDialog()
  } else {
    console.error('Referencia AddAutosRef no está definida')
  }
}

const cerrarFormulario = () => {
  verFormulario.value = false
}

// Confirmar eliminar
const confirmarEliminar = (id: string) => {
  autoAEliminar.value = id
  dialogEliminar.value = true
}

// Eliminar autos
const eliminarAutos = () => {
  if (autoAEliminar.value) {
    axios
      .delete(`http://localhost:3005/autos/${autoAEliminar.value}`)
      .then(() => {
        ListarAutos()
        toast.add({
          severity: 'error',
          summary: 'Eliminado',
          detail: 'Registro eliminado exitosamente',
          life: 3000,
        })
        dialogEliminar.value = false // Cierra el diálogo
        autoAEliminar.value = null // Resetea el ID
      })
      .catch((error) => {
        console.error('Error al eliminar autos:', error)
      })
  }
}

// Editar autos
const actualizarAutos = (itemAutos: Autos) => {
  AutoSeleccionado.value = itemAutos
  verFormularioEditar.value = true // Muestra el formulario de edición
  nextTick(() => {
    // Asegura que Vue actualice la vista después de cambiar el estado
  })
}

// Buscar autos por marca
const methodBuscar = () => {
  if (!busquedamarca.value.trim()) {
    ListarAutos() // Listar todos los autos si el campo está vacío
    return
  }

  axios
    .get(`http://localhost:3005/autos/buscar`, {
      params: { Marca: busquedamarca.value.trim() },
    })
    .then((response) => {
      if (response.data && response.data.length > 0) {
        listaAutos.value = response.data // Mostrar resultados
      } else {
        alert('No se encontraron resultados para esta marca.')
        listaAutos.value = []
      }
    })
    .catch((error) => {
      console.error('Error al buscar autos:', error)
      alert('Ocurrió un error al realizar la búsqueda.')
    })
}
</script>

<template>
  <div>
    <!-- Toast -->
    <Toast />

    <!-- Diálogo de confirmación para eliminar -->
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
        <Button label="Eliminar" icon="pi pi-check" severity="danger" @click="eliminarAutos" />
      </div>
    </Dialog>

    <!-- Botón de nuevo registro -->
    <button class="toggle-form" @click="mostrarFormulario">
      {{ verFormulario ? 'Ocultar formulario' : 'Nuevo Registro' }}
    </button>

    <!-- Formulario de agregar autos -->
    <AddAutos
      ref="AddAutosRef"
      @cerrar-formulario="cerrarFormulario"
      @event-nuevo-auto="ListarAutos"
    />

    <!-- Formulario de editar autos -->
    <EditAutos
      ref="EditAutosRef"
      v-if="verFormularioEditar && AutoSeleccionado"
      :seleccionado="AutoSeleccionado"
      @cerrar-formulario="cerrarFormulario"
      @event-edit-auto="ListarAutos"
    />

    <!-- Campos de búsqueda -->
    <div class="buscar-container">
      <input
        type="text"
        v-model="busquedamarca"
        class="input-busqueda"
        placeholder="Buscar por marca..."
      />
      <button @click="methodBuscar" class="buscar">Buscar</button>
    </div>

    <!-- Tabla de autos -->
    <div v-if="listaAutos.length > 0" class="block">
      <div class="card">
        <DataTable
          :value="listaAutos"
          showGridlines
          paginator
          :rows="2"
          :rowsPerPageOptions="[2, 4, 6, 8, 10]"
          tableStyle="min-width: 50rem"
        >
          <Column field="Marca" :sortable="true" header="Marca"></Column>
          <Column field="Modelo" :sortable="true" header="Modelo"></Column>
          <Column field="Anio" :sortable="true" header="Año"></Column>
          <Column field="Color" :sortable="true" header="Color"></Column>
          <Column field="Tipo" :sortable="true" header="Tipo"></Column>
          <Column header="Acciones">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                severity="secondary"
                aria-label="Editar"
                @click="actualizarAutos(slotProps.data)"
              />
              <Button
                icon="pi pi-times"
                severity="danger"
                aria-label="Eliminar"
                @click="confirmarEliminar(slotProps.data._id)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div v-else>cargando datos...</div>
  </div>
</template>

<style>
.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
