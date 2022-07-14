exports.createPost = async (user, text, imageUrl) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/post/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({ text, imageUrl }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(await response.json());
    }
  } catch (error) {
    return { error: error };
  }
};

exports.getAllPosts = async (user) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/post/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.json());
    }
  } catch (error) {
    return { error: error };
  }
};

exports.getAllPostsByUser = async (user, id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/post/user/` + id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.json());
    }
  } catch (error) {
    return { error: error };
  }
};

exports.getOnePost = async (user, id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/post/` + id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.json());
    }
  } catch (error) {
    return { error: error };
  }
};

exports.likePost = async (user, id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/post/like/` + id,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.json());
    }
  } catch (error) {
    return { error: error };
  }
};

exports.unlikePost = async (user, id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/post/unlike/` + id,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.json());
    }
  } catch (error) {
    return { error: error };
  }
};

exports.deletePost = async (user, id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/post/` + id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.json());
    }
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
