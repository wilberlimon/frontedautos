<script setup lang="ts">
// Importar la imagen desde el directorio `assets`
import defaultImage from '@/assets/img.png';
import { ref } from 'vue';

const selectedImage = ref<string>(defaultImage);

</script>

<template>
  <div style="text-align: center; margin-top: 50px;">
    <h1>Sistema de Autos</h1>
    <div style="margin-top: 20px;">
      <img :src="selectedImage" alt="Imagen subida" style="max-width: 400px; border: 1px solid #ddd;" />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 4rem;
  color: #065813;
}

input[type="file"] {
  margin-top: 20px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
