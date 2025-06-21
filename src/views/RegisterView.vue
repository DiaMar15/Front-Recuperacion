<template>
  <div class="container">
    <div class="form-container">
      <h1>Encuentra tu cuenta</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Nueva contraseña" />
        <input type="password" placeholder="Nueva contraseña" />

        <button type="button">Restablecer contraseña</button>

        <p><Router-link to="/Login">¿Recuerdas tu contraseña?</Router-link></p>
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
}
</style>
