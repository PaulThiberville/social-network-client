import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    all: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.all = action.payload;
    },
    removePost: (state, action) => {
      state.all = state.all.filter((post) => {
        return post._id !== action.payload;
      });
    },
    updatePostLikes: (state, action) => {
      state.all.forEach((post) => {
        if (post._id === action.payload._id) {
          post.likes = action.payload.likes;
        }
      });
    },
    addComment: (state, action) => {
      state.all.forEach((post) => {
        if (post._id === action.payload.post) {
          post.comments = [...post.comments, action.payload];
        }
      });
    },
    removeComment: (state, action) => {
      state.all.forEach((post) => {
        if (post._id === action.payload.post) {
          post.comments = post.comments.filter((comment) => {
            return comment._id !== action.payload._id;
          });
        }
      });
    },
    updateCommentLikes(state, action) {
      state.all.forEach((post) => {
        if (post._id === action.payload.post) {
          post.comments.forEach((comment) => {
            if (comment._id === action.payload._id) {
              comment.likes = action.payload.likes;
            }
          });
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPosts,
  removePost,
  updatePostLikes,
  addComment,
  removeComment,
  updateCommentLikes,
} = postsSlice.actions;

export default postsSlice.reducer;
