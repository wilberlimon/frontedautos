<script setup lang="ts">
import ListarAutos from './module/Autos/ListarAutos.vue'
</script>

<template>
  <div class="contenedor">
    <div class="contenido">
      <div class="panel-menu">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="logo-imagen" />
        </div>
        <button class="menu-button">AUTOS</button>
        <button class="menu-button">CLIENTES</button>
        <button class="menu-button">VENTAS</button>
        <button class="menu-button">REPORTES</button>
      </div>
      <div class="panel-data">
        <ListarAutos />
      </div>
    </div>
    <footer>
      <p>© ITEC2024 - Todos los derechos reservados</p>
    </footer>
  </div>
</template>

<style scoped>
/* Estilos del logo */
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.logo-imagen {
  width: 150px;
  height: auto;
  object-fit: contain;
}

.contenedor {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.contenido {
  display: flex;
  flex: 1;
}

.panel-menu {
  background-color: #065813;
  width: 20%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.panel-data {
  margin-left: 20%;
  width: 80%;
  padding: 2rem;
  height: calc(100vh - 50px);
  /* Calcula el espacio debajo del footer */
  overflow-y: auto;
}

.menu-button {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #065813;
  border: none;
  text-align: center;
  cursor: pointer;
}

.menu-button:hover {
  background-color: white;
  color: #065813;
}

footer {
  height: 50px;
  width: 100%;
  color: black;
  font-weight: bolder;
  background-color: white;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  margin-left: 20%;
}
</style>
