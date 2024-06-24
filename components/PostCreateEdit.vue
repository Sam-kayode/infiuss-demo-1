<template>
    <h2 class="text-[24px] mb-4 font-medium">{{ edit ? "Edit " : "Create " }}post</h2>
    <form @submit.prevent="submitForm">
        <!-- Text area input for post content, using custom TextArea component -->
        <textarea v-model="content" class="border p-2 w-full border-gray-300 rounded" rows="4"
            placeholder="What's on your mind?"></textarea>

        <!-- File input for uploading a picture -->
        <input :key="fileInputKey" type="file" @change="handleFileUpload" class="mt-2" />

        <!-- Display the picture preview if a picture is uploaded -->
        <div v-if="picturePreview" class="mt-2 border-red-500 relative w-fit">
            <div class="py-1 px-2 rounded-full bg-red-600 w-fit absolute -top-[10px] -right-[10px] font-bold cursor-pointer"
                @click="deletePreview()">&#x2715;</div>
            <img :src="picturePreview" alt="Picture preview" class="max-w-full rounded border-red-500" />
        </div>
        <br>

        <!-- Submit button to submit the form, using custom Button component -->
        <Button type="submit" class="mt-2 text-white p-2 rounded" variant="primary"
            :disabled="content.length < 1">Submit</Button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePostStore } from '~/stores/posts';
import Button from './Form/Button.vue';
import type { Post } from '~/types/post';

const { $toast } = useNuxtApp()
// Define props to accept postId if editing an existing post
const props = defineProps<{
    postId?: number;
    edit?: boolean;
}>();

// State variables for form inputs
const content = ref('');
const picture = ref<File | null>(null);
const picturePreview = ref<string | null>(null);
const fileInputKey = ref(Date.now()); // Key to reset file input
// Access the post store to manage posts
const postStore = usePostStore();

// If postId is provided, find the post and set its content and picture for editing
if (props.postId !== undefined) {
    const post = postStore.posts.find((post: Post) => post.id === props.postId);
    if (post) {
        content.value = post.content;
        picturePreview.value = post.picture || null;
    }
}

// Handle file upload and generate a preview URL for the picture
const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
        picture.value = target.files[0];
        picturePreview.value = URL.createObjectURL(picture.value);
    }
};

// Function to submit the form, either creating or updating a post
const submitForm = async () => {
    let pictureUrl: string | undefined;
    // Upload the picture if it is provided
    if (picture.value) {
        pictureUrl = await uploadPicture(picture.value);
    }

    // If editing a post, update it. Otherwise, create a new post.
    if (props.postId !== undefined) {
        postStore.updatePost(props.postId, content.value, pictureUrl);
        $toast.success('Post updated !');
    } else {
        postStore.createPost(content.value, pictureUrl);
        // Reset the form inputs after submission
        content.value = '';
        picture.value = null;
        picturePreview.value = null;
        fileInputKey.value = Date.now()
        $toast.success('Post created !');
    }

    // Closing the modal after a successful post creation
    setTimeout(() => {
        postStore.showCreatePostModal = false
        postStore.showEditPostModal = false
    }, 1000);
};

// Simulate picture upload and return a URL (replace with actual upload function)
const uploadPicture = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(URL.createObjectURL(file));
        }, 1000);
    });
};

const deletePreview = () => {
    picture.value = null
    picturePreview.value = null
    fileInputKey.value = Date.now();
}
</script>