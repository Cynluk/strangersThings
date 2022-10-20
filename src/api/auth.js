export async function registerUser(username, password) {
  const response = await fetch(
    `https://strangers-things.herokuapp.com/api/2209-FTB-PT-WEB-FT/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    }
  );
  const result = await response.json();
  return result;
}

export async function fetchMe(token) {
  const response = await fetch(
    `https://strangers-things.herokuapp.com/api/2209-FTB-PT-WEB-FT/users/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result = await response.json();
  return result;
}

export async function loginUser(username, password) {
  const response = await fetch(
    `https://strangers-things.herokuapp.com/api/2209-FTB-PT-WEB-FT/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    }
  );
  const result = await response.json();
  return result;
}
