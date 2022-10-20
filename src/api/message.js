export const createMessage = async (token, id, content) => {
  const response = await fetch(
    `https://strangers-things.herokuapp.com/api/2209-FTB-PT-WEB-FT/posts/${id}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content,
        },
      }),
    }
  );
  const result = await response.json();
  return result;
};
