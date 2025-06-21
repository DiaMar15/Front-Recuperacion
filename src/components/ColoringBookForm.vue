<template>
  <v-card class="pa-6">
    <v-form ref="formRef" v-model="formIsValid">
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            label="Título"
            v-model="form.titulo"
            :rules="[rules.required, rules.min2]"
            clearable
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="Autor"
            v-model="form.autor"
            :rules="[rules.required, rules.min2]"
            clearable
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="Categoría"
            v-model="form.categoria"
            :rules="[rules.required, rules.min2]"
            clearable
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="Precio"
            v-model.number="form.precio"
            type="number"
            :rules="[rules.required, rules.positive]"
            clearable
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="Popularidad"
            v-model.number="form.popularidad"
            type="number"
            :rules="[rules.required, rules.positive]"
            clearable
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="Cantidad de páginas"
            v-model.number="form.cantidadPaginas"
            type="number"
            :rules="[rules.required, rules.positive]"
            clearable
          />
        </v-col>

        <v-col cols="12">
          <v-textarea
            label="Descripción"
            v-model="form.descripcion"
            :rules="[rules.required, rules.min10]"
            clearable
            auto-grow
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-switch
            v-model="form.activo"
            label="¿Activo?"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-switch
            v-model="form.destacado"
            label="¿Libro destacado?"
          />
        </v-col>

        <v-col cols="12" class="text-right">
          <v-btn color="primary" @click="handleSubmit">Guardar</v-btn>
          <v-btn class="ml-2" @click="cancelar">Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" color="orange" timeout="3000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import coloringBookService from '@/services/coloringBookService'

const router = useRouter()
const formRef = ref()
const formIsValid = ref(true)

const snackbar = ref(false)
const snackbarMessage = ref('')

const form = ref({
  titulo: '',
  autor: '',
  categoria: '',
  descripcion: '',
  precio: null,
  popularidad: null,
  cantidadPaginas: null,
  activo: true,
  destacado: false,
})

const rules = {
  required: (v: any) => !!v || 'Este campo es obligatorio',
  min2: (v: string) => v.length >= 2 || 'Debe tener al menos 2 caracteres',
  min10: (v: string) => v.length >= 10 || 'Debe tener al menos 10 caracteres',
  positive: (v: number) => v > 0 || 'Debe ser un número positivo',
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return

  try {
    await coloringBookService.create(form.value)
    alert('Libro creado exitosamente')
    router.push('/coloring-books')
  } catch (error: any) {
    alert(error.message || 'Error al crear el libro')
  }
}

const cancelar = () => {
  snackbarMessage.value = 'Creación cancelada'
  snackbar.value = true
  setTimeout(() => {
    router.push('/coloring-books')
  }, 300) // pequeño retardo para mostrar el snackbar antes de redirigir
}
</script>
