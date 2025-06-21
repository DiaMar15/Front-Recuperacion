<script setup lang="ts">
import { authSetStore } from '../stores/AuthStore'
import { ref } from 'vue'

const authStore = authSetStore()
const email = ref('')
const password = ref('')

const handlerLogin = () => {
  if (!email.value || !password.value) {
    alert('todos los campos son necesarios.')
    return
  } else {
    authStore.login({
      email: email.value,
      password: password.value,
    })
  }
}
</script>

<template>
  <div class="container">
    <div class="form-container">
      <h1>Ingresar</h1>
      <form @submit.prevent="handlerLogin">
        <input type="text" v-model="email" id="email" name="email" placeholder="email"/>
        <input type="password" v-model="password" placeholder="Contraseña" />
        <button type="submit">Iniciar sesion</button>

        <p><Router-link to="/Restore">¿Has olvidado tu contraseña?</Router-link></p>
        <p><Router-link to="/Register">Regístrate ahora</Router-link></p>
      </form>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  width: 400px;
  padding: 40px;
  background: #fafafa;
  border-radius: 10px;
}

h1 {
  text-align: center;
  color: black;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  background-color: #fafafa;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 12px;
}

button {
  background: #1538ff;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
}

p {
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
}

button:hover {
  background-color: #ff651e;
}
</style>
