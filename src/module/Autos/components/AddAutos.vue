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
    header: 'Confirmar',
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
    <div>
      <label for="marca">Marca:</label>
      <input id="marca" type="text" v-model="crearAuto.Marca" />
    </div>
    <div>
      <label for="modelo">Modelo:</label>
      <input id="modelo" type="text" v-model="crearAuto.Modelo" />
    </div>
    <div>
      <label for="anio">Año:</label>
      <input id="anio" type="text" v-model="crearAuto.Anio" />
    </div>
    <div>
      <label for="color">Color:</label>
      <input id="color" type="text" v-model="crearAuto.Color" />
    </div>
    <div>
      <label for="tipo">Tipo:</label>
      <select id="tipo" v-model="crearAuto.Tipo">
        <option value="Familiar">Familiar</option>
        <option value="Corporativo">Corporativo</option>
        <option value="Otro">Otro</option>
      </select>
    </div>
    <div>
      <label for="chasis">Chasis:</label>
      <input id="chasis" type="text" v-model="crearAuto.Chasis" />
    </div>
    <div>
      <label for="vin">Vin:</label>
      <input id="vin" type="text" v-model="crearAuto.Vin" />
    </div>
    <div>
      <label for="otrascaracteristicas">Otras Características:</label>
      <input id="otrascaracteristicas" type="text" v-model="crearAuto.OtrasCaracteristicas" />
    </div>
    <div>
      <label for="fechaingreso">Fecha de Ingreso:</label>
      <input id="fechaingreso" type="date" v-model="crearAuto.FechaIngreso" />
    </div>
    <div class="flex justify-end gap-2">
      <button @click="visible = false">Cancelar</button>
      <button @click="enviarDatos">Registrar</button>
    </div>
  </Dialog>
</template>
