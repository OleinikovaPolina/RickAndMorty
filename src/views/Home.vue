<template>
  <v-container>
    <template v-if="load">
      <v-row class="ma-0">
        <v-col
            cols="12"
            md="4"
        >
          <v-card class="mx-auto my-4 fill-height">
            <v-img src="../assets/3614168-total_rickall.jpg"
                   :height="$vuetify.breakpoint.xs||$vuetify.breakpoint.sm?'auto':'15vw'"></v-img>
            <router-link :to="'/characters'" class="black--text text-decoration-none ">
              <v-card-title class="pb-1">Characters</v-card-title>
            </router-link>
            <v-card-text class="pt-0">
              <v-row class="mt-1 mx-0">
                <div class=" text-subtitle-2">
                  All number:&nbsp;
                </div>
                <div> {{ charactersInfo.count }}</div>
              </v-row>
            </v-card-text>
            <v-list shaped>
              <v-list-item
                  class="pl-2"
                  v-for="item in items"
                  :key="item.text"
                  :class="'grey lighten-'+item.number"
              >
                <v-list-item-avatar class="mr-1">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.text2"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col
            cols="12"
            md="4"
        >
          <v-card class="mx-auto my-4 fill-height">
            <v-img src="../assets/Multiverse.jpg"
                   :height="$vuetify.breakpoint.xs||$vuetify.breakpoint.sm?'auto':'15vw'"></v-img>
            <router-link :to="'/locations'" class="black--text text-decoration-none ">
              <v-card-title class="pb-1">Locations</v-card-title>
            </router-link>
            <v-card-text class="pt-0">
              <v-row class="mt-1 mx-0">
                <div class=" text-subtitle-2">
                  All number:&nbsp;
                </div>
                <div> {{ locationsInfo.count }}</div>
              </v-row>
            </v-card-text>
            <v-list shaped>
              <v-list-item
                  class="pl-2"
                  v-for="item in itemsLocations"
                  :key="item.text"
                  :class="'grey lighten-'+item.number"
              >
                <v-list-item-avatar class="mr-1">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.text2"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col
            cols="12"
            md="4"
        >
          <v-card class="mx-auto my-4 fill-height">
            <v-img src="../assets/rick.jpg"
                   :height="$vuetify.breakpoint.xs||$vuetify.breakpoint.sm?'auto':'15vw'"></v-img>
            <router-link :to="'/episodes'" class="black--text text-decoration-none ">
              <v-card-title class="pb-1">Episodes</v-card-title>
            </router-link>
            <v-card-text class="pt-0">
              <v-row class="mt-1 mx-0">
                <div class=" text-subtitle-2">
                  All number:&nbsp;
                </div>
                <div> {{ episodesInfo.count }}</div>
              </v-row>
            </v-card-text>
            <v-list shaped>
              <v-list-item
                  class="pl-2"
                  v-for="item in itemsEpisodes"
                  :key="item.text"
                  :class="'grey lighten-'+item.number"
              >
                <v-list-item-avatar class="mr-1">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.text2"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <div v-else class="text-center pt-16">
      <v-progress-circular
          indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>

import axios from "axios";

export default {
  data: () => ({
    characters: ['', 'alive', 'dead', 'unknown'],
    locations: ['', 'type', 'dimension'],
    locationsInfo: {},
    charactersInfo: {},
    episodesInfo: {},
    load: false,
    items: [
      {text: 'Alive', icon: 'mdi-account-check', number: 3},
      {text: 'Dead', icon: 'mdi-account-cancel', number: 2},
      {text: 'Unknown', icon: 'mdi-account-search', number: 4},
    ],
    itemsLocations: [
      {text: 'Type unknown', icon: 'mdi-crosshairs-question', number: 3},
      {text: 'Dimension unknown', icon: 'mdi-map-marker-question', number: 2},
    ],
    itemsEpisodes: [
      {text: 'First episode air date', icon: 'mdi-home-floor-1', number: 3, text2: 'December 2, 2013'},
      {text: 'Last episode air date', icon: 'mdi-home-lightning-bolt', number: 2, text2: 'September 5, 2021'},
    ],
  }),
  async mounted() {
    for (let i = 0; i < this.locations.length; i++) {
      let t = this.locations[i]
      await axios
          .get('https://rickandmortyapi.com/api/location', {
            params: {
              [t]: 'unknown'
            }
          })
          .then(res => {
            if (i === 0) {
              this.locationsInfo = res.data.info
            } else {
              this.itemsLocations[i - 1].text2 = res.data.info.count
            }
          });
    }
    for (let i = 0; i < this.characters.length; i++) {
      await axios
          .get('https://rickandmortyapi.com/api/character', {params: {status: this.characters[i]}})
          .then(res => {
            if (i === 0) {
              this.charactersInfo = res.data.info
            } else {
              this.items[i - 1].text2 = res.data.info.count
            }
          });
    }
    await axios
        .get('https://rickandmortyapi.com/api/episode')
        .then(res => {
          this.episodesInfo = res.data.info
        });
    this.load = true
  },
}
</script>