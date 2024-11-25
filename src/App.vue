<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter();
//import ListarAutos from './module/Autos/ListarAutos.vue';

const mostrarMenu = ref(false); // Controla la visibilidad del menú lateral en pantallas pequeñas
const goRoute = (route: string) => {
  router.push(route);
}

// Alterna la visibilidad del menú lateral
const toggleMenu = () => {
  mostrarMenu.value = !mostrarMenu.value;
};
</script>

<template>
  <div class="contenedor">
    <div class="contenido">
      <!-- Botón para mostrar/ocultar el menú lateral (solo para pantallas pequeñas) -->
      <button class="menu-toggle" @click="toggleMenu">
        <span v-if="!mostrarMenu">☰</span>
        <span v-else>✖</span>
      </button>

      <!-- Menú lateral -->
      <div :class="['panel-menu', { 'menu-abierto': mostrarMenu }]">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="logo-imagen" />
        </div>
        <button class="menu-button" @click="goRoute('/')">INICIO</button>
        <button class="menu-button" @click="goRoute('/list-autos')">AUTOS</button>
        <button class="menu-button" @click="goRoute('/list-clientes')">CLIENTES</button>
        <button class="menu-button">VENTAS</button>
        <button class="menu-button">REPORTES</button>
      </div>

      <!-- Contenido principal -->
      <div class="panel-data">
        <RouterView />
        <!-- <ListarAutos /> -->
      </div>
    </div>

    <!-- Footer -->
    <footer>
      <p>© ITEC2024 - Todos los derechos reservados</p>
    </footer>
  </div>
</template>

<style scoped>
/* Contenedor principal */
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

/* Menú lateral */
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

.menu-button:hover {
  background-color: white;
  color: #065813;
}

/* Contenido principal */
.panel-data {
  margin-left: 20%;
  width: 80%;
  padding: 2rem;
  height: calc(100vh - 50px);
  overflow-y: auto;
  transition: margin-left 0.3s ease-in-out, width 0.3s ease-in-out;
}

/* Botón para alternar el menú */
.menu-toggle {
  display: none;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1100;
  background-color: #065813;
  color: white;
  font-size: 24px;
  padding: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.menu-toggle:hover {
  background-color: white;
  color: #065813;
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

  .menu-toggle {
    display: block;
  }

  .logo {
    display: none;
  }
}

/* Estilos para pantallas grandes y tablets */
@media (min-width: 769px) {
  .panel-menu {
    transform: translateX(0);
  }

  .menu-toggle {
    display: none;
  }
}
</style>
