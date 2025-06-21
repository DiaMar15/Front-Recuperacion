<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from './layouts/AuthLayout.vue'
import WireframeLayout from './layouts/WireframeLayout.vue'

const route = useRoute()
const layouts = { AuthLayout, WireframeLayout }
const layout = computed(() => layouts[route.meta.layout] || AuthLayout)
</script>
