import { useParams } from "react-router-dom";

export function PostDetailPage() {
  const { postId } = useParams(); // I need this to get "123" from the url

  return (
    <div className="post-detail">
      <h2>Post Details</h2>
      <p>Now viewing post ID: <strong>{postId}</strong></p>
      <div style={{ border: '1px solid #ddd', padding: '15px', marginTop: '10px' }}>
        <h3>Is React Router the best?</h3>
        <p>This is the content of the post. Its very insightful.</p>
      </div>
      <hr />
      <h4>Replies</h4>
      <ul>
        <li>UserA: Totally agree!</li>
        <li>UserB: Have you tried TanStack Router?</li>
      </ul>
    </div>
  );
}