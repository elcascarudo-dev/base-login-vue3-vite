import firebaseAuthApi from "../apis/firebaseAuth"
import { useLoginStore } from "../stores/LoginStore"



const isAuthenticatedGuard = async ( to: any, from: any, next:any ) => {

  console.log( 'Guard' )

  const loginStore = useLoginStore()
  
  const idToken = localStorage.getItem( 'idToken' )

  
  try {

    if (idToken) {
      const { data }  = await firebaseAuthApi.post( '/accounts:lookup', { idToken } )
      loginStore.saveUserData( data.users[0] )
      next()
    } else {
      next( {name: 'singin'} )
    }


  } catch (error: any) {
    // console.log( error.response.data.error.message )
    localStorage.removeItem( 'idToken' )
    next( {name: 'singin'} )
  }

}

export default isAuthenticatedGuard