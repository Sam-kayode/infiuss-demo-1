<template>
  <button :class="[
    'inline-flex items-center px-4 py-2 border border-transparent text-[18px] rounded-[6px] font-inter',
    buttonClass,
    {
      'bg-primary-blue text-white hover:bg-primary-blue-hover': variant === 'primary',
      'cursor-not-allowed opacity-50': disabled
    }
  ]" :disabled="disabled" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  buttonClass: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['click']);

const handleClick = (event: Event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>