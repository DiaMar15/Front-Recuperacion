<template>
  <footer>
    <div class="links">
      <a href="#">Términos</a>
      <a href="#">Privacidad</a>
      <a href="#">Contacto con soporte</a>
      <a href="#">Manage cookies</a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.links {
  display: flex;
  gap: 20px;
}

.links a {
  font-size: 18px;
  color: #333;
  text-decoration: none;
  font-weight: bold;
}

.links a:hover {
  color: #000;
}
</style>
