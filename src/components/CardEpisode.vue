<template>
  <v-card class="mx-auto my-4 fill-height">
    <router-link :to="'/episode/'+episode.id"
                 class="text-decoration-none"
                 :class="$vuetify.theme.dark?'white--text':'black--text'">
      <v-card-title class="pb-1" style="line-height: 1.35rem;word-break: normal;">{{ episode.name }}</v-card-title>
    </router-link>
    <v-card-text class="pt-0">
      <v-row class="mt-4 mx-0">
        <div class=" text-subtitle-2">
          Air date:&nbsp;
        </div>
        <div> {{ episode.air_date }}</div>
      </v-row>
      <v-row class="mt-4 mx-0">
        <div class=" text-subtitle-2">
          Episode code:&nbsp;
        </div>
        <div> {{ episode.episode }}</div>
      </v-row>
      <v-row class="mt-4 mx-0">
        <div class=" text-subtitle-2">
          Number of characters: &nbsp;
        </div>
        <div> {{ episode.characters.length }}</div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardEpisode",
  props: ['episode'],
}
</script>