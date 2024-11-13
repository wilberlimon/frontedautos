<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const listaAutos = ref([])
// tiene tiempo de retardo
setTimeout(() => {
  axios.get('http://127.0.0.1:3005/autos').then((response) => {
    listaAutos.value = response.data
  })
}, 4000)

</script>

<template>
  <h1>Listado de Autos</h1>
  <div class="lado-derecho">
    <button @click="mostrarFormulario">Nuevo Registro</button>
  </div>
  <AddAutos v-if="verFormulario" /> <!-- Ahora debería mostrarse correctamente -->

  <div v-if="listaAutos.length > 0">
    <table border="1">
      <tr>
        <td>Nro</td>
        <td>Marca</td>
        <td>Modelo</td>
        <td>Año</td>
        <td>Color</td>
        <td>Placa</td>
        <td>Acciones</td>
      </tr>
      <tr v-for="(auto, index) in listaAutos" :key="auto._id">
        <td>{{ index + 1 }}</td>
        <td>{{ auto.Marca }}</td>
        <td>{{ auto.Modelo }}</td>
        <td>{{ auto.Año }}</td>
        <td>{{ auto.Color }}</td>
        <td>{{ auto.Placa }}</td>
        <td>
          <button>Editar</button>
          <button>Eliminar</button>
          <button>Detalle</button>
        </td>
      </tr>
    </table>
  </div>
  <div v-else>cargando datos.....</div>
</template>

<style>
.lado-derecho {
  float: right;
  margin: 1.5rem;
}
</style>
