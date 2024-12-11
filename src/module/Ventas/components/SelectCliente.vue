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
  <div class="card flex justify-center items-center">
    <div class="select-container">
      <label>Clientes:</label>
      <Select
        v-model="selectedClientes"
        :options="listaClientes"
        :filter="true"
        :checkmark="true"
        :showClear="true"
        optionLabel="cedulaIdentidad"
        placeholder="Seleccione un Cliente"
        class="select-client"
      ></Select>
    </div>
    <button @click="mostrarFormulario" class="btn-nuevo-cliente">
      Nuevo Cliente
    </button>
  </div>

  <!-- Formulario de nuevo cliente -->
  <AddClientes
    ref="AddClientesRef"
    @event-nuevo-cliente="ListarClientes"
    @cerrar-formulario="cerrarFormulario"
  ></AddClientes>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Espacio entre el select y el botón */
}

.select-container {
  flex-grow: 1;
}

.select-client {
  width: 95%; /* El Select ocupa el 95% del espacio disponible */
}

.btn-nuevo-cliente {
  background-color: #065813;
  color: white;
  border: 2px solid #065813;
  border-radius: 8px; /* Bordes ligeramente curvados */
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  height: 40px;
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  line-height: 1; /* Alineación del texto */
}

label{
  margin-bottom: 0.5rem;
  color: black;
  font-weight: bold;
}

.btn-nuevo-cliente:hover {
  background-color: #044c0d;
  border-color: #044c0d;
}
</style>
