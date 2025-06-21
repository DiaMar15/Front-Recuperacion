<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    app
    style="background-color: #333333; color: white"
  >

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        title="Dashboard"
        to="/dashboard"
        exact
        link
      />
      <v-list-item
        prepend-icon="mdi-clipboard-list"
        title="coloring-books"
        to="/coloring-books"
        exact
        link
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts"></script>
