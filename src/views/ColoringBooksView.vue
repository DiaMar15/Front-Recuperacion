<template>
  <v-container class="py-8" fluid>
    <v-card class="pa-6">
      <v-toolbar flat class="mb-4">
        <v-toolbar-title>Libros para Colorear</v-toolbar-title>
        <v-spacer />
        <v-btn color="primary" @click="abrirFormulario = true">
          <v-icon left>mdi-plus</v-icon>
          Nuevo libro
        </v-btn>
      </v-toolbar>

      <v-row class="mb-4" dense>
        <v-col cols="12" md="3">
          <v-select
            v-model="filters.categoria"
            :items="categoriasDisponibles"
            label="Categoría"
            clearable
            dense
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="filters.autor"
            :items="autoresDisponibles"
            label="Autor"
            clearable
            dense
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="filters.activo"
            :items="[
              { text: 'Activo', value: true },
              { text: 'Inactivo', value: false },
            ]"
            item-title="text"
            item-value="value"
            label="Estado"
            clearable
            dense
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model.number="filters.min_popularidad"
            label="Popularidad mínima"
            type="number"
            dense
            clearable
            min="0"
          />
        </v-col>

        <v-col cols="12" class="text-right">
          <v-btn color="primary" @click="loadBooks">Filtrar</v-btn>
          <v-btn color="secondary" @click="limpiarFiltros" class="ml-2">Limpiar</v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="booksOrdenados"
        item-value="id"
        class="elevation-1"
      >
        <template #item.titulo="{ item }">
          <span
            class="text-primary font-weight-bold cursor-pointer"
            @click="abrirModal(item)"
          >
            {{ item.titulo }}
          </span>
          <v-icon v-if="item.destacado" color="yellow darken-3" class="ml-1">mdi-star</v-icon>
        </template>

        <template #item.activo="{ item }">
          <v-icon :color="item.activo ? 'green' : 'red'">
            {{ item.activo ? 'mdi-check-circle' : 'mdi-close-circle' }}
          </v-icon>
        </template>

        <template #item.actions="{ item }">
          <v-btn icon @click="editarLibro(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="eliminarLibro(item.id)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal de descripción -->
    <v-dialog v-model="modalVisible" max-width="600px">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">
          {{ libroSeleccionado?.titulo }}
        </v-card-title>
        <v-card-text>
          {{ libroSeleccionado?.descripcion }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="modalVisible = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de formulario -->
    <v-dialog v-model="abrirFormulario" max-width="800px" persistent>
      <ColoringBookForm @creado="onLibroCreado" />
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import coloringBookService from '@/services/coloringBookService'
import ColoringBookForm from '@/components/ColoringBookForm.vue'

const books = ref<any[]>([])
const filters = ref({
  categoria: null,
  autor: null,
  activo: null,
  min_popularidad: null,
})

const libroSeleccionado = ref<any>(null)
const modalVisible = ref(false)
const abrirFormulario = ref(false)

const headers = [
  { title: 'Título', key: 'titulo' },
  { title: 'Autor', key: 'autor' },
  { title: 'Categoría', key: 'categoria' },
  { title: 'Precio', key: 'precio' },
  { title: 'Popularidad', key: 'popularidad' },
  { title: 'Activo', key: 'activo' },
  { title: 'Acciones', key: 'actions', sortable: false },
]

const loadBooks = async () => {
  try {
    const filtros = { ...filters.value }
    if (filtros.min_popularidad !== null) {
      filtros.min_popularidad = filtros.min_popularidad.toString()
    }
    const result = await coloringBookService.list(filtros)
    books.value = result
  } catch (error: any) {
    alert(error.message || 'Error al cargar libros')
  }
}

const limpiarFiltros = () => {
  filters.value = {
    categoria: null,
    autor: null,
    activo: null,
    min_popularidad: null,
  }
  loadBooks()
}

const abrirModal = (libro: any) => {
  libroSeleccionado.value = libro
  modalVisible.value = true
}

const editarLibro = (libro: any) => {
  alert(`Editar libro ID: ${libro.id} - Función no implementada`)
}

const eliminarLibro = async (id: number) => {
  if (confirm('¿Estás seguro de eliminar este libro?')) {
    try {
      await coloringBookService.delete(id)
      await loadBooks()
    } catch (error: any) {
      alert(error.message || 'Error al eliminar libro')
    }
  }
}

const onLibroCreado = () => {
  abrirFormulario.value = false
  loadBooks()
}

const categoriasDisponibles = computed(() => {
  const cats = books.value.map((b) => b.categoria)
  return [...new Set(cats)].filter(Boolean).sort()
})

const autoresDisponibles = computed(() => {
  const auts = books.value.map((b) => b.autor)
  return [...new Set(auts)].filter(Boolean).sort()
})

const booksOrdenados = computed(() =>
  [...books.value].sort((a, b) => {
    if (b.destacado && !a.destacado) return 1
    if (a.destacado && !b.destacado) return -1
    return 0
  })
)

onMounted(loadBooks)
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
