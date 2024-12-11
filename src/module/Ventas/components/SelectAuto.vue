<script setup lang="ts">
import AddAutos from '../../Autos/components/AddAutos.vue'
import axios from 'axios'
import Select from 'primevue/select'
import { onMounted, ref, watch } from 'vue'

const AddAutosRef = ref()

const listaAutos = ref([])
const selectedAutos = ref()
const verFormulario = ref(false) // Controla la visibilidad del formulario
const emit = defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: String,
    required: false,
    default: null,
  },
})

// Función para listar todos los autos
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

// Observa cambios en el auto seleccionado y emite el valor actualizado
watch(selectedAutos, (v) => {
  console.log('Nuevo valor:', v)
  if (v) {
    emit('update:modelValue', v._id)
  } else {
    emit('update:modelValue', null)
  }
})

// Alternar visibilidad del formulario
const mostrarFormulario = () => {
  if (AddAutosRef.value) {
    AddAutosRef.value.abrirDialog()
  } else {
    console.error('Referencia AddAutosRef no está definida')
  }
}
const cerrarFormulario = () => {
  verFormulario.value = false // Ocultar el formulario
}

// Cargar autos al montar el componente
onMounted(() => {
  ListarAutos()
})
</script>

<template>
  <div class="card flex justify-center items-center">
    <div class="select-container">
      <label>Autos:</label>
      <Select
        v-model="selectedAutos"
        :options="listaAutos"
        :filter="true"
        :checkmark="true"
        :showClear="true"
        optionLabel="Marca"
        placeholder="Seleccione un Auto"
        class="select-auto"
      ></Select>
    </div>
    <button @click="mostrarFormulario" class="btn-nuevo-auto">
      Nuevo Auto
    </button>
  </div>

  <!-- Formulario de nuevo auto -->
  <AddAutos
    ref="AddAutosRef"
    @event-nuevo-auto="ListarAutos"
    @cerrar-formulario="cerrarFormulario"
  ></AddAutos>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Espacio entre el select y el botón */
}

label{
  margin-bottom: 0.5rem;
  color: black;
  font-weight: bold;
}

.select-container {
  margin-top: 15px;
  flex-grow: 1;
}

.select-auto {
  width: 95%; /* El Select ocupa el 95% del espacio disponible */
}

.btn-nuevo-auto {
  background-color: #065813;
  color: white;
  border: 2px solid #065813;
  border-radius: 8px; /* Bordes ligeramente curvados */
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 35px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1; /* Alineación del texto */
}

.btn-nuevo-auto:hover {
  background-color: #044c0d;
  border-color: #044c0d;
}
</style>
