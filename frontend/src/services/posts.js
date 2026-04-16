import api from "./api"; // axios instance is taking over handling the api requests
// to deal with adding the token to every request, keeping our code DRY

export async function getPosts() {
  const response = await api.get("/posts");
  return response.data;
}

export async function getPost(postId) {
  const response = await api.get(`/posts/${postId}`);
  return response.data;
}

export async function createPost(message) {
  // axios will handle JSON.stringify and content-typeq automatically
  const response = await api.post("/posts", { message });
  return response.data;
}

export async function togglePostLike(postId) {
  const response = await api.put(`/posts/${postId}/like`);
  return response.data;
}
