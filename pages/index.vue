<template>
    <div>
        <Navbar />
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
            <PostCard v-for="(post, i ) in posts" :post="post" :key="i" />
        </div>
       <NoPosts v-if="!posts.length"/>
        <Modal :is-open="showCreatePostModal" @close-modal="toggleCreateModal">
            <PostCreateEdit />
        </Modal>
    </div>
</template>
<script lang="ts" setup>
const postStore = usePostStore();
const { posts, showCreatePostModal } = storeToRefs(postStore)

const toggleCreateModal = () => {
    showCreatePostModal.value = !showCreatePostModal.value
}
</script>