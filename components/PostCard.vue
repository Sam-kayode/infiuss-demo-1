<template>
    <div class="border p-4 mt-4 rounded-2xl relative w-fit">
        <div :style="backgroundImageStyle" class="w-[400px] h-[400px] rounded-2xl"></div>
        <p class="text-[18px] mt-6">{{ post.content }}</p>
        <div class="text-sm text-gray-500 mt-2">
            <p class="mb-3">Created at: {{ new Date(post.createdAt).toLocaleString() }}</p>
            <p class="mb-3">Last updated: {{ new Date(post.updatedAt).toLocaleString() }}</p>
        </div>
        <div class="flex mt-2 justify-between">
            <div>
                <Button @click="editPost" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</Button>
                <Button @click="deletePost" class="bg-red-500 text-white px-2 py-1 rounded">Delete</Button>
            </div>
            <Button @click="toggleFavorite" class="ml-3">
                <span :class="{ 'text-yellow-600': post.favorite, 'text-gray-500': !post.favorite }"
                    class="text-3xl">★</span>
            </Button>
        </div>
        <Modal :is-open="showEditPostModal" @close-modal="editPost">
            <PostCreateEdit :postId="post.id" edit/>
        </Modal>
    </div>
</template>

<script setup lang="ts">
const postStore = usePostStore();
const {showEditPostModal } = storeToRefs(postStore)

const props = defineProps<{
    post: {
        id: number;
        content: string;
        picture?: string;
        createdAt: string;
        updatedAt: string;
        favorite: boolean;
    };
}>();

const dummyImage = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"

const backgroundImageStyle = computed(() => ({
    backgroundImage: `url(${props.post.picture ? props.post.picture : dummyImage})`,
    backgroundSize: 'cover', // Optionally add background size, position, etc.
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
}));

const editPost = () => {
    showEditPostModal.value = !showEditPostModal.value
};

const deletePost = () => {
    if (confirm('Are you sure you want to delete this post?')) {
        postStore.deletePost(props.post.id);
    }
};

const toggleFavorite = () => {
    postStore.toggleFavorite(props.post.id);
};
</script>