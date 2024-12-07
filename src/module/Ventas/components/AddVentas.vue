<script setup lang="ts">
import axios from 'axios'
import { reactive } from 'vue'

// Emitir eventos
const emit = defineEmits(['event-nueva-venta', 'cerrar-formulario'])

// Datos reactivos para el formulario de ventas, clientes y autos
const nuevaVenta = reactive({
  Cliente: {
    nombre1: '',
    nombre2: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    cedulaIdentidad: '',
  },
  Auto: {
    marca: '',
    color: '',
    modelo: '',
    anio: '',
  },
  Costo: '',
  TiempoDeEntrega: '',
  Garantia: '',
})

// Enviar datos de cliente
const enviarCliente = async () => {
  try {
    const response = await axios.post('http://localhost:3005/clientes', nuevaVenta.Cliente)
    console.log('Cliente registrado:', response.data)
    nuevaVenta.Cliente = response.data // Si la base de datos devuelve el cliente registrado
  } catch (error) {
    console.error('Error al registrar cliente', error)
  }
}

// Enviar datos de auto
const enviarAuto = async () => {
  try {
    const response = await axios.post('http://localhost:3005/autos', nuevaVenta.Auto)
    console.log('Auto registrado:', response.data)
    nuevaVenta.Auto = response.data // Si la base de datos devuelve el auto registrado
  } catch (error) {
    console.error('Error al registrar auto', error)
  }
}

// Enviar datos de venta
const enviarVenta = async () => {
  try {
    const response = await axios.post('http://localhost:3005/ventas', nuevaVenta)
    console.log('Venta registrada:', response.data)
    emit('event-nueva-venta', response.data)
    emit('cerrar-formulario')
  } catch (error) {
    console.error('Error al registrar venta', error)
  }
}
</script>

<template>
  <h1>Formulario de Registro de Venta</h1>

  <!-- Registro de Cliente -->
  <div>
    <h2>Registrar Nuevo Cliente</h2>
    <div>
      <label for="nombre1">Primer Nombre:</label>
      <input id="nombre1" v-model="nuevaVenta.Cliente.nombre1" />
    </div>
    <div>
      <label for="nombre2">Segundo Nombre:</label>
      <input id="nombre2" v-model="nuevaVenta.Cliente.nombre2" />
    </div>
    <div>
      <label for="apellidoPaterno">Apellido Paterno:</label>
      <input id="apellidoPaterno" v-model="nuevaVenta.Cliente.apellidoPaterno" />
    </div>
    <div>
      <label for="apellidoMaterno">Apellido Materno:</label>
      <input id="apellidoMaterno" v-model="nuevaVenta.Cliente.apellidoMaterno" />
    </div>
    <div>
      <label for="cedulaIdentidad">Cédula de Identidad:</label>
      <input id="cedulaIdentidad" v-model="nuevaVenta.Cliente.cedulaIdentidad" />
    </div>
    <button @click="enviarCliente">Registrar Cliente</button>
  </div>

  <!-- Registro de Auto -->
  <div>
    <h2>Registrar Nuevo Auto</h2>
    <div>
      <label for="marca">Marca:</label>
      <input id="marca" v-model="nuevaVenta.Auto.marca" />
    </div>
    <div>
      <label for="color">Color:</label>
      <input id="color" v-model="nuevaVenta.Auto.color" />
    </div>
    <div>
      <label for="modelo">Modelo:</label>
      <input id="modelo" v-model="nuevaVenta.Auto.modelo" />
    </div>
    <div>
      <label for="anio">Año:</label>
      <input id="anio" v-model="nuevaVenta.Auto.anio" />
    </div>
    <button @click="enviarAuto">Registrar Auto</button>
  </div>

  <!-- Detalles de la Venta -->
  <div>
    <label for="costo">Costo de la Venta: </label>
    <input id="costo" type="text" v-model="nuevaVenta.Costo" />
  </div>
  <div>
    <label for="tiempoEntrega">Tiempo de Entrega: </label>
    <input id="tiempoEntrega" type="text" v-model="nuevaVenta.TiempoDeEntrega" />
  </div>
  <div>
    <label for="garantia">Garantía: </label>
    <input id="garantia" type="text" v-model="nuevaVenta.Garantia" />
  </div>

  <button @click="enviarVenta">Registrar Venta</button>
</template>
