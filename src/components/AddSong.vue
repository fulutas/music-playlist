<template>
  <div class="add-song" ref="songWrap" @click="checkClick">
      <form v-if="openModal" @submit.prevent="handleSubmit">
          <h4>Müzik ekle</h4>
          <input type="text" placeholder="Müzik adı" v-model="title" required>
          <input type="text" placeholder="Sanatçı" v-model="artist" required>
          <div class="form-actions">
            <button>Ekle</button>
            <button class="close-modal" @click="$emit('closeModal', false)">Kapat</button>
          </div>
      </form>
  </div>
</template>

<script>

import { ref } from '@vue/reactivity'
import useDocument from "@/composables/useDocument"

export default {
    name : 'AddSong',
    props : ['playlist','openModal'],
    setup(props, context){
        const title = ref('')
        const artist = ref('')
        const showForm = ref(false)

        const { error , updateDoc } = useDocument('playlists', props.playlist.id)
        
        const songWrap = ref(null)
        const checkClick = (e) => {

           if(e.target === songWrap.value){            
            context.emit('closeModal', false)
         }
        }

        const handleSubmit = async () => {
            const newSong = {
                title : title.value,
                artist : artist.value,
                id : Math.floor(Math.random() * 1000000)
            }
            
            // Mevcut şarkıları al ve yenilerini ekle.
            await updateDoc({
                songs : [...props.playlist.songs, newSong]
            })

            if(!error.value){
             context.emit('closeModal', false)
            } else {
                alert(error)
            }

            title.value = ''
            artist.value = ''
        }


        return{
            title,
            artist,
            showForm,
            handleSubmit,
            checkClick,
            songWrap,
        }
    }
}
</script>

<style scoped>

.add-song h4{
    text-transform: capitalize;
}

.add-song{
    text-align: center;
    position: fixed;
    z-index: 9998;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.add-song form{
    max-width: 30%;
    text-align: left;
    margin-top: 15em;
}

.add-song form .form-actions{
    display: flex;
    justify-content: space-between;
}

.add-song form .form-actions button:last-child{
    margin-left: 10px;
}

.add-song form .form-actions .close-modal{
    background-color: var(--warning);
    color: white;
}

</style>