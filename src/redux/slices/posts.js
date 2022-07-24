import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create slice

const name = "posts";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const postsActions = { ...slice.actions, ...extraActions };
export const postsReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    posts: [],
    error: {},
    loading: false,
  };
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/post`;

  return {
    setHomePosts: setHomePosts(),
    setProfilePosts: setProfilePosts(),
    setFullPost: setFullPost(),
    addPost: addPost(),
    removePost: removePost(),
    likePost: likePost(),
    unlikePost: unlikePost(),
    addComment: addComment(),
    removeComment: removeComment(),
    likeComment: likeComment(),
    unlikeComment: unlikeComment(),
  };

  function setHomePosts() {
    return createAsyncThunk(`${name}/setHomePosts`, async (args) => {
      const res = await fetch(`${baseUrl}/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + args.user.token,
        },
      });
      if (!res.ok) throw new Error(res.status);
      return res.json();
    });
  }

  function setProfilePosts() {
    return createAsyncThunk(`${name}/setProfilePosts`, async (args) => {
      const res = await fetch(`${baseUrl}/user/${args.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + args.user.token,
        },
      });
      if (!res.ok) throw new Error(res.status);
      return res.json();
    });
  }

  function setFullPost() {
    return createAsyncThunk(`${name}/setFullPost`, async (args) => {
      const res = await fetch(`${baseUrl}/${args.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + args.user.token,
        },
      });
      if (!res.ok) throw new Error(res.status);
      return res.json();
    });
  }

  function addPost() {
    return createAsyncThunk(`${name}/addPost`, async (args) => {
      const res = await fetch(`${baseUrl}/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + args.user.token,
        },
        body: JSON.stringify({ text: args.text, imageUrl: args.imageUrl }),
      });
      if (!res.ok) throw new Error(res.status);
      return res.json();
    });
  }

  function removePost() {
    return createAsyncThunk(`${name}/removePost`, async (args) => {
      const res = await fetch(`${baseUrl}/${args.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + args.user.token,
        },
      });
      if (!res.ok) throw new Error(res.status);
      return res.json();
    });
  }

  function likePost() {
    return createAsyncThunk(`${name}/likePost`, async (args) => {
      const res = await fetch(`${baseUrl}/like/${args.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + args.user.token,
        },
      });
      if (!res.ok) throw new Error(res.status);
      return res.json();
    });
  }

  function unlikePost() {
    return createAsyncThunk(`${name}/unlikePost`, async (args) => {
      const res = await fetch(`${baseUrl}/unlike/${args.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + args.user.token,
        },
      });
      if (!res.ok) throw new Error(res.status);
      return res.json();
    });
  }

  function addComment() {
    return createAsyncThunk(`${name}/addComment`, async (args) => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/comment/${args.id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + args.user.token,
          },
          body: JSON.stringify({ text: args.text }),
        }
      );
      if (!res.ok) throw new Error(res.status);
      return res.json();
    });
  }

  function removeComment() {
    return createAsyncThunk(`${name}/removeComment`, async (args) => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/comment/${args.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + args.user.token,
          },
        }
      );
      if (!res.ok) throw new Error(res.status);
      return res.json();
    });
  }

  function likeComment() {
    return createAsyncThunk(`${name}/likeComment`, async (args) => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/comment/like/${args.id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + args.user.token,
          },
        }
      );
      if (!res.ok) throw new Error(res.status);
      return res.json();
    });
  }

  function unlikeComment() {
    return createAsyncThunk(`${name}/unlikeComment`, async (args) => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/comment/unlike/${args.id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + args.user.token,
          },
        }
      );
      if (!res.ok) throw new Error(res.status);
      return res.json();
    });
  }
}

