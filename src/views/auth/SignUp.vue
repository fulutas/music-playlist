<template>
  <form @submit.prevent="handleSubmit">
      <h3>Kayıt Ol</h3>
      <input type="texxt" placeholder="Display name" v-model="displayName">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Şifre" v-model="password">
      <div v-if="error" class="error"> {{ error }}</div>
      <button v-if="!isPending">Kayıt Ol</button>
      <button v-if="isPending" :class="{ 'succesfully' : isPending }"  disabled>Bekleyiniz...</button>
  </form>
</template>

<script>

import useSignup from '@/composables/useSignup'
import { ref } from "vue"
import { useRouter } from "vue-router"

export default {
    setup(){

        const {error, signup, isPending} = useSignup()

        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const router = useRouter()


        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value)
            if(!error.value){
                router.push({ name : 'UserPlaylists' })
            }
        }

        return {
            displayName, 
            email,
            password,
            isPending,
            handleSubmit,
            error
        }

    }

}
</script>

<style>

</style>