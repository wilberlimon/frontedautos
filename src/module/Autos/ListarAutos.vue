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
const verFormularioEditar = ref(false)
const busquedamarca = ref('')
const AutoSeleccionado = ref<Autos | null>(null)
const dialogEliminar = ref(false)
const autoAEliminar = ref<string | null>(null)
const toast = useToast()

const AddAutosRef = ref<InstanceType<typeof AddAutos> | null>(null)
const EditAutosRef = ref<InstanceType<typeof EditAutos> | null>(null)

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

// Mostrar formulario de agregar autos
const mostrarFormulario = () => {
  if (AddAutosRef.value) {
    AddAutosRef.value.abrirDialog()
  } else {
    console.error('Referencia AddAutosRef no está definida')
  }
}

// Cerrar formulario
const cerrarFormulario = () => {
  verFormulario.value = false
}

// Confirmar eliminación
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
        dialogEliminar.value = false
        autoAEliminar.value = null
      })
      .catch((error) => {
        console.error('Error al eliminar autos:', error)
      })
  }
}

// Editar autos
const actualizarAutos = (itemAutos: Autos) => {
  AutoSeleccionado.value = itemAutos
  verFormularioEditar.value = true
  nextTick(() => {
    // Asegura que Vue actualice la vista
  })
}

// Buscar autos por marca
const methodBuscar = () => {
  if (!busquedamarca.value.trim()) {
    ListarAutos()
    return
  }

  axios
    .get('http://localhost:3005/autos/buscar', {
      params: { Marca: busquedamarca.value.trim() },
    })
    .then((response) => {
      if (response.data && response.data.length > 0) {
        listaAutos.value = response.data
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
        <Button label="Eliminar" icon="pi pi-check" severity="danger" @click="eliminarAutos" />
      </div>
    </Dialog>

    <button class="toggle-form" @click="mostrarFormulario">Nuevo Registro</button>

    <AddAutos
      ref="AddAutosRef"
      @cerrar-formulario="cerrarFormulario"
      @event-nuevo-auto="ListarAutos"
    />

    <EditAutos
      ref="EditAutosRef"
      v-if="verFormularioEditar && AutoSeleccionado"
      :seleccionado="AutoSeleccionado"
      @cerrar-formulario="cerrarFormulario"
      @event-edit-auto="ListarAutos"
    />

    <div class="buscar-container">
      <input
        type="text"
        v-model="busquedamarca"
        class="input-busqueda"
        placeholder="Buscar por marca..."
      />
      <button @click="methodBuscar" class="buscar">Buscar</button>
    </div>

    <div v-if="listaAutos.length > 0" class="block">
      <div class="card">
        <DataTable
          :value="listaAutos"
          showGridlines
          paginator
          :rows="5"
          :rowsPerPageOptions="[2, 3]"
          tableStyle="min-width: 50rem"
        >
          <Column field="Marca" header="Marca" sortable></Column>
          <Column field="Modelo" header="Modelo" sortable></Column>
          <Column field="Anio" header="Año" sortable></Column>
          <Column field="Color" header="Color" sortable></Column>
          <Column field="Tipo" header="Tipo" sortable></Column>
          <Column header="Acciones">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" @click="actualizarAutos(slotProps.data)" />
              <Button
                icon="pi pi-times"
                severity="danger"
                @click="confirmarEliminar(slotProps.data._id)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div v-else>Cargando datos...</div>
  </div>
</template>

<style>
.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
