<template>
  <v-container>
    <!-- FILTRO DE BÚSQUEDA -->
    <v-text-field
      v-model="search"
      label="Buscar por título"
      append-inner-icon="mdi-magnify"
      class="mb-4"
      clearable
    />

    <!-- LIBROS ACTIVOS -->
    <v-card class="mb-4">
      <v-card-title>
        <span class="text-h6">Libros Activos</span>
        <v-spacer />
        <v-btn color="primary" @click="openDialog()">Agregar Libro</v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="filteredActivos"
        item-value="titulo"
        class="elevation-1"
        no-data-text="No hay libros activos"
      >
        <template #item.destacado="{ item }">
          <v-icon color="amber" v-if="item.destacado === 1">mdi-star</v-icon>
          <v-icon v-else color="grey">mdi-star-outline</v-icon>
        </template>
        <template #item.acciones="{ item }">
          <v-btn icon="mdi-pencil" @click="openDialog(item)" color="primary" />
          <v-btn icon="mdi-delete" @click="softDelete(item)" color="error" />
        </template>
      </v-data-table>
    </v-card>

    <!-- LIBROS INACTIVOS -->
    <v-card class="mb-4">
      <v-card-title>
        <span class="text-h6">Libros Inactivos</span>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="filteredInactivos"
        item-value="titulo"
        class="elevation-1"
        no-data-text="No hay libros inactivos"
      >
        <template #item.destacado="{ item }">
          <v-icon color="amber" v-if="item.destacado === 1">mdi-star</v-icon>
          <v-icon v-else color="grey">mdi-star-outline</v-icon>
        </template>
        <template #item.acciones="{ item }">
          <v-btn icon="mdi-backup-restore" @click="restore(item)" color="success" />
          <v-btn icon="mdi-delete-forever" @click="permanentDelete(item)" color="error" />
        </template>
      </v-data-table>
    </v-card>

    <!-- FORMULARIO -->
    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
        <v-card-title>{{ form.id ? 'Editar Libro' : 'Agregar Libro' }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.titulo" label="Título" :rules="[v => !!v || 'Título requerido']" />
          <v-text-field v-model="form.autor" label="Autor" :rules="[v => !!v || 'Autor requerido']" />
          <v-text-field v-model="form.categoria" label="Categoría" :rules="[v => !!v || 'Categoría requerida']" />
          <v-textarea v-model="form.descripcion" label="Descripción" :rules="[v => v.length >= 10 || 'Mínimo 10 caracteres']" />
          <v-text-field v-model="form.precio" label="Precio" type="number" :rules="[v => v > 0 || 'Debe ser mayor que 0']" />
          <v-text-field v-model="form.cantidadPaginas" label="Cantidad de Páginas" type="number" :rules="[v => v > 0 || 'Debe ser mayor que 0']" />
          <v-text-field v-model="form.popularidad" label="Popularidad" type="number" :rules="[v => v >= 0 || 'Debe ser 0 o más']" />
          <v-select
            v-model="form.pageRangeId"
            :items="pageRanges"
            item-title="nombre"
            item-value="id"
            label="Rango de Páginas"
            :return-object="false"
          />
          <v-switch v-model="form.destacado" label="¿Destacado?" :true-value="1" :false-value="0" />
          <v-switch v-model="form.activo" label="¿Activo?" :true-value="1" :false-value="0" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="save">Guardar</v-btn>
          <v-btn @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- SNACKBAR -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ColoringBookService from '@/services/ColoringBookService'
import PageRangeService from '@/services/PageRangeService'

const search = ref('')
const activos = ref([])
const inactivos = ref([])
const pageRanges = ref([])
const dialog = ref(false)
const snackbar = ref({ show: false, text: '', color: 'success' })

const form = ref({
  id: null,
  titulo: '',
  autor: '',
  categoria: '',
  descripcion: '',
  precio: '',
  cantidadPaginas: '',
  popularidad: '',
  pageRangeId: null,
  destacado: 0,
  activo: 1,
})

const headers = [
  { text: 'Título', value: 'titulo' },
  { text: 'Autor', value: 'autor' },
  { text: 'Categoría', value: 'categoria' },
  { text: 'Descripción', value: 'descripcion' },
  { text: 'Precio', value: 'precio' },
  { text: 'Páginas', value: 'cantidadPaginas' },
  { text: 'Popularidad', value: 'popularidad' },
  { text: 'Destacado', value: 'destacado' },
  { text: 'Activo', value: 'activo' },
  { text: 'Acciones', value: 'acciones', sortable: false },
]

const filteredActivos = computed(() =>
  activos.value.filter((b) =>
    b.titulo.toLowerCase().includes(search.value.toLowerCase())
  )
)

const filteredInactivos = computed(() =>
  inactivos.value.filter((b) =>
    b.titulo.toLowerCase().includes(search.value.toLowerCase())
  )
)

function showSnackbar(msg, color = 'success') {
  snackbar.value = { show: true, text: msg, color }
}

async function loadBooks() {
  try {
    const data = await ColoringBookService.list()
    activos.value = data.filter((b) => b.activo === 1)
    inactivos.value = data.filter((b) => b.activo === 0)
  } catch {
    showSnackbar('Error al cargar libros', 'error')
  }
}

async function loadPageRanges() {
  try {
    pageRanges.value = await PageRangeService.list()
  } catch {
    showSnackbar('Error al cargar rangos de páginas', 'error')
  }
}

function openDialog(book = null) {
  if (book) {
    form.value = { ...book }
  } else {
    form.value = {
      id: null,
      titulo: '',
      autor: '',
      categoria: '',
      descripcion: '',
      precio: '',
      cantidadPaginas: '',
      popularidad: '',
      pageRangeId: null,
      destacado: 0,
      activo: 1,
    }
  }
  dialog.value = true
}

function closeDialog() {
  dialog.value = false
}

async function save() {
  try {
    const payload = {
      ...form.value,
      cantidadPaginas: parseInt(form.value.cantidadPaginas),
      precio: parseFloat(form.value.precio),
      popularidad: parseInt(form.value.popularidad),
      activo: parseInt(form.value.activo),
      destacado: typeof form.value.destacado === 'string'
        ? parseInt(form.value.destacado)
        : form.value.destacado,
      pageRangeId: form.value.pageRangeId ?? null,
    }

    if (form.value.id) {
      await ColoringBookService.updatePatch(form.value.id, payload)
      showSnackbar('Libro actualizado')
    } else {
      await ColoringBookService.create(payload)
      showSnackbar('Libro creado')
    }

    closeDialog()
    await loadBooks()
  } catch (err) {
    showSnackbar(err.message || 'Error al guardar', 'error')
  }
}

async function softDelete(book) {
  try {
    await ColoringBookService.updatePatch(book.id, { activo: 0 })
    showSnackbar('Libro desactivado')
    await loadBooks()
  } catch {
    showSnackbar('Error al desactivar libro', 'error')
  }
}

async function restore(book) {
  try {
    await ColoringBookService.updatePatch(book.id, { activo: 1 })
    showSnackbar('Libro restaurado')
    await loadBooks()
  } catch {
    showSnackbar('Error al restaurar libro', 'error')
  }
}

async function permanentDelete(book) {
  try {
    await ColoringBookService.delete(book.id)
    showSnackbar('Libro eliminado definitivamente')
    await loadBooks()
  } catch {
    showSnackbar('Error al eliminar definitivamente', 'error')
  }
}

onMounted(() => {
  loadBooks()
  loadPageRanges()
})
</script>
