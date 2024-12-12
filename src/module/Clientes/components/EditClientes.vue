<script setup lang="ts">
import { reactive, defineEmits, ref } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import Dialog from 'primevue/dialog'
import type { Cliente } from '../ListarClientes.vue'

// Toast para mostrar mensajes de éxito o error
const toast = useToast()

// Definir eventos que el componente emitirá
const emit = defineEmits(['event-edit-cliente', 'cerrar-formulario']);

// Definir las propiedades que el componente recibe
const seleccionado = ref<Cliente | null>(null)

// Inicializar datos reactivos para la edición
const datosAEditar = reactive({
  _id: '',
  nombre1: seleccionado.value?.nombre1 || '',
  nombre2: seleccionado.value?.nombre2 || '',
  apellidoPaterno: seleccionado.value?.apellidoPaterno || '',
  apellidoMaterno: seleccionado.value?.apellidoMaterno || '',
  fechaNacimiento: seleccionado.value?.fechaNacimiento || new Date(),
  sexo: seleccionado.value?.sexo || '',
  cedulaIdentidad: seleccionado.value?.cedulaIdentidad || '',
  direccion: seleccionado.value?.direccion || '',
  telefono: seleccionado.value?.telefono || '',
  email: seleccionado.value?.email || '',
})

// Control del diálogo de confirmación
const confirm = useConfirm()
const visible = ref(false)
const loading = ref(false) // Controla el estado de carga

// Función para abrir el dialogo de edición
const abrirDialog = (cliente: Cliente) => {
  seleccionado.value = cliente

  datosAEditar._id = cliente._id
  datosAEditar.nombre1 = cliente.nombre1
  datosAEditar.nombre2 =  cliente.nombre2
  datosAEditar.apellidoPaterno = cliente.apellidoPaterno
  datosAEditar.apellidoMaterno = cliente.apellidoMaterno
  datosAEditar.fechaNacimiento = cliente.fechaNacimiento.slice(0, 10)
  datosAEditar.sexo = cliente.sexo
  datosAEditar.cedulaIdentidad = cliente.cedulaIdentidad
  datosAEditar.direccion = cliente.direccion
  datosAEditar.telefono = cliente.telefono
  datosAEditar.email = cliente.email
  visible.value = true
}

// Función para enviar datos editados al servidor
const enviarDatos = () => {
  if (!seleccionado.value?._id) {
    console.error('No se ha seleccionado un Cliente para editar.')
    return
  }

  loading.value = true // Activar carga mientras se realiza la actualización

  confirm.require({
    message: '¿Está seguro de actualizar este Cliente?',
    header: 'Confirmar',
    icon: 'pi pi-info-circle',
    accept: () => {
      setTimeout(() => {
        axios
          .patch(`http://127.0.0.1:3005/clientes/${seleccionado.value?._id}`, datosAEditar)
          .then(() => {
            toast.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Cliente actualizado correctamente',
              life: 3000,
            })
            // Emitir evento para actualizar la lista de autos
            emit('event-edit-cliente')
            // Emitir evento para cerrar el formulario
            emit('cerrar-formulario')
            visible.value = false // Cierra el diálogo después de la actualización
            loading.value = false // Desactivar carga
          })
          .catch((err) => {
            console.error('Ocurrió un error al actualizar el Cliente:', err)
            toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un error al actualizar el Cliente',
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
    <label for="nombre1">Primer Nombre:</label>
    <input id="nombre1" type="text" v-model="datosAEditar.nombre1" />
  </div>

  <div>
    <label for="nombre2">Segundo Nombre:</label>
    <input id="nombre2" type="text" v-model="datosAEditar.nombre2" />
  </div>

  <div>
    <label for="apellidopaterno">Apellido Paterno:</label>
    <input id="apellidopaterno" type="text" v-model="datosAEditar.apellidoPaterno" />
  </div>

  <div>
    <label for="apellidomaterno">Apellido Materno:</label>
    <input id="apellidomaterno" type="text" v-model="datosAEditar.apellidoMaterno" />
  </div>

  <div>
    <label for="fechanacimiento">Fecha de Nacimiento:</label>
    <input id="fechanacimiento" type="date" v-model="datosAEditar.fechaNacimiento" />
  </div>

  <div>
    <label for="sexo">Sexo:</label>
    <select id="sexo" v-model="datosAEditar.sexo">
      <option value="M">Masculino</option>
      <option value="F">Femenino</option>
    </select>
  </div>

  <div>
    <label for="cedulaidentidad">Cédula de Identidad:</label>
    <input id="cedulaidentidad" type="text" v-model="datosAEditar.cedulaIdentidad" />
  </div>

  <div>
    <label for="direccion">Dirección:</label>
    <input id="direccion" type="text" v-model="datosAEditar.direccion" />
  </div>

  <div>
    <label for="telefono">Teléfono:</label>
    <input id="telefono" type="text" v-model="datosAEditar.telefono" />
  </div>

  <div>
    <label for="email">Correo Electrónico:</label>
    <input id="email" type="email" v-model="datosAEditar.email" />
  </div>

  <button class="btn-registrar" @click="enviarDatos">Actualizar</button>
  <hr class="linea-divisor" />

  </Dialog>
</template>

<style>
/* Estilos del formulario */
div {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="date"],
input[type="email"],
select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-registrar {
  width: 100%;
  padding: 10px;
  background-color: #065813;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-registrar:hover {
  background-color: #044c0d;
}

.linea-divisor {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-top: 3px solid #065813;
}
</style>
