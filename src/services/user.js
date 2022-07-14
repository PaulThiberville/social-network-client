exports.register = async (userName, email, password) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(await response.json());
    }
  } catch (error) {
    return { error: error };
  }
};

exports.login = async (email, password) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(await response.json());
    }
  } catch (error) {
    return { error: error };
  }
};

exports.getOne = async (user, id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/` + id,
      {
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
      throw new Error(await response.json());
    }
  } catch (error) {
    return { error: error };
  }
};
