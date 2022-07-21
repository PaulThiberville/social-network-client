import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create slice

const name = "user";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const userReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    user: {},
  };
}

function createReducers() {
  return {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      localStorage.setItem("user", JSON.stringify({}));
      state.user = {};
    },
  };
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/user`;

  return {
    login: login(),
    register: register(),
  };

  function login() {
    return createAsyncThunk(`${name}/login`, async (args) => {
      const res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: args.email, password: args.password }),
      }).then((data) => data.json());
      if (res.error) throw new Error(res.error);
      return res;
    });
  }

  function register() {
    return createAsyncThunk(`${name}/register`, async (args) => {
      const res = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: args.userName,
          email: args.email,
          password: args.password,
        }),
      }).then((data) => data.json());
      if (res.error) throw new Error(res.error);
      return res;
    });
  }
}

function createExtraReducers() {
  return {
    ...login(),
    ...register(),
  };

  function login() {
    var { pending, fulfilled, rejected } = extraActions.login;
    return {
      [pending]: (state) => {},
      [fulfilled]: (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.user = action.payload;
      },
      [rejected]: (state, action) => {},
    };
  }

  function register() {
    var { pending, fulfilled, rejected } = extraActions.register;
    return {
      [pending]: (state) => {},
      [fulfilled]: (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.user = action.payload;
      },
      [rejected]: (state, action) => {},
    };
  }
}
