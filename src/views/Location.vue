<template>
  <v-container>
    <template v-if="load">
      <Breadcrumbs :items="items"></Breadcrumbs>
      <v-card class="mx-auto mb-4">
        <v-card-title class="pb-1" style="line-height: 1.35rem;word-break: normal;">{{ location.name }}</v-card-title>
        <v-card-text class="pt-0 text--primary">

          <div class="mt-4 text-subtitle-2">
            Type:
          </div>
          <div>{{ location.type }}</div>

          <div class="mt-4 text-subtitle-2">
            Dimension:
          </div>
          <div>{{ location.dimension }}</div>

          <v-row class="ma-0">
            <div class="mt-4 text-subtitle-2">
              Residents ({{ location.residents.length }}):
            </div>
            <v-btn
                @click="getResidents"
                v-if="location.residents.length>0"
                class="mx-2 mt-2"
                fab
                dark
                x-small
            >
              <v-icon dark>
                {{ showResidents ? 'mdi-minus' : 'mdi-plus' }}
              </v-icon>
            </v-btn>
          </v-row>
          <template v-if="showResidents">
            <v-chip-group
                active-class="primary--text"
                column
                v-if="loadResidents"
            >
              <router-link class="text-decoration-none "
                           v-for="character in location.residents"
                           :to="'/character/'+character.id"
                           :key="character.id">
                <v-chip>{{ character.name }}</v-chip>
              </router-link>
            </v-chip-group>
            <div v-else>
              <v-progress-circular
                  indeterminate
              ></v-progress-circular>
            </div>
          </template>
        </v-card-text>
      </v-card>
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
import Breadcrumbs from "../components/Breadcrumbs";

export default {
  name: "Location",
  components: {Breadcrumbs},
  data: () => ({
    location: {residents: []},
    load: false,
    loadResidents: false,
    showResidents: false,
    startLoadResidents: false,
    items: [
      {
        text: 'Locations',
        disabled: false,
        href: '/locations',
      }
    ]
  }),
  methods: {
    async getResidents() {
      this.showResidents = !this.showResidents
      if (!this.startLoadResidents) {
        this.startLoadResidents = true
        for (let i = 0; i < this.location.residents.length; i++) {
          await axios
              .get(this.location.residents[i])
              .then(res => {
                this.location.residents[i] = {url: this.location.residents[i], name: res.data.name, id: res.data.id}
              });
        }
        this.loadResidents = true
      }
    }
  },
  async mounted() {
    await axios
        .get('https://rickandmortyapi.com/api/location/' + this.$route.params.id)
        .then(res => {
          this.location = res.data
          this.items.push({
            text: 'Location ' + this.location.name,
            disabled: true,
            href: '/location' + this.$route.params.id,
          })
        });

    this.load = true
  }
}
</script>