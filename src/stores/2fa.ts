import { defineStore } from 'pinia'
import { Storage } from '@capacitor/storage'
import { EStorageKeys } from '@/types/base-component'
import { generateToken, verifyToken, generateSecret } from "node-2fa"

interface I2faState {
  secret: string,
  uri: string
}

const getSecret = async () => {
  const { value } = await Storage.get({
    key: EStorageKeys.twofa
  })
  return value || ''
}

async function setSecret(secret: string) {
  await Storage.set({
    key: EStorageKeys.twofa,
    value: secret,
  })
}

// === 2fa Store ===

export const use2faStore = defineStore('2fa', {
  state: (): I2faState => ({
    secret: '',
    uri: ''
  }),

  getters: {
    getSecret: (state) => state.secret,
  },

  actions: {
    generateToken() {
      generateToken(this.secret)
    },
    verify(token:string) {
      return verifyToken(this.secret, token)
    },
    generateSecret() {
      const { secret, uri } = generateSecret({
        name: 'Liber App',
        account: 'Personal'
      })

      this.secret = secret
      this.uri = uri

      setSecret(secret)
    },
    async init() {
      const secret = await getSecret()
      this.secret = secret
    },
  },
});
