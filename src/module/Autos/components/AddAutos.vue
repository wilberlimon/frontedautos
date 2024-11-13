<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'


const datosACrear = reactive({
  Marca: '',
  Modelo: '',
  Año: '',
  Color: '',
  Estado: '',
  Placa: '',
})

const enviarDatos = () => {
  //2 segundos
  setTimeout(() => {
    axios
      .post('http://127.0.0.1:3005/autos', datosACrear)
      .then((response) => {
        console.log('Datos de respuesta', response.data);
      })
      .catch((err) => {
        console.log('ocurrio un error');
        console.log(err);
      })
  }, 2000)
}

</script>

<template>
  <h1>Formulario de Registro</h1>
  <div>
    <label for="marca">Marca: </label>
    <input id="marca" type="text" v-model="datosACrear.Marca" />
  </div>

  <div>
    <label for="modelo">Modelo: </label>
    <input id="modelo" type="text" v-model="datosACrear.Modelo" />
  </div>

  <div>
    <label for="año">Año: </label>
    <input id="año" type="text" v-model="datosACrear.Año" />
  </div>

  <div>
    <label for="color">Color: </label>
    <input id="color" type="text" v-model="datosACrear.Color" />
  </div>

  <div>
    <label for="modelo">Estado: </label>
    <select v-model="datosACrear.Estado">
      <option value="N">Nuevo</option>
      <option value="U">Usado</option>
    </select>
  </div>

  <div>
    <label for="placa">Placa: </label>
    <input id="placa" type="text" v-model="datosACrear.Placa">
  </div>

  <button class="btn-registrar" @click="enviarDatos">Registrar</button>
  <hr class="linea-divisor">
</template>

<style>
.btn-registrar {
  width: 100%;
  background-color: green;
  color: white;
}
</style>
