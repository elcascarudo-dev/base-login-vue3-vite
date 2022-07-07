<template>
  <div class="col-10 col-sm-6 col-md-5 col-lg-4 mx-auto animated fadeIn fast shadow-lg">
    <form class="p-4 p-md-5 border rounded-3 bg-light"
          @submit.prevent="restoredPassword()">
      <div class="form-floating mb-3">
        <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required>
        <label for="floatingInput">Email</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Recuperar contraseña</button>
      <hr class="my-4">
      <div class="text-center">
        <router-link class="nav-link d-block" to="/singin">¿Ya tenes una cuenta? Ingresa</router-link>
        <router-link class="nav-link d-block" to="/singup">¿No tenes una cuenta? Registrate</router-link>
      </div>
    </form>
  </div>
</template>
  
<script setup lang='ts'>

  //------------------------------------------------------------------
  // Importaciones VUE
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  //------------------------------------------------------------------
  // Importaciones de terceros
  import Swal from 'sweetalert2'

  //------------------------------------------------------------------
  // Importaciones propias
  import firebaseAuthApi from '../../../apis/firebaseAuth'

  //------------------------------------------------------------------
  // Declaraciones
  const router = useRouter()

  //------------------------------------------------------------------
  // Variables reactivas
  const email = ref('')


  const restoredPassword = async () => {

    try {
      await firebaseAuthApi.post('/accounts:sendOobCode', { requestType:'PASSWORD_RESET', email: email.value } )
      
      router.push( '/singin' )
    } catch (error: any ) {
      // console.log( error.response.data.error.message )
      Swal.fire('', 'El email ingresado no esta registrado', 'warning')
    }
  }

  
</script>
  
<style>
  
</style>