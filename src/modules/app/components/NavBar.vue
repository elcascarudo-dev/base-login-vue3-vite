<template>
  <nav class="navbar bg-light" aria-label="Light offcanvas navbar">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Base Login</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarLight" aria-controls="offcanvasNavbarLight">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbarLight" aria-labelledby="offcanvasNavbarLightLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLightLabel">Offcanvas</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <!-- Comuenso del menu -->

          <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
              <router-link to="/dashboard/inicio" class="nav-link active" aria-current="page">
                <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"/></svg>
                Inicio
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/dashboard/pagina" class="nav-link" aria-current="page">
                <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"/></svg>
                Pagina
              </router-link>
            </li>
            <hr>
            <li>
              <a href="#" class="nav-link link-dark">
                <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"/></svg>
                Mis datos
              </a>
            </li>
            <li>
              <a @click="logout()" class="nav-link link-dark puntero">
                <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"/></svg>
                Salir
              </a>
            </li>
          </ul>
          
          <!-- Fin del menu -->
        </div>
      </div>
    </div>
  </nav>     
</template>
    
<script setup lang='ts'>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const logout = () => {
    localStorage.removeItem( 'idToken')
    router.push( {name: 'singin'} )
  }
    
</script>
    
<style scoped>

  .puntero{
    cursor: pointer;
  }
    
</style>