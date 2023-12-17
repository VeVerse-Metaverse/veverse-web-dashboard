<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <img class="w-full" v-bind:src="previewUrl" v-bind:alt="title" />
    <div class="px-6 py-4">
      <div class="text-xl mb-2">{{ title }}</div>
      <p class="text-gray-700 text-base">
        {{ summary }}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#metaverse</span
      >
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#events</span
      >
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#schedule</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "MetaverseCard",
  props: {
    previewUrl: String,
    title: String,
    summary: String,
    description: String,
  },
};
</script>

<style scoped></style>
