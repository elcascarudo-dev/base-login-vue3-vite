import { defineStore } from 'pinia'

interface userData {
  localId: string;
  email: string;
  displayName: string | null;
  refreshToken: string;
  idToken: string;
}

export const useLoginStore = defineStore('login', {
  //------------------------------------------
  // Estados
  state: (): userData =>  ({
    localId: '',
    email: '',
    displayName: '',
    refreshToken: '',
    idToken: '',
  }),

  //------------------------------------------
  // Actions
  actions: {

    saveUserData( userData: userData ) {
      this.localId      = userData.localId
      this.email        = userData.email
      this.displayName  = userData.displayName
      this.refreshToken = userData.refreshToken
      this.idToken      = userData.idToken
    },

  },

  //------------------------------------------
  // getters
  getters: {
    getIdToken: ( state: userData ) => state.idToken,
    getName:    ( state: userData ) => state.displayName,
    getEmail:   ( state: userData ) => state.email,
  },

})