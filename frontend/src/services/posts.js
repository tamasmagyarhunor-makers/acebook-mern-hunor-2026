// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getPosts(token) {
  console.log("token in getPosts service: ", token);
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
}

export async function getPost(postId, token) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/${postId}`, requestOptions);

  const data = await response.json();
  return data;
}

export async function createPost(message, token) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({message: message})
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  const data = await response.json();
  return data;
}

export async function togglePostLike(postId, token) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/${postId}/like`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to toggle like");
  }

  const data = await response.json();
  return data;
}
