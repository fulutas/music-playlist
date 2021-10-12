<template>
  <div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="playlist" class="playlist-details">

        <!-- playlist info -->
        <div class="playlist-info">
            <div class="cover">
                <img v-if="playlist.coverUrl"  :src="playlist.coverUrl" loading="lazy">
                <img v-else :src="require('@/assets/null-playlist-cover.jpg')" loading="lazy"/>
            </div>
            <h2>{{ playlist.title }}</h2>
            <p class="username">Oluşturan : {{ playlist.userName ? playlist.userName : "None User" }}</p>
            <p class="createdDate">Oluşturma Tarihi : {{ createdDate }}</p>
            <p class="description">{{ playlist.description }}</p>
            <div class="playlist-actions">
                <button v-if="ownership" @click="handleDelete">Listeyi Sil</button>
                <button v-if="ownership" class="add-music" @click="openaddMusic = !openaddMusic">Müzik Ekle</button>
            </div>
        </div>

        <AddSong :openModal="openaddMusic" @closeModal="openaddMusic = $event" v-if="ownership && openaddMusic" :playlist="playlist"/>

        <!-- song list -->
        <div class="song-list">
            <div v-if="!playlist.songs.length">Bu çalma listesine henüz bir şarkı eklenmedi.</div>
            <div v-for="song in playlist.songs" :key="song.id" class="single-song">
                <div class="details">
                    <h3>{{ song.title }}</h3>
                    <p>{{ song.artist }} </p>
                    {{ song.id }}
                </div>
                <button v-if="ownership" @click="handleSongDelete(song.id)">Sil</button>
            </div>
        </div>

      </div>
  </div>
</template>

<script>

import AddSong from "@/components/AddSong.vue"

import useStorage from "@/composables/useStorage"
import useDocument from "@/composables/useDocument"
import getDocument from "@/composables/getDocument"
import getUser from "@/composables/getUser"
import { computed, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
   // id props : listView component'den gelir.
   props : ['id'],
   components : {
       AddSong
   },
   setup(props){
       // Document > Takma ad : playlist 
       const { error, document: playlist } = getDocument('playlists', props.id)
       const { user } = getUser()
       const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
       const { deleteImage } = useStorage()
       const router = useRouter()

       const openaddMusic = ref(false)

       // Oluşturan liste kullanıcı kontrolü
       const ownership = computed(() => {
           return playlist.value && user.value && user.value.uid == playlist.value.userId
       })

       const createdDate = computed(() => {
           return new Date(playlist.value.createdAt.toDate()).toLocaleString()
       })

       // Playlist siler
       const handleDelete = async () => {

           let deleteConfirm = confirm("Silmek istediğinizden emin misiniz?")

           if(deleteConfirm == true){
            await deleteImage(playlist.value.filePath)
            await deleteDoc()   
            router.push({ name : 'Home' })
           }
       }

       const handleSongDelete = async (id) => {
           const songs = playlist.value.songs.filter((song) => { return song.id != id})
           await updateDoc({ songs : songs })
       }
 

       return {
           error,
           playlist,
           ownership,
           handleDelete,
           createdDate,
           openaddMusic,
           handleSongDelete
       }
   }
}
</script>

<style scoped>

.playlist-details{
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
}

.cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
}

.cover img{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.playlist-info {
    text-align: center;
}

.playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
}

.playlist-info p {
    margin-bottom: 10px;
}

.playlist-info .username, 
.playlist-info .createdDate
{
    color: #999;
}

.playlist-info .description{
    text-align: left;
}

.single-song{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
}

.playlist-actions{
    display: flex;
    justify-content: space-between;
}

.playlist-actions .add-music{
    background-color: rgb(14, 163, 46);
    color: white;
}

.playlist-actions .add-music:hover{
    opacity: 0.8;
}

</style>