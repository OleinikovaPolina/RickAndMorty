<template>
  <v-breadcrumbs :items="items" class="px-0" divider="-">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
          :to="item.href"
          :disabled="item.disabled"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props:['items']
}
</script>