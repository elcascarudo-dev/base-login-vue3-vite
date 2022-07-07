<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

  import { useRouter } from 'vue-router';
  
  import { useLoginStore } from './stores/LoginStore';
  
  import firebaseAuthApi from './apis/firebaseAuth'

  const router = useRouter()
  const loginStore = useLoginStore()

  const validateLogin = async () => {

    !localStorage.getItem( 'idToken' ) && router.push( '/singin' )

    const idToken = localStorage.getItem( 'idToken' )

    try {
      const { data }  = await firebaseAuthApi.post( '/accounts:lookup', { idToken } )

      loginStore.saveUserData( data.users[0] )

      console.log(loginStore.getEmail)

    } catch (error: any) {
      console.log( error.response.data.error.message )
      localStorage.removeItem( 'idToken' )
      router.push( '/singin')
    }

  }

  // validateLogin()

</script>

<template>
  <router-view></router-view>
</template>

<style>

</style>
