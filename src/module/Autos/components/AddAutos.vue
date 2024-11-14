<script setup lang="ts">
import { reactive, defineEmits } from 'vue'
import axios from 'axios'

const emit = defineEmits(['event-nuevo-auto', 'cerrar-formulario'])
const datosACrear = reactive({
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

const enviarDatos = () => {
  //500 milisegundos
  setTimeout(() => {
    axios
      .post('http://127.0.0.1:3005/autos', datosACrear)
      .then((response) => {
        console.log('Datos de respuesta', response.data)
        emit('event-nuevo-auto')
        emit('cerrar-formulario')
      })
      .catch((err) => {
        console.log('ocurrio un error');
        console.log(err);
      })
  }, 500)
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
    <label for="anio">Año: </label>
    <input id="anio" type="text" v-model="datosACrear.Anio" />
  </div>

  <div>
    <label for="color">Color: </label>
    <input id="color" type="text" v-model="datosACrear.Color" />
  </div>

  <div>
    <label for="tipo">Tipo: </label>
    <select v-model="datosACrear.Tipo">
      <option value="Berlina">Berlina</option>
      <option value="Familiar">Familiar</option>
      <option value="Descapotable">Descapotable</option>
      <option value="Multiuso">Multiuso</option>
      <option value="Camioneta">Camioneta</option>
    </select>
  </div>

  <div>
    <label for="chasis">Chasis: </label>
    <input id="chasis" type="text" v-model="datosACrear.Chasis" />
  </div>

  <div>
    <label for="vin">Vin: </label>
    <input id="vin" type="text" v-model="datosACrear.Vin" />
  </div>

  <div>
    <label for="fechaingreso">Fecha de Ingreso:</label>
    <input id="fechaingreso" type="date" v-model="datosACrear.FechaIngreso" />
  </div>

  <div>
    <label for="otrascaracteristicas">Otras Características: </label>
    <textarea id="otrascaracteristicas" v-model="datosACrear.OtrasCaracteristicas"></textarea>
  </div>

  <button class="btn-registrar" @click="enviarDatos">Registrar</button>
  <hr class="linea-divisor">
</template>

<style>
/* Contenedor de formulario */
div {
  margin-bottom: 1rem;
}

/* Estilos para los labels */
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

/* Estilos para las cajas de texto, select y date */
input[type="text"],
input[type="date"],
select,
textarea {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
  /* Permite redimensionar verticalmente el textarea */
}

/* Estilos para el botón de registro */
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
  background-color: #065813;
  /* Verde más oscuro al pasar el cursor */
}

.linea-divisor {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-top: 3px solid #065813;
}
</style>
