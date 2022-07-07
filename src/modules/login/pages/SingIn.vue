<template>
  <div class="col-10 col-sm-7 col-md-6 col-lg-5 mx-auto animated fadeIn fast shadow-lg">
    <form class="p-4 p-md-5 border rounded-3 bg-light"
          @submit.prevent="singIn()">
      <div class="form-floating mb-3">
        <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Contraseña</label>
      </div>
      <div class="checkbox mb-3">
        <label>
          <input v-model="remember" type="checkbox" value="remember-me"> Recordar email
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Ingresar</button>
      <hr class="my-4">
      <div class="text-center">
        <router-link class="nav-link my-2" to="/singup">¿No tenes una cuenta? Registrate</router-link>
        <router-link class="nav-link my-2" to="/restore-password">¿No recordas tu contraseña? Recuperala</router-link>
      </div>
    </form>
  </div>
</template>
  
<script setup lang='ts'>

  // -----------------------------------------------------------------------------------------------
  // Importaciones de VUE
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  // -----------------------------------------------------------------------------------------------
  // Importación de terceros
  import Swal from 'sweetalert2'
  
  // -----------------------------------------------------------------------------------------------
  // Importaciones propias
  import { useLoginStore } from '../../../stores/LoginStore'
  import firebaseAuthApi from '../../../apis/firebaseAuth'

  // -----------------------------------------------------------------------------------------------
  // Declaraciones
  const router = useRouter()
  const loginStore = useLoginStore()

  // -----------------------------------------------------------------------------------------------
  // Constantes reactivas
  const email     = ref( '' )
  const password  = ref( '' )
  const remember  = ref( false )

  // -----------------------------------------------------------------------------------------------
  // Valido si el email esta guardado en el LocalStorage
  if( localStorage.getItem( 'email' ) !== null ){
    remember.value  = true
    // email.value     = localStorage.getItem( 'email' ) as string
    email.value     = localStorage.getItem( 'email' )!
  }

  // -----------------------------------------------------------------------------------------------
  // Metodo para el login
  const singIn = async () => {

    const dataPost = { 
      email: email.value, 
      password: password.value, 
      returnSecureToken: true 
    }

    try {
      // -----------------------------------------------------------------------------------------------
      // Realizo el login
      const { data } = await firebaseAuthApi.post( '/accounts:signInWithPassword', dataPost )

      loginStore.saveUserData( data )
      localStorage.setItem( 'idToken', loginStore.getIdToken )
      
      router.push( '/' )

    } catch (error: any ) { Swal.fire( 'Opss!!', 'Usuario o Contraseña incorrectos', 'error' ) }

  }
  
</script>
  
<style>
  
</style>