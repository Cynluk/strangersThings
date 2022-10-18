export const fetchAllPosts = async () => {
  const response = await fetch(
    `https://strangers-things.herokuapp.com/api/2209-PT-FTB-WEB-FT/posts`
  );
  const result = await response.json();
  return result;
};

export const fetchPostById = async(id) => {
  const response = await fetch (
    `https://strangers-things.herokuapp.com/api/2209-PT-FTB-WEB-FT/posts/${id}`,
    
  );
  const result = await response.json();
  return result;
};

export const createPost = async (token,title,description,price,willDeliver)=>{
  const repsonse = await fetch (
    `https://strangers-things.herokuapp.com/api/2209-PT-FTB-WEB-FT/posts`,
    {
      method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    post: {
      title,
      description,
      price,
      willDeliver,
      }}),
    })
    const result = await response.json();
    return result;
  
  };

  export const editPost = async (id,token,title,description,price,willDeliver)=>{
    const repsonse = await fetch (
      `https://strangers-things.herokuapp.com/api/2209-PT-FTB-WEB-FT/posts/${id}`,
      {
        method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      post: {
        title,
        description,
        price,
        willDeliver,
        }}),
      })
      const result = await response.json();
      return result;
    
    };



