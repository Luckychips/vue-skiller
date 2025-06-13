<script setup lang="ts">
import { ref } from 'vue';
import { useLazyQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';
import SimpleButton from '@/components/core/button/SimpleButton.vue';

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;

const isLoading = ref(false);
const { load, result } = useLazyQuery(GET_COUNTRIES);

async function connect() {
  isLoading.value = true;
  await load();
  // isLoading.value = false;
}
</script>

<template>
  <section class="container">
    <SimpleButton
      v-if="!isLoading"
      has-on-click-parameter
      :onClick="connect"
      :css="{padding: '10px 20px'}"
    >
      <template #icon>
        <i class="pi pi-youtube" :class="{ 'pi-spin': isLoading }" />
      </template>
    </SimpleButton>
    <ul v-if="result && result.countries && result.countries.length > 0">
      <li v-for="country in result.countries">{{ country.name }}</li>
    </ul>
  </section>
</template>