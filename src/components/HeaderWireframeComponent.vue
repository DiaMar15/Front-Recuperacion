<template>
  <v-app-bar
    app
    flat
    style="background-color: #333333; color: white"
    density="default"
  > <!-- el density da el tamaño de header (prominent > default> comfortable > compact)-->
    <TopFooterComponent class="d-none d-md-flex" />

    <div class="d-flex align-center gap-4">
      <v-btn class="logout-button" color="error" @click="logout" size="small" variant="flat">
        Cerrar sesión
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { authSetStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router'
import TopFooterComponent from '@/components/TopFooterComponent.vue'

const authStore = authSetStore();
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
  .logout-button {
    margin-right: 1rem;
  }
</style>
