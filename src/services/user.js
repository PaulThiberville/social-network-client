exports.getOne = async (user, id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/` + id,
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
