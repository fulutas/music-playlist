<template>
  <div>
    <span v-if="filter" @click="filterList" class="filter">{{ filterStatusLabel }} </span>
    <div v-if="filteredData?.length > 0"> 
          <p>{{ playlists.length }} liste bulundu.</p>
        <div v-for="playlist in filteredData" :key="playlist.id" >
          <router-link :to="{ name : 'PlaylistDetails', params : { id : playlist.id }}">
            <div class="single">
              <div class="thumbnail">
                <img :src="playlist.coverUrl" loading="lazy" />
              </div>
              <div class="info">
                <h3>{{ playlist.title }}</h3>
                <p>
                  Oluşturan : {{ playlist.userName ? playlist.userName : "None User" }}
                </p>
              </div>
              <div class="song-number">
                <p>{{ playlist.songs.length }} şarkı</p>
              </div>
            </div>
          </router-link>
          </div>
      </div>
      <div v-else>
        <p>Sana ait çalma listesi bulunamadı.</p>
      </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core';
import getUser from "@/composables/getUser"

export default {
  props: ["playlists","filter"],
  setup(props){

    const { user } = getUser()
    const filterStatus = ref(false)
    
    const filterList = () => {
      filterStatus.value = !filterStatus.value
    }

    const filterStatusLabel = computed(() => {
      if(filterStatus.value) return 'Tümünü gör'
      else return 'Bana ait listeleri göster'
    })

    const filteredData = computed(() => {
      return props?.playlists?.filter(data => {
        if(filterStatus.value){
          return data.userId == user.value?.uid
        } else {
          return data;
        }
      })
    })

    return {
      filteredData,
      filterList,
      filterStatusLabel
    }
  }
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}

.single:hover {
  box-shadow: 1px 2px 3 px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}

.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}

img {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

.info {
  margin: 0 30px;
}

.song-number {
  margin-left: auto;
  border-radius: 15px;
}

.filter{
  font-size: 16px;
  cursor: pointer;
  background-color: teal;
  color: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  display: inline-block;
}

.filter:hover{
  opacity: 0.9;
}

</style>
