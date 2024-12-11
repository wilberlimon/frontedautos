<!-- desde aqui -->
<script setup lang="ts">
import axios from 'axios'
import { reactive, ref } from 'vue'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'


const toast = useToast()
const visible = ref(false)

const abrirDialog = () => {
  visible.value = true
}

const emit = defineEmits(['event-nuevo-cliente', 'cerrar-formulario', 'event-nuevo-auto'])
const crearCliente = reactive({
  nombre1: '',
  nombre2: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  FechaNacimiento: '',
  sexo: '',
  cedulaIdentidad: '',
  direccion: '',
  telefono: '',
  email: '',
})
const confirm = useConfirm()
// desde aqui
const enviarDatos = () => {
  confirm.require({
    message: '¿Está seguro de registrar el Auto?',
    header: 'Confirmar Registro',
    icon: 'pi pi-info-circle',
    accept: () => {
      axios
      .post('http://127.0.0.1:3005/clientes/registrar', crearCliente)
      .then((response) => {
          toast.add({
            severity: 'success',
            summary: 'Info',
            detail: 'Auto Creado Exitosamente',
            life: 3000,
          })
          emit('event-nuevo-cliente', response.data); // Emitir el cliente creado
          emit('cerrar-formulario');
          visible.value = false // Cerrar el dialog después de crear
        })
        .catch((err) => {
          console.error('Ocurrió un error', err)
        })
    },
    reject: () => {
      console.log('Registro cancelado')
    },
  })
}
// hastaaqui

defineExpose({ abrirDialog })
</script>

<template>
  <ConfirmDialog />
  <Toast position="bottom-right" />

  <Dialog
    v-model:visible="visible"
    modal
    header="Formulario de Registro"
    :style="{ width: '30rem' }"
  >
  <div>
    <label for="nombre1">Primer Nombre: </label>
    <input id="nombre1" type="text" v-model="crearCliente.nombre1" />
  </div>

  <div>
    <label for="nombre2">Segundo Nombre: </label>
    <input id="nombre2" type="text" v-model="crearCliente.nombre2" />
  </div>

  <div>
    <label for="apellidopaterno">Apellido Paterno: </label>
    <input id="apellidopaterno" type="text" v-model="crearCliente.apellidoPaterno" />
  </div>

  <div>
    <label for="apellidomaterno">Apellido Materno: </label>
    <input id="apellidomaterno" type="text" v-model="crearCliente.apellidoMaterno" />
  </div>

  <div>
    <label for="fechanacimiento">Fecha de Nacimiento:: </label>
    <input id="fechanacimiento" type="Date" v-model="crearCliente.FechaNacimiento" />
  </div>

  <div>
    <label for="sexo">Sexo: </label>
    <select v-model="crearCliente.sexo">
      <option value="M">Masculino</option>
      <option value="F">Femenino</option>
    </select>
  </div>

  <div>
    <label for="cedulaidentidad">Cedula de Identidad: </label>
    <input id="cedulaidentidad" type="text" v-model="crearCliente.cedulaIdentidad" />
  </div>

  <div>
    <label for="direccion">Dirección: </label>
    <input id="direcion" type="text" v-model="crearCliente.direccion" />
  </div>

  <div>
    <label for="telefono">Telefono:</label>
    <input id="telefono" type="text" v-model="crearCliente.telefono" />
  </div>

  <div>
    <label for="email">Correo Electronico:</label>
    <input id="email" type="text" v-model="crearCliente.email" />
  </div>
    <div class="boton-registro">
      <button class="btn-registrar" @click="enviarDatos">Registrar</button>
    </div>
  </Dialog>
</template>

<style scoped>
.boton-registro {
  margin-top: 1rem;
}

.boton-registro button {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  background-color: #044c0d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.boton-registro button:hover {
  background-color: #044c0d;
}
</style>

 <!-- hastaaqui -->
