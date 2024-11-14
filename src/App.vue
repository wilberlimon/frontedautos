<script setup lang="ts">
import ListarAutos from './module/Autos/ListarAutos.vue'
</script>

<template>
  <div class="contenedor">
    <header class="header">header</header>
    <div class="contenido">
      <div class="panel-menu">asdafd</div>
      <div class="panel-data">
        <ListarAutos />
      </div>
    </div>
    <div class="panel-derecho"></div>
    <footer>footeer</footer>
  </div>
</template>

<style scoped>
.contenedor {
  width: 100%;
}

.header {
  background-color: red;
  height: 50px;
  width: 100%;
}

.panel-menu {
  background-color: violet;
  height: 100vh;
  width: 20%;
}

.contenido {
  background-color: yellow;
  height: 100vh;
  display: flex;
}

.panel-data {
  height: 100vh;
  width: 80%;
  margin-left: 2rem;
  margin-right: 2rem;
}

footer {
  background-color: turquoise;

}
</style>
