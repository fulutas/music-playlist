<template>
  <div class="home">
    <div v-if="error" class="error">{{ error }}</div>
    <ListView :playlists="documents" :filter="true"/>
    <div class="not-record" v-if="!documents?.length">
      <img :src="require('@/assets/not-record.png')" loading="lazy"/>
      <p>Eklenen çalma listesi bulamadık.</p>
    </div>
  </div>
</template>

<script>

import getCollection from "../composables/getCollection"
import ListView from "../components/ListView.vue"

export default {
  name: 'Home',
  components : {
    ListView
  },
  setup(){
    const { error, documents } = getCollection('playlists')

    return {
      error,
      documents
    }
  }
}
</script>


<style scoped>

.not-record {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.not-record img{
  max-width: 20%;
  max-height: 100%;
  mix-blend-mode: multiply;
}

.not-record p {
  margin-top: 20px;
  font-size: 19px;
}

</style>