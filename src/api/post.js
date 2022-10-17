export const fetchAllPosts = async () => {
  const response = await fetch(
    `https://strangers-things.herokuapp.com/api/2209-PT-FTB-WEB-FT/posts`
  );
  const result = await response.json();
  return result;
};

// export const viewPostById = async (id) => {
//   const response = await fetch(
//     `https://strangers-things.herokuapp.com/api/2209-PT-FTB-WEB-FT/posts${id}`,{
//     method: "PATCH",
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer TOKEN_STRING_HERE'
//   },
//   body: JSON.stringify({
//     post: {
//       title,
//       description,
//       price,
//       location,
//       willDeliver,})
//   };const result = await response.json());
//   return result;
//   };
