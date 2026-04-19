// import { useState } from "react";

const LikeButton = ({ likes = [], onToggle, currentUserId }) => {
  // see if user liking already liked this?
  const isLiked = likes.includes(currentUserId);

  return (
    <button 
      onClick={(e) => {
        e.stopPropagation(); // dont navigate to the post when only clicking the like/unlike
        onToggle();
      }} 
      style={{
        ...styles.likeBtn,
        color: isLiked ? '#ff4b2b' : '#888',
        fontWeight: isLiked ? 'bold' : 'normal'
      }}
    >
      {isLiked ? '❤️' : '🤍'} {likes.length}
    </button>
  );
};

const styles = {
  likeBtn: {
    backgroundColor: '#f0f2f5',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '6px 12px',
    transition: 'background 0.2s',
    height: '32px'
  }
};

export default LikeButton;