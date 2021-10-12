<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.jpg" alt="logo" />
      <h1>
        <router-link :to="{ name: 'Home' }">Music Playlist Share</router-link>
      </h1>
      <div class="links">
        <div v-if="user">
            <router-link :to="{ name : 'CreatePlaylist' }">Playlist Oluştur</router-link>
            <router-link :to="{ name : 'UserPlaylists' }">Benim Listem</router-link>
            <span>{{ user.displayName }}</span>
            <button @click="handleClick">Çıkış Yap</button>
        </div>
        <div v-else>
            <router-link class="btn" :to="{ name: 'Signup' }">Kayıt Ol</router-link>
            <router-link class="btn" :to="{ name: 'Login' }">Giriş Yap</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";

import { useRouter } from "vue-router";

export default {
  name: "Navbar",
  setup() {

    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      console.log("user logged out");
      router.push({ name: "Login" });
    };

    return {
      handleClick,
      user,
    };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
  box-shadow: rgba(247, 10, 108, 0.87) 0px 0px 0px 2px;
}

nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

nav .links {
  margin-left: auto;
}

nav h1 {
  margin-top: 0.1rem;
  background: linear-gradient(#f7287e, #C173FF);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}

nav .links button {
  background-color: var(--warning);
  color: white;
}

nav img {
  max-height: 60px;
  /* margin-top: 1rem; */
}

.links span{
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 2px solid #eee;
  color: teal;
}

</style>
