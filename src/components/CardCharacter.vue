<template>
  <v-card
      class="mx-auto my-4 fill-height"
  >
    <div class="fill-height" :class="$vuetify.breakpoint.xs?'':'d-flex flex-no-wrap'">
      <v-avatar :style="{height:$vuetify.breakpoint.xs?'auto':'100%'}"
                :size="$vuetify.breakpoint.xs?'100%':$vuetify.breakpoint.sm?'50%':'15vw'"
                tile
      >
        <v-img :src="character.image"></v-img>
      </v-avatar>
      <div>
        <router-link :to="'/character/'+character.id"
                     :class="$vuetify.theme.dark?'white--text':'black--text'"
                     class="text-decoration-none ">
          <v-card-title class="pb-1"
                        style="line-height: 1.35rem;word-break: normal;">
            {{ character.name }}
          </v-card-title>
        </router-link>
        <v-card-text class="pt-0">
          <v-row class="ma-0">
            <v-icon x-small
                    :style="{ color: character.status==='Alive' ? 'green'
                    : character.status==='unknown' ? '' : 'red' }">
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
                       :to="'/location/'+
                       character.location.url.split('/')[character.location.url.split('/').length-1]">
            <div class="text--primary">{{ character.location.name }}</div>
          </router-link>
          <div class="text--primary" v-else>{{ character.location.name }}</div>

          <div class="mt-4 text-subtitle-2">
            First seen in:
          </div>
          <router-link class="text-decoration-none text--primary"
                       v-if="episodes.filter(x => x.url === character.episode[0]).length>0"
                       :to="'/episode/'+episodes.filter(x => x.url === character.episode[0])[0].id">
            <div>{{ episodes.filter(x => x.url === character.episode[0])[0].name }}</div>
          </router-link>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardCharacter",
  props: ['character', 'episodes']
}
</script>