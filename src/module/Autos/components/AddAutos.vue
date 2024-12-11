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

const emit = defineEmits(['event-nuevo-auto', 'cerrar-formulario'])
const crearAuto = reactive({
  Marca: '',
  Modelo: '',
  Anio: '',
  Color: '',
  Tipo: '',
  Chasis: '',
  Vin: '',
  OtrasCaracteristicas: '',
  FechaIngreso: '',
})

const confirm = useConfirm()
const enviarDatos = () => {
  confirm.require({
    message: '¿Está seguro de registrar el Auto?',
    header: 'Confirmar Registro',
    icon: 'pi pi-info-circle',
    accept: () => {
      axios
        .post('http://127.0.0.1:3005/autos', crearAuto)
        .then((response) => {
          toast.add({
            severity: 'success',
            summary: 'Info',
            detail: 'Auto Creado Exitosamente',
            life: 3000,
          })
          emit('event-nuevo-auto', response.data)
          emit('cerrar-formulario')
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
    <form class="formulario">
      <div class="campo">
        <label for="marca">Marca:</label>
        <input id="marca" type="text" v-model="crearAuto.Marca" />
      </div>
      <div class="campo">
        <label for="modelo">Modelo:</label>
        <input id="modelo" type="text" v-model="crearAuto.Modelo" />
      </div>
      <div class="campo">
        <label for="anio">Año:</label>
        <input id="anio" type="text" v-model="crearAuto.Anio" />
      </div>
      <div class="campo">
        <label for="color">Color:</label>
        <input id="color" type="text" v-model="crearAuto.Color" />
      </div>
      <div class="campo">
        <label for="tipo">Tipo:</label>
        <select id="tipo" v-model="crearAuto.Tipo">
          <option value="Familiar">Familiar</option>
          <option value="Corporativo">Corporativo</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div class="campo">
        <label for="chasis">Chasis:</label>
        <input id="chasis" type="text" v-model="crearAuto.Chasis" />
      </div>
      <div class="campo">
        <label for="vin">Vin:</label>
        <input id="vin" type="text" v-model="crearAuto.Vin" />
      </div>
      <div class="campo">
        <label for="otrascaracteristicas">Otras Características:</label>
        <input id="otrascaracteristicas" type="text" v-model="crearAuto.OtrasCaracteristicas" />
      </div>
      <div class="campo">
        <label for="fechaingreso">Fecha de Ingreso:</label>
        <input id="fechaingreso" type="date" v-model="crearAuto.FechaIngreso" />
      </div>
      <div class="boton-registro">
        <button icon="pi pi-check" @click.prevent="enviarDatos">Registrar</button>
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
}

.campo {
  display: flex;
  flex-direction: column;
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
