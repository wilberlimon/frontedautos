<script setup lang="ts">
import { reactive, defineEmits, defineProps, ref, watch } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import Dialog from 'primevue/dialog'

// Toast para mostrar mensajes de éxito o error
const toast = useToast()

// Definir eventos que el componente emitirá
const emit = defineEmits(['event-edit-auto', 'cerrar-formulario'])

// Definir las propiedades que el componente recibe
const prop = defineProps({
  seleccionado: {
    type: Object,
    required: false,
    default: null,
  },
})

// Inicializar datos reactivos para la edición
const datosAEditar = reactive({
  Marca: prop.seleccionado?.Marca || '',
  Modelo: prop.seleccionado?.Modelo || '',
  Anio: prop.seleccionado?.Anio || '',
  Color: prop.seleccionado?.Color || '',
  Tipo: prop.seleccionado?.Tipo || '',
  Chasis: prop.seleccionado?.Chasis || '',
  Vin: prop.seleccionado?.Vin || '',
  OtrasCaracteristicas: prop.seleccionado?.OtrasCaracteristicas || '',
  FechaIngreso: prop.seleccionado?.FechaIngreso || '',
})

// Control del diálogo de confirmación
const confirm = useConfirm()
const visible = ref(false)
const loading = ref(false) // Controla el estado de carga

// Función para abrir el dialogo de edición
const abrirDialog = () => {
  visible.value = true
}

// Función para enviar datos editados al servidor
const enviarDatos = () => {
  if (!prop.seleccionado?._id) {
    console.error('No se ha seleccionado un Auto para editar.')
    return
  }

  loading.value = true // Activar carga mientras se realiza la actualización

  confirm.require({
    message: '¿Está seguro de actualizar este Auto?',
    header: 'Confirmar',
    icon: 'pi pi-info-circle',
    accept: () => {
      setTimeout(() => {
        axios
          .patch(`http://127.0.0.1:3005/autos/${prop.seleccionado._id}`, datosAEditar)
          .then(() => {
            toast.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Auto actualizado correctamente',
              life: 3000,
            })
            // Emitir evento para actualizar la lista de autos
            emit('event-edit-auto')
            // Emitir evento para cerrar el formulario
            emit('cerrar-formulario')
            visible.value = false // Cierra el diálogo después de la actualización
            loading.value = false // Desactivar carga
          })
          .catch((err) => {
            console.error('Ocurrió un error al actualizar el Auto:', err)
            toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un error al actualizar el Auto',
              life: 3000,
            })
            loading.value = false // Desactivar carga en caso de error
          })
      }, 500)
    },
    reject: () => {
      console.log('Edición cancelada')
      loading.value = false // Desactivar carga si se rechaza
    },
  })
}

// Monitorear cambios en prop.seleccionado para actualizar los datos reactivos
watch(
  () => prop.seleccionado,
  (newVal) => {
    if (newVal) {
      // Si se selecciona un nuevo auto, actualizar los datos
      datosAEditar.Marca = newVal.Marca
      datosAEditar.Modelo = newVal.Modelo
      datosAEditar.Anio = newVal.Anio
      datosAEditar.Color = newVal.Color
      datosAEditar.Tipo = newVal.Tipo
      datosAEditar.Chasis = newVal.Chasis
      datosAEditar.Vin = newVal.Vin
      datosAEditar.OtrasCaracteristicas = newVal.OtrasCaracteristicas
      datosAEditar.FechaIngreso = newVal.FechaIngreso
    }
  },
)

defineExpose({ abrirDialog })
</script>

<template>
  <ConfirmDialog />
  <Toast position="bottom-right" />

  <!-- Dialog para la edición -->
  <Dialog
    v-model:visible="visible"
    modal
    header="Formulario de Edición"
    :style="{ width: '30rem' }"
  >
    <div>
      <label for="marca">Marca: </label>
      <input id="marca" type="text" v-model="datosAEditar.Marca" />
    </div>

    <div>
      <label for="modelo">Modelo: </label>
      <input id="modelo" type="text" v-model="datosAEditar.Modelo" />
    </div>

    <div>
      <label for="anio">Año: </label>
      <input id="anio" type="text" v-model="datosAEditar.Anio" />
    </div>

    <div>
      <label for="color">Color: </label>
      <input id="color" type="text" v-model="datosAEditar.Color" />
    </div>

    <div>
      <label for="tipo">Tipo: </label>
      <select v-model="datosAEditar.Tipo">
        <option value="Familiar">Familiar</option>
        <option value="Corporativo">Corporativo</option>
        <option value="Otro">Otro</option>
      </select>
    </div>

    <div>
      <label for="chasis">Chasis: </label>
      <input id="chasis" type="text" v-model="datosAEditar.Chasis" />
    </div>

    <div>
      <label for="vin">Vin: </label>
      <input id="vin" type="text" v-model="datosAEditar.Vin" />
    </div>

    <div>
      <label for="otrascaracteristicas">Otras Características: </label>
      <input id="otrascaracteristicas" type="text" v-model="datosAEditar.OtrasCaracteristicas" />
    </div>

    <div>
      <label for="fechaingreso">Fecha de Ingreso: </label>
      <input id="fechaingreso" type="date" v-model="datosAEditar.FechaIngreso" />
    </div>

    <div class="flex justify-end gap-2">
      <button @click="visible = false">Cancelar</button>
      <button :disabled="loading" @click="enviarDatos">Actualizar</button>
    </div>
  </Dialog>
</template>

<style scoped>
/* Estilos del formulario */
div {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='text'],
input[type='date'],
select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #065813;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #044c0d;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