function createExtraReducers() {
  return {
    ...setHomePosts(),
    ...setProfilePosts(),
    ...setFullPost(),
    ...addPost(),
    ...removePost(),
    ...likePost(),
    ...unlikePost(),
    ...addComment(),
    ...removeComment(),
    ...likeComment(),
    ...unlikeComment(),
  };

  function setHomePosts() {
    var { pending, fulfilled, rejected } = extraActions.setHomePosts;
    return {
      [pending]: (state) => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      },
      [rejected]: (state, action) => {
        state.loading = false;
      },
    };
  }

  function setProfilePosts() {
    var { pending, fulfilled, rejected } = extraActions.setProfilePosts;
    return {
      [pending]: (state) => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.posts = action.payload;
      },
      [rejected]: (state, action) => {
        state.loading = false;
      },
    };
  }

  function setFullPost() {
    var { pending, fulfilled, rejected } = extraActions.setFullPost;
    return {
      [pending]: (state) => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.posts = [action.payload];
      },
      [rejected]: (state, action) => {
        state.loading = false;
      },
    };
  }

  function likePost() {
    var { pending, fulfilled, rejected } = extraActions.likePost;
    return {
      [pending]: (state) => {},
      [fulfilled]: (state, action) => {
        state.posts.forEach((post) => {
          if (post._id === action.payload._id) {
            post.likes = action.payload.likes;
          }
        });
      },
      [rejected]: (state, action) => {},
    };
  }

  function unlikePost() {
    var { pending, fulfilled, rejected } = extraActions.unlikePost;
    return {
      [pending]: (state) => {},
      [fulfilled]: (state, action) => {
        state.posts.forEach((post) => {
          if (post._id === action.payload._id) {
            post.likes = action.payload.likes;
          }
        });
      },
      [rejected]: (state, action) => {},
    };
  }

  function addPost() {
    var { pending, fulfilled, rejected } = extraActions.addPost;
    return {
      [pending]: (state) => {},
      [fulfilled]: (state, action) => {
        state.posts = [...state.posts, action.payload];
      },
      [rejected]: (state, action) => {},
    };
  }

  function removePost() {
    var { pending, fulfilled, rejected } = extraActions.removePost;
    return {
      [pending]: (state) => {},
      [fulfilled]: (state, action) => {
        state.posts = [...state.posts].filter((post) => {
          return post._id !== action.payload._id;
        });
      },
      [rejected]: (state, action) => {},
    };
  }

  function addComment() {
    var { pending, fulfilled, rejected } = extraActions.addComment;
    return {
      [pending]: (state) => {},
      [fulfilled]: (state, action) => {
        state.posts.forEach((post) => {
          if (post._id === action.payload.post) {
            post.comments = [...post.comments, action.payload];
          }
        });
      },
      [rejected]: (state, action) => {},
    };
  }
  function removeComment() {
    var { pending, fulfilled, rejected } = extraActions.removeComment;
    return {
      [pending]: (state) => {},
      [fulfilled]: (state, action) => {
        state.posts.forEach((post) => {
          if (post._id === action.payload.post) {
            post.comments = post.comments.filter((comment) => {
              return comment._id !== action.payload._id;
            });
          }
        });
      },
      [rejected]: (state, action) => {},
    };
  }

  function likeComment() {
    var { pending, fulfilled, rejected } = extraActions.likeComment;
    return {
      [pending]: (state) => {},
      [fulfilled]: (state, action) => {
        state.posts.forEach((post) => {
          if (post._id === action.payload.post) {
            post.comments.forEach((comment) => {
              if (comment._id === action.payload._id) {
                comment.likes = action.payload.likes;
              }
            });
          }
        });
      },
      [rejected]: (state, action) => {},
    };
  }

  function unlikeComment() {
    var { pending, fulfilled, rejected } = extraActions.unlikeComment;
    return {
      [pending]: (state) => {},
      [fulfilled]: (state, action) => {
        state.posts.forEach((post) => {
          if (post._id === action.payload.post) {
            post.comments.forEach((comment) => {
              if (comment._id === action.payload._id) {
                comment.likes = action.payload.likes;
              }
            });
          }
        });
      },
      [rejected]: (state, action) => {},
    };
  }
}
