<template>

  <form @submit.prevent="handleSubmit" novalidate>
      <h3>Çalma listesi oluştur</h3>
      <input type="text" required placeholder="Playlist başlık" v-model="title">
      <textarea required placeholder="Playlist açıklama" v-model="description"></textarea>
      <!-- Upload Playlist Image -->
      <label for="file">Çalma listesi kapak fotoğrafı yükle</label>
      <input type="file" id="file" @change="handleChange">
      <div class="error" v-if="fileError">{{ fileError }}</div>
      <button v-if="!isPending">Oluştur</button>
      <button v-else disabled>Kaydediliyor...</button>
      <button type="button" @click="router.push({ name : 'Home' })" class="close">Vazgeç</button>
  </form>

</template>

<script>

import { ref } from "vue"
import useStorage from "@/composables/useStorage"
import useCollection from "@/composables/useCollection"
import getUser from "@/composables/getUser"
import { timestamp } from '@/firebase/config'
import { useRouter } from "vue-router"

export default {
    setup(){

        const { filePath, url, uploadImage } = useStorage() // kapak fotoğrafları
        const { error, addDoc } = useCollection('playlists') // Playlists collection'a ekler.
        const { user } = getUser()

        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)

        const handleSubmit = async () => {
            if(file.value){

                isPending.value = true

                await uploadImage(file.value)
                const res = await addDoc({
                    title : title.value,
                    description : description.value,
                    userId : user.value.uid,
                    userName : user.value.displayName,
                    coverUrl : url.value,
                    filePath : filePath.value,
                    songs : [],
                    createdAt : timestamp()
                })

                isPending.value = false

                if(!error.value){
                    router.push({ name : 'PlaylistDetails', params: { id : res.id }})
                }
                
            } else {
                alert("Lütfen kapak fotoğrafını yükleyiniz!")
            }
        }

        // İzin verilen dosya tipleri
        const types = ['image/png', 'image/jpeg', 'image/jpg']

        const handleChange = (e) => {
           const selected = e.target.files[0]
           console.log("Yüklenen Dosya : ", selected)

           // Dosya eklenmiş ve izin verilen dosya tipi var ise;
           if(selected && types.includes(selected.type)){
               file.value = selected
               fileError.value = null
           } else {
               file.value = null 
               fileError.value = 'Lütfen png,jpg veya jpeg uzantılı dosya yükleyiniz.'
           }
        }

        return {
            title,
            description,
            handleSubmit,
            handleChange,
            fileError,
            isPending,
            router
        }
    }
}
</script>

<style scoped>


input[type="file"]{
    border: 0;
    padding: 0;
}

label{
    font-size: 12px;
    display: block;
    margin-top: 30px;
}

button{
    margin-top: 20px;
}

.close{
    margin-left: 10px;
    background-color: #da0f41;
    color: white;
}


</style>