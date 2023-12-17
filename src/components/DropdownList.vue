<template>
  <div :class="['flex', align]">
    <div>
      <div class="dropdown relative min-w-[200px]" v-click-out-side="outside">
        <a
          class="dropdown-toggle px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase shadow-md bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex justify-between items-center whitespace-nowrap"
          href="#"
          type="button"
          @click.prevent="showActionDropDown = !showActionDropDown"
        >
          Actions
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="caret-down"
            class="w-2 ml-2"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
            ></path>
          </svg>
        </a>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <ul
            @click.prevent="inside"
            :class="[
              'dropdown-menu min-w-[200px] absolute bg-gray-800 bg-opacity-50 text-base z-50 float-left py-2 list-none text-left shadow-lg mt-1 m-0 bg-clip-padding border-none',
              showActionDropDown ? '' : 'hidden',
            ]"
          >
            <slot></slot>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import clickOutSide from "@mahdikhashan/vue3-click-outside";

export default {
  name: "DropdownList",
  props: ["align"],
  directives: {
    clickOutSide,
  },
  data() {
    return {
      showActionDropDown: false,
    };
  },
  methods: {
    outside() {
      this.showActionDropDown = false;
    },

    inside() {
      this.showActionDropDown = false;
    },
  },
};
</script>

<style scoped></style>
