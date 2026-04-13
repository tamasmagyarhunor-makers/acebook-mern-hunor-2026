const Message = ({ user, text }) => (
  <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
    <strong>{user}</strong>: {text}
  </div>
);

export function MessagesPage() {
  return (
    <div>
      <h2>Messages</h2>
      <Message user="Alice" text="Hey, did you see that post?" />
      <Message user="Bob" text="The new React Router is cool." />
      <Message user="Charlie" text="Meeting at 5?" />
    </div>
  );
}