<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <Navigation :links="links"/>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Rick and Morty</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer padless app style="position: absolute">
      <Footer :links="links"/>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default {
  components: {Footer, Navigation},
  data() {
    return {
      links: [
        {title: 'Home', icon: 'mdi-home', link: '/'},
        {title: 'Characters', icon: 'mdi-account-group', link: '/characters'},
        {title: 'Locations', icon: 'mdi-map-marker', link: '/locations'},
        {title: 'Episodes', icon: 'mdi-image-multiple', link: '/episodes'},
      ],
      drawer: null
    }
  },
}
</script>
