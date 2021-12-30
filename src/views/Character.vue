<template>
  <div>
    <template v-if="load">
      <Breadcrumbs :items="items"></Breadcrumbs>
      <v-card
          class="mx-auto mb-4"
      >
        <v-row class="ma-0">
          <v-col
              class="pa-0"
              cols="12"
              sm="4">
            <v-img
                height="100%"
                width="100%"
                :src="character.image"
            />
          </v-col>
          <v-col
              cols="12"
              class="pb-0 pa-md-0 "
              sm="8">
            <v-card-title class="pb-1" style="line-height: 1.1rem;word-break: normal;">
              {{ character.name }}
            </v-card-title>

            <v-card-text>
              <v-row class="ma-0">
                <v-icon x-small
                        :style="{ color: character.status==='Alive' ? 'green' : character.status==='unknown' ? '' : 'red' }">
                  mdi-circle
                </v-icon>
                <div class="ms-1">
                  {{ character.status + ' - ' + character.species }}
                </div>
              </v-row>

              <div class="mt-4 text-subtitle-2">
                Gender:
              </div>
              <div>{{ character.gender }}</div>

              <div class="mt-4 text-subtitle-2">
                Origin:
              </div>
              <router-link  v-if="character.origin.url!==''"
                            class="text-decoration-none text--primary"
                           :to="'/location/'+character.origin.url.split('/')[character.origin.url.split('/').length-1]">
                <div class="text--primary">{{ character.origin.name }}</div>
              </router-link>
              <div class="text--primary" v-else>{{ character.origin.name }}</div>

              <div class="mt-4 text-subtitle-2">
                Last known location:
              </div>
              <router-link  v-if="character.location.url!==''"
                            class="text-decoration-none text--primary"
                           :to="'/location/'+character.location.url.split('/')[character.location.url.split('/').length-1]">
                <div class="text--primary">{{ character.location.name }}</div>
              </router-link>
              <div class="text--primary" v-else>{{ character.location.name }}</div>

              <div class="mt-4 text-subtitle-2">
                First seen in:
              </div>
              <router-link class="text-decoration-none text--primary"
                           :to="'/episode/'+episodes.filter(x => x.url === character.episode[0])[0].id">
                <div>{{ episodes.filter(x => x.url === character.episode[0])[0].name }}</div>
              </router-link>
            </v-card-text>
          </v-col>
        </v-row>
        <div class="pt-0 pa-4 pt-sm-4">
          <div class="mt-4 text-subtitle-2">
            Episodes:
          </div>
          <v-chip-group
              active-class="primary--text"
              column
          >
            <router-link class="text-decoration-none "
                         v-for="episode in character.episode"
                         :key="episode"
                         :to="'/episode/'+episodes.filter(x => x.url === episode)[0].id">
              <v-chip>{{ episodes.filter(x => x.url === episode)[0].name }}</v-chip>
            </router-link>
          </v-chip-group>
        </div>
      </v-card>
    </template>
    <div v-else class="text-center pt-16">
      <v-progress-circular
          indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Breadcrumbs from "../components/Breadcrumbs"

export default {
  name: "Character",
  components: {Breadcrumbs},
  data: () => ({
    load: false,
    character: {},
    items: [
      {
        text: 'Characters',
        disabled: false,
        href: '/characters',
      }
    ]
  }),
  async mounted() {
    let t = 1
    await axios
        .get('https://rickandmortyapi.com/api/episode/?page=1')
        .then(res => {
          this.episodes = res.data.results
          t = res.data.info.pages
        });
    for (let i = 2; i <= t; i++) {
      await axios
          .get('https://rickandmortyapi.com/api/episode/?page=' + i)
          .then(res => {
            this.episodes = this.episodes.concat(res.data.results)
          });
    }
    await axios
        .get('https://rickandmortyapi.com/api/character/' + this.$route.params.id)
        .then(res => {
          this.character = res.data
          this.items.push({
            text: 'Character ' + this.character.name,
            disabled: true,
            href: '/character/' + this.$route.params.id,
          })
        })
    this.load = true
  }
}
</script>
