import api from "./api";

export async function getComments(postId) {
    const response = await api.get(`posts/${postId}/comments`);

    return response.data;
}

export async function createComment(postId, content) {
    const response = await api.post(`posts/${postId}/comment`, { content });

    return response.data;
}

export async function toggleCommentLike(commentId) {
    const response = await api.put(`comments/${commentId}/like`);

    return response.data;
}