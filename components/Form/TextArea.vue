<template>
    <textarea
      v-model="modelValue"
      :placeholder="placeholder"
       :class="['mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-[1px]', customClass]"
      rows="4"
    ></textarea>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  // Concise update function using destructuring (optional)
  const updateValue = (event: Event) => {
    const { value } = event.target as HTMLTextAreaElement;
    emit('update:modelValue', value);
  };
  </script>
  