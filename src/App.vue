<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const mostrarMenu = ref(false) // Controla la visibilidad del menú lateral en pantallas pequeñas

// Alterna la visibilidad del menú lateral
const toggleMenu = () => {
  mostrarMenu.value = !mostrarMenu.value
}

// Navegar a una ruta específica
const goRoute = (route: string) => {
  router.push(route)
}
</script>

<template>
  <div class="contenedor">
    <div class="contenido">
      <!-- Línea lateral con íconos para abrir/cerrar el menú -->
      <div class="menu-linea">
        <span v-if="!mostrarMenu" @click="toggleMenu">☰</span>
        <span v-else @click="toggleMenu">✖</span>
      </div>

      <!-- Menú lateral -->
      <div :class="['panel-menu', { 'menu-abierto': mostrarMenu }]">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="logo-imagen" />
        </div>
        <button class="menu-button" :class="{ active: route.path === '/' }" @click="goRoute('/')">
          INICIO
        </button>
        <button
          class="menu-button"
          :class="{ active: route.path === '/list-autos' }"
          @click="goRoute('/list-autos')"
        >
          AUTOS
        </button>
        <button
          class="menu-button"
          :class="{ active: route.path === '/list-clientes' }"
          @click="goRoute('/list-clientes')"
        >
          CLIENTES
        </button>
        <button
          class="menu-button"
          :class="{ active: route.path === '/list-ventas' }"
          @click="goRoute('/list-ventas')"
        >
          VENTAS
        </button>
        <button
          class="menu-button"
          :class="{ active: route.path === '/reportes' }"
          @click="goRoute('/reportes')"
        >
          REPORTES
        </button>
      </div>

      <!-- Contenido principal -->
      <div class="panel-data">
        <RouterView />
      </div>
    </div>

    <!-- Footer -->
    <footer>
      <p>© ITEC2024 - Todos los derechos reservados</p>
    </footer>
  </div>
</template>

<style scoped>
/* Estilos generales */
.contenedor {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.contenido {
  display: flex;
  flex: 1;
  position: relative;
}

.panel-menu {
  background-color: #065813;
  width: 20%;
  min-width: 200px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
}

.panel-menu.menu-abierto {
  transform: translateX(0);
}

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

.menu-button:hover,
.menu-button.active {
  background-color: white;
  color: #065813;
}

.panel-data {
  margin-left: 20%;
  width: 80%;
  padding: 2rem;
  height: calc(100vh - 50px);
  overflow-y: auto;
  transition:
    margin-left 0.3s ease-in-out,
    width 0.3s ease-in-out;
}

/* Línea lateral con íconos para abrir/cerrar el menú */
.menu-linea {
  display: none;
  width: 30px;
  height: 100%;
  background-color: #065813;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1100;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.menu-linea span {
  color: white;
  font-size: 24px;
  margin: 10px 0;
  transform: rotate(0deg);
  transition: transform 0.3s ease-in-out;
}

.menu-linea span:hover {
  transform: scale(1.2);
}

/* Footer */
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
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .panel-menu {
    transform: translateX(-100%);
    width: 200px;
  }

  .panel-menu.menu-abierto {
    transform: translateX(0);
  }

  .panel-data {
    margin-left: 0;
    width: 100%;
  }

  .menu-linea {
    display: flex;
  }
}

/* Estilos para pantallas grandes */
@media (min-width: 769px) {
  .panel-menu {
    transform: translateX(0);
  }

  .menu-linea {
    display: none;
  }
}
</style>
