<template>
  <div class="avatar-container w-full my-5 flex flex-col items-center">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Avatar
    </h1>
    <iframe
      ref="avatarFrame"
      :class="[
        'frame min-w-[calc(100vw-280px-5rem)] min-h-[calc(100vh-222px)]',
        'md:min-w-[calc(100vw-100px-2rem)]',
      ]"
      allow="camera *; microphone *; clipboard-write"
      :src="frameApiSrc"
    ></iframe>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AvatarView",
  data() {
    return {
      frameApiSrc: `https://veverse.readyplayer.me/avatar?frameApi`,
    };
  },
  methods: {
    parse(event) {
      try {
        return JSON.parse(event.data);
      } catch (error) {
        return null;
      }
    },
    subscribe(event) {
      const json = this.parse(event);

      if (json?.source !== "readyplayerme") {
        return;
      }

      // Susbribe to all events sent from Ready Player Me once frame is ready
      if (json.eventName === "v1.frame.ready") {
        this.$refs.avatarFrame.contentWindow.postMessage(
          JSON.stringify({
            target: "readyplayerme",
            type: "subscribe",
            eventName: "v1.**",
          }),
          "*"
        );
      }

      // Get avatar GLB URL
      if (json.eventName === "v1.avatar.exported") {
        console.log(`Avatar URL: ${json.data.url}`);

        this.$refs.avatarUrl.innerHTML = `Avatar URL: ${json.data.url}`;
        this.$refs.avatarFrame.frame.hidden = true;
      }

      // Get user id
      if (json.eventName === "v1.user.set") {
        console.log(
          `User with id ${json.data.id} set: ${JSON.stringify(json)}`
        );
      }
    },
  },
  created() {
    window.addEventListener("message", this.subscribe);
    document.addEventListener("message", this.subscribe);
  },
});
</script>

<style scoped></style>
