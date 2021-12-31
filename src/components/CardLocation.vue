<template>
  <v-card class="mx-auto my-4 fill-height">
    <router-link :to="'/location/'+location.id" class="black--text text-decoration-none ">
      <v-card-title class="pb-1" style="line-height: 1.35rem;word-break: normal;">{{ location.name }}</v-card-title>
    </router-link>
    <v-card-text class="pt-0">
      <v-row class="mt-4 mx-0">
        <div class=" text-subtitle-2">
          Type:&nbsp;
        </div>
        <div style="cursor: pointer" @click="$emit('getLocations',{type:location.type})"> {{ location.type }}</div>
      </v-row>
      <v-row class="mt-4 mx-0">
        <div class=" text-subtitle-2">
          Dimension:&nbsp;
        </div>
        <div style="cursor: pointer" @click="$emit('getLocations',{dimension:location.dimension})"> {{ location.dimension }}</div>
      </v-row>
      <v-row class="mt-4 mx-0">
        <div class=" text-subtitle-2">
          Number of residents: &nbsp;
        </div>
        <div> {{ location.residents.length }}</div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardLocation",
  props: ['location'],
}
</script>