<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <div class="navbar-left">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
    </div>
    <div class="navbar-right">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #42b983;
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.navbar-left {
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-left: 50px;
}

.logo {
  margin-right: 1rem;
}

.navbar-right nav {
  display: flex;
  gap: 1rem;
  margin-right: 50px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: antiquewhite;
}

main {
  flex-shrink: 1;
  width: 80%;
  padding: 1rem;
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 700px;
}
</style>
