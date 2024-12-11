<script setup lang="ts">
import AddClientes from '../../Clientes/components/AddClientes.vue'
import axios from 'axios'
import Select from 'primevue/select'
import { onMounted, ref, watch } from 'vue'


const AddClientesRef = ref()

const listaClientes = ref([])
const selectedClientes = ref()
const verFormulario = ref(false) // Controla la visibilidad del formulario
const emit = defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: String,
    required: false,
    default: null,
  },
})

// Función para listar todos los clientes
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

// Observa cambios en el cliente seleccionado y emite el valor actualizado
watch(selectedClientes, (v) => {
  console.log('Nuevo valor:', v)
  if (v) {
    emit('update:modelValue', v._id)
  } else {
    emit('update:modelValue', null)
  }
})


const mostrarFormulario = () => {
  if (AddClientesRef.value) {
    AddClientesRef.value.abrirDialog()
  } else {
    console.error('Referencia AddClientesRef no está definida')
  }
}
// Alternar visibilidad del formulario
const cerrarFormulario = () => {
  verFormulario.value = false // Ocultar el formulario
}

// Cargar clientes al montar el componente
onMounted(() => {
  ListarClientes()
})
</script>

<template>
  <div class="card flex justify-center">
    <label>Clientes:</label>
    <Select
      v-model="selectedClientes"
      :options="listaClientes"
      :filter="true"
      :checkmark="true"
      :showClear="true"
      optionLabel="cedulaIdentidad"
      placeholder="Seleccione un Cliente"
      class="w-full md:w-56"
    ></Select>
  </div>
  <button @click="mostrarFormulario" class="btn btn-primary">Nuevo Cliente</button>

  <!-- Formulario de nuevo cliente -->
  <AddClientes
    ref="AddClientesRef"
    @event-nuevo-cliente="ListarClientes"
    @cerrar-formulario="cerrarFormulario"
  ></AddClientes>
</template>
