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
  <div class="card flex justify-center">
    <label>Autos:</label>
    <Select
      v-model="selectedAutos"
      :options="listaAutos"
      :filter="true"
      :checkmark="true"
      :showClear="true"
      optionLabel="Marca"
      placeholder="Seleccione un Auto"
      class="w-full md:w-56"
    ></Select>
  </div>
  <button @click="mostrarFormulario" class="btn btn-primary">Nuevo Auto</button>

  <!-- Formulario de nuevo auto -->
  <AddAutos
    ref="AddAutosRef"
    @event-nuevo-auto="ListarAutos"
    @cerrar-formulario="cerrarFormulario"
  ></AddAutos>
</template>
