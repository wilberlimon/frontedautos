<script setup lang="ts">
import axios from 'axios'
import { reactive, ref } from 'vue'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import SelectAuto from './SelectAuto.vue'
import SelectCliente from './SelectCliente.vue'

const toast = useToast()
const visible = ref(false)

const abrirDialog = () => {
  visible.value = true
}

const emit = defineEmits(['event-nueva-venta', 'cerrar-formulario'])
const crearVenta = reactive({
  FechaVenta: null,
  Cliente: '',
  Autos: '',
  Costo: null,
  TiempoDeEntrega: null,
  Garantia: null,
})

const confirm = useConfirm()
const enviarDatos = () => {
  confirm.require({
    message: '¿Está seguro de registrar el Auto?',
    header: 'Confirmar Registro',
    icon: 'pi pi-info-circle',
    accept: () => {
      axios
        .post('http://localhost:3005/ventas/registrar', crearVenta)
        .then((response) => {
          toast.add({
            severity: 'success',
            summary: 'Info',
            detail: 'Venta Creada Exitosamente',
            life: 3000,
          })
          emit('event-nueva-venta', response.data)
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

  <!-- Dialog para la edición -->
  <button @click="abrirDialog">Nuevo Registro</button>

  <Dialog
    v-model:visible="visible"
    modal
    header="Formulario de Registro"
    :style="{ width: '45rem' }"
  >
    <div>
      <label for="fechaventa">Fecha de Venta:</label>
      <input id="fechaventa" type="date" v-model="crearVenta.FechaVenta" />
    </div>

    <!-- datoscliente -->
    <SelectCliente v-model="crearVenta.Cliente"> </SelectCliente>
    <!-- datosAuto -->
    <SelectAuto v-model="crearVenta.Autos"> </SelectAuto>
    <div>
      <label for="costo">Costo:</label>
      <input id="costo" type="text" v-model="crearVenta.Costo" />
    </div>
    <div>
      <label for="tiempo_entrega">Tiempo de Entrega:</label>
      <input id="tiempo_entrega" type="text" v-model="crearVenta.TiempoDeEntrega" />
    </div>
    <div>
      <label for="garantia">Garantia:</label>
      <input id="garantia" type="text" v-model="crearVenta.Garantia" />
    </div>

    <div class="boton-registro">
      <button icon="pi pi-check" @click="enviarDatos">Registrar</button>
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
