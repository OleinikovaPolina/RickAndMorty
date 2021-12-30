<template>
  <v-card
      class="mx-auto my-4 fill-height"
  >
    <v-row class="fill-height">
      <v-col
          class="py-0 pr-sm-0"
          cols="12"
          sm="5">
        <v-img
            height="100%"
            width="100%"
            :src="character.image"
        />
      </v-col>
      <v-col
          cols="12"
          class="pa-md-0"
          sm="7">
        <router-link :to="'/character/'+character.id" class="black--text text-decoration-none ">
          <v-card-title class="pb-1" style="line-height: 1.1rem;word-break: normal;">{{ character.name }}</v-card-title>
        </router-link>
        <v-card-text class="pt-0">
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
            Last known location:
          </div>
          <router-link v-if="character.location.url!==''"
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
  </v-card>
</template>

<script>
export default {
  name: "CardCharacter",
  props: ['character', 'episodes']
}
</script>
<style scoped>

</style>