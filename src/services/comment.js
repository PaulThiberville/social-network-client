exports.createComment = async (user, text, id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/comment/` + id,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({ text: text }),
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(await response.json());
    }
  } catch (error) {
    return error;
  }
};

exports.likeComment = async (user, id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/comment/like/` + id,
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

exports.unlikeComment = async (user, id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/comment/unlike/` + id,
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

exports.deleteComment = async (user, id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/comment/` + id,
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
    return { error: error };
  }
};
