<template>
  <v-container>
    <template v-if="load">
      <v-row class="ma-0">
        <v-col
            v-for="item in alls"
            :key="item.name"
            cols="12"
            md="4"
        >
          <v-card class="mx-auto my-4 fill-height">
            <v-img :src="item.img"
                   :height="$vuetify.breakpoint.xs||$vuetify.breakpoint.sm?'auto':'15vw'"></v-img>
            <router-link :to="'/'+item.name"
                         class="text-decoration-none"
                         :class="$vuetify.theme.dark?'white--text':'black--text'">
              <v-card-title class="pb-1" style="text-transform: capitalize">{{ item.name }}</v-card-title>
            </router-link>
            <v-card-text class="pt-0">
              <v-row class="mt-1 mx-0">
                <div class=" text-subtitle-2">
                  All number:&nbsp;
                </div>
                <div> {{ item.info.count }}</div>
              </v-row>
            </v-card-text>
            <v-list shaped>
              <v-list-item
                  class="pl-2"
                  v-for="item2 in item.items"
                  :key="item2.text"
                  :class="`grey ${!$vuetify.theme.dark?'lighten':'darken'}-${item2.number}`"
              >
                <v-list-item-avatar class="mr-1">
                  <v-icon>{{ item2.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item2.text"></v-list-item-title>
                  <v-list-item-subtitle v-text="item2.text2"></v-list-item-subtitle>
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

import axios from "axios"
import img1 from '../assets/3614168-total_rickall.jpg'
import img2 from '../assets/Multiverse.jpg'
import img3 from '../assets/rick.jpg'

export default {
  data: () => ({
    characters: ['', 'alive', 'dead', 'unknown'],
    locations: ['', 'type', 'dimension'],
    locationsInfo: {},
    charactersInfo: {},
    episodesInfo: {},
    load: false,
    charactersItems: [
      {text: 'Alive', icon: 'mdi-account-check', number: 3},
      {text: 'Dead', icon: 'mdi-account-cancel', number: 2},
      {text: 'Unknown', icon: 'mdi-account-search', number: 4},
    ],
    locationsItems: [
      {text: 'Type unknown', icon: 'mdi-crosshairs-question', number: 3},
      {text: 'Dimension unknown', icon: 'mdi-map-marker-question', number: 2},
    ],
    episodesItems: [
      {text: 'First episode air date', icon: 'mdi-home-floor-1', number: 3, text2: 'December 2, 2013'},
      {text: 'Last episode air date', icon: 'mdi-home-lightning-bolt', number: 2, text2: 'September 5, 2021'},
    ],
    alls: []
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
              this.locationsItems[i - 1].text2 = res.data.info.count
            }
          })
          .catch(() => {
          })
    }
    for (let i = 0; i < this.characters.length; i++) {
      await axios
          .get('https://rickandmortyapi.com/api/character', {params: {status: this.characters[i]}})
          .then(res => {
            if (i === 0) {
              this.charactersInfo = res.data.info
            } else {
              this.charactersItems[i - 1].text2 = res.data.info.count
            }
          })
          .catch(() => {
          })
    }
    await axios
        .get('https://rickandmortyapi.com/api/episode')
        .then(res => {
          this.episodesInfo = res.data.info
        })
        .catch(() => {
        })
    this.alls = [
      {name: 'characters', info: this.charactersInfo, items: this.charactersItems, img: img1},
      {name: 'locations', info: this.locationsInfo, items: this.locationsItems, img: img2},
      {name: 'episodes', info: this.episodesInfo, items: this.episodesItems, img: img3}
    ]
    this.load = true
  },
}
</script>