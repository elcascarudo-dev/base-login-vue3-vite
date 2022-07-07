<template>
  <div class="col-10 col-sm-7 col-md-6 col-lg-5 mx-auto animated fadeIn fast shadow-lg">
    <form class="p-4 p-md-5 border rounded-3 bg-light"
          @submit.prevent="singUP()">

       <div class="form-floating mb-3">
        <input v-model="name" type="text" class="form-control" id="floatingInput" placeholder="Juan Pérez">
        <label for="floatingInput">Nombre</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="email" type="email" class="form-control" id="floatingEmail" placeholder="name@example.com">
        <label for="floatingEmail">Correo electronico</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Contraseña</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="password2" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Confirme contraseña</label>
      </div>
      <div class="checkbox mb-3">
        <label>
          <input v-model="recordar" type="checkbox" value="remember-me"> Recordar correo
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Registrarme</button>
      <hr class="my-4">
      <div class="text-center">
        <router-link class="nav-link my-2" to="/singin">¿Ya tenes una cuenta? Ingresa</router-link>
        <router-link class="nav-link my-2" to="/restore-password">¿No recordas tu contraseña? Recuperala</router-link>
      </div>
    </form>
  </div>
</template>
  
<script setup lang='ts'>

  // -----------------------------------------------------------------------------------------------
  // Importaciones de VUE
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  
  // -----------------------------------------------------------------------------------------------
  // Importación de terceros
  import Swal from 'sweetalert2'

  // -----------------------------------------------------------------------------------------------
  // Importaciones propias
  import { useLoginStore } from '../../../stores/LoginStore'
  import firebaseAuthApi from '../../../apis/firebaseAuth';

  // -----------------------------------------------------------------------------------------------
  // Declaraciones
  const loginStore  = useLoginStore()
  const router      = useRouter()

  // -----------------------------------------------------------------------------------------------
  // Constantes reactivas
  const name        = ref('')
  const email       = ref('')
  const password    = ref('')
  const password2   = ref('')
  const recordar    = ref( false )
  

  const singUP = async () => {

    // -----------------------------------------------------------------------------------------------
    // Valida que las contraseñas sean iguales
    if (password.value !== password2.value ){
      Swal.fire( '', 'Las contraseñas no coninciden.', 'warning')
      return
    }

    // -----------------------------------------------------------------------------------------------
    // Doy de alta al usuario
    const dataPost = {
        email: email.value,
        password: password.value,
        returnSecureToken: true
      }
      
      try {
        const { data } = await firebaseAuthApi.post( '/accounts:signUp', dataPost )

        // ---------------------------------------------------------------------------------------------
        // Registro el nombre del usuario
        const { data: dName } = await firebaseAuthApi.post( '/accounts:update', { idToken: data.idToken, displayName: name.value } )

        data.displayName = dName

        loginStore.saveUserData( data )
        // ---------------------------------------------------------------------------------------------
        // Valido si el usuario quiere guardar email en el localStorage
        recordar
          ? localStorage.setItem( 'email', email.value )
          : localStorage.removeItem( 'email' )

        // ---------------------------------------------------------------------------------------------
        // Guardo el idToken el el localStorage
        localStorage.setItem( 'idToken', loginStore.getIdToken )

        // ---------------------------------------------------------------------------------------------
        // Redirijo al sitio
        router.push( '/' )

      } catch (error: any) {
        const  message = error.response.data.error.message 

        switch ( message ) {
          case 'EMAIL_EXISTS':
            Swal.fire( '', 'El email ya se encuentra registrado', 'warning')
            break;
          
          case 'INVALID_EMAIL':
            Swal.fire( '', 'El email Ingresado no es valido', 'warning')
            break;
        
          default:
            Swal.fire( '', 'Ocurrio un error al realizar la registración, intente mas tarde', 'warning')
            break;
        }
      }


  }

  

</script>
  
<style>
  
</style>