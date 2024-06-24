import type { Post, PostStore } from "~/types/post";


export const usePostStore = defineStore("postStore", {
  state: () => ({
    posts: [] as Post[],
    showCreatePostModal: false,
    showEditPostModal: false,
  } as PostStore),
  actions: {
    createPost(content: string, picture?: string) {
      const id = this.posts.length
        ? this.posts[this.posts.length - 1]?.id + 1
        : 1;
      const newPost: Post = {
        id,
        content,
        picture,
        favorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.posts.push(newPost);
    },

    updatePost(id: number, content: string, picture?: string) {
      const post = this.posts.find((post) => post.id === id);
      if (post) {
        post.content = content;
        if (picture !== undefined) {
          post.picture = picture;
        }
        post.updatedAt = new Date();
      }
    },

    deletePost(id: number) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },

    toggleFavorite(id: number) {
      const post = this.posts.find((post) => post.id === id);
      if (post) {
        post.favorite = !post.favorite;
      }
    },
  },
});
