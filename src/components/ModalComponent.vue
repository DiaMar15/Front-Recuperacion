<template>
  <v-dialog v-model="internalDialog" max-width="400" persistent>
    <v-card>
      <v-card-title class="text-h6">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="cancel">Cancelar</v-btn>
        <v-btn color="primary" text @click="confirm">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
  message?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

// ✅ Ref local controlado por v-model
const internalDialog = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  internalDialog.value = newVal
})

watch(internalDialog, (newVal) => {
  emit('update:modelValue', newVal)
})

function cancel() {
  internalDialog.value = false
  emit('cancel')
}

function confirm() {
  internalDialog.value = false
  emit('confirm')
}
</script>
