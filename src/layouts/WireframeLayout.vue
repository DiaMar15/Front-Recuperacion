<script setup lang="ts">
import SidebarWireframeComponent from '@/components/SidebarWireframeComponent.vue';
import HeaderWireframeComponent from '@/components/HeaderWireframeComponent.vue';
</script>

<template>
  <v-app>
    <HeaderWireframeComponent />
    <SidebarWireframeComponent />

      <!-- Contenido principal -->
      <v-main>
          <router-view />
      </v-main>

  </v-app>
</template>

