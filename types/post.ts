export interface Post {
    id: number;
    content: string;
    picture?: string;
    favorite: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

 export interface PostStore {
    posts: Post[];
    showCreatePostModal: boolean;
    showCreateEditModal?: boolean;
  }