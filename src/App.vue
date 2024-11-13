<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

  </header>
  <div>
    <!-- <RouterView /> -->
    <table border="1">
      <th>Nro</th>
      <th>Marca</th>
      <th>Modelo</th>
      <th>Año</th>
      <th>Color</th>
      <th>Placa</th>
      <tr>
        <td>1</td>
        <td>Toyota</td>
        <td>Corolla</td>
        <td>2022</td>
        <td>Blanco</td>
        <td>ABC-123</td>
      </tr>
      <tr>
        <td>Nro</td>
        <td>Toyota</td>
        <td>Corolla</td>
        <td>2022</td>
        <td>Blanco</td>
        <td>ABC-123</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
