<template>
    <div v-if="isOpen" @click="handleOverlayClick" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div @click.stop class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  
  defineProps({
    isOpen: {
      type: Boolean,
      required: true
    }
  });

  const emit = defineEmits(['closeModal']);

  const handleOverlayClick = () => {
  emit('closeModal');
};
  </script>
  
  
  