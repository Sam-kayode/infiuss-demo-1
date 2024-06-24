<template>
    <div class="flex justify-between p-4 border-b-2">
        <img src="/images/logo.svg" alt="">
        <div class="flex">
            <FormButton class="" @click="toggleCreateModal">+ New post</FormButton>
        </div>

    </div>
</template>

<script lang="ts" setup>
const postStore = usePostStore();
const { showCreatePostModal } = storeToRefs(postStore)

const toggleCreateModal = () => {
    showCreatePostModal.value = !showCreatePostModal.value
}
</script>