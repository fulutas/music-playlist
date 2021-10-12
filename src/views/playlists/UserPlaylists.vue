<template>
  <div class="user-playlists">
    <div class="header">
      <h2>Benim Listem</h2>
       <router-link class="btn" :to="{ name : 'CreatePlaylist'}">Yeni Liste Oluştur</router-link>
    </div>
       <div v-if="playlists">
         <ListView :playlists="playlists" :filter="false"/>
       </div>
  </div>
</template>

<script>

import getUser from "@/composables/getUser"
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView'

export default {
    name : 'UserPlaylist',
    components : {
      ListView
    },
    setup(){
      const { user } = getUser()

      // playlist collection where condition [userId]
      const { documents: playlists } = getCollection('playlists', ['userId', '==', user.value.uid])
      console.log(playlists)

      return {
        playlists
      }
    }
}
</script>

<style scoped>

.user-playlists .header{
  display: flex;
  justify-content: space-between;
}
</style>