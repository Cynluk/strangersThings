export const fetchAllPosts = async () => {
  const response = await fetch(
    `https://strangers-things.herokuapp.com/api/2209-PT-FTB-WEB-FT/posts`
  );
  const result = await response.json();
  return result;
};

export const fetchPostById = async (id) => {
  const response = await fetch(
    `https://strangers-things.herokuapp.com/api/2209-PT-FTB-WEB-FT/posts/${id}`
  );
  const result = await response.json();
  return result;
};

export const createPost = async (
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  const response = await fetch(
    `https://strangers-things.herokuapp.com/api/2209-PT-FTB-WEB-FT/posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    }
  );
  const result = await response.json();
  return result;
};

export const editPost = async (
  id,
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  const response = await fetch(
    `https://strangers-things.herokuapp.com/api/2209-PT-FTB-WEB-FT/posts/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    }
  );
  const result = await response.json();
  return result;
};

export const deletePost = async (
  token,
  id

  // title,
  // description,
  // price,
  // willDeliver
) => {
  const response = await fetch(
    `https://strangers-things.herokuapp.com/api/2209-PT-FTB-WEB-FT/posts/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result = await response.json();
  return result;
};
