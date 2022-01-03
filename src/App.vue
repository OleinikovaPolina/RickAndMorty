<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <Navigation :links="links"/>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Rick and Morty</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="changeTheme">
        <v-icon>{{ $vuetify.theme.dark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <v-footer padless style="opacity: 0">
        <Footer :links="links"/>
      </v-footer>
      <v-footer padless absolute bottom>
        <Footer :links="links"/>
      </v-footer>
    </v-main>
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
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      sessionStorage.setItem('theme', this.$vuetify.theme.dark)
    }
  }
}
</script>
