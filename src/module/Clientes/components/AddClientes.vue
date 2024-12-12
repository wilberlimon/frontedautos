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
  fechaNacimiento: '',
  sexo: '',
  cedulaIdentidad: '',
  direccion: '',
  telefono: '',
  email: '',
})

const confirm = useConfirm()

const enviarDatos = (event: Event) => {
  event.preventDefault(); // Prevenir el comportamiento de envío del formulario
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
    <form class="formulario" @submit="enviarDatos">
      <div class="campo">
        <label for="nombre1">Primer Nombre: </label>
        <input id="nombre1" type="text" v-model="crearCliente.nombre1" />
      </div>

      <div class="campo">
        <label for="nombre2">Segundo Nombre: </label>
        <input id="nombre2" type="text" v-model="crearCliente.nombre2" />
      </div>

      <div class="campo">
        <label for="apellidopaterno">Apellido Paterno: </label>
        <input id="apellidopaterno" type="text" v-model="crearCliente.apellidoPaterno" />
      </div>

      <div class="campo">
        <label for="apellidomaterno">Apellido Materno: </label>
        <input id="apellidomaterno" type="text" v-model="crearCliente.apellidoMaterno" />
      </div>

      <div class="campo">
        <label for="fechanacimiento">Fecha de Nacimiento: </label>
        <input id="fechanacimiento" type="date" v-model="crearCliente.fechaNacimiento" />
      </div>

      <div class="campo">
        <label for="sexo">Sexo: </label>
        <select id="sexo" v-model="crearCliente.sexo">
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </div>

      <div class="campo">
        <label for="cedulaidentidad">Cedula de Identidad: </label>
        <input id="cedulaidentidad" type="text" v-model="crearCliente.cedulaIdentidad" />
      </div>

      <div class="campo">
        <label for="direccion">Dirección: </label>
        <input id="direccion" type="text" v-model="crearCliente.direccion" />
      </div>

      <div class="campo">
        <label for="telefono">Telefono:</label>
        <input id="telefono" type="text" v-model="crearCliente.telefono" />
      </div>

      <div class="campo">
        <label for="email">Correo Electronico:</label>
        <input id="email" type="text" v-model="crearCliente.email" />
      </div>

      <div class="boton-registro">
        <button type="submit">Registrar</button>
      </div>
    </form>
  </Dialog>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 30rem;
  margin: auto;
}

.campo {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.campo label {
  margin-bottom: 0.5rem;
  color: black;
  font-weight: bold;
}

.campo input,
.campo select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

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
  background-color: #033a0a;
}
</style>
