import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Anonymous');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {title, body, author};

    setIsPending(true);

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    })
    .then(() => {
      setIsPending(false);
      console.log('New Blog Added');
      history.push('/');
    });
  }

  return (
    <div className="create">
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}>
        </textarea>
        <select
        value={author}
        onChange={(e) => setAuthor(e.target.value)}>
        <option value="Anonymous">Anonymous</option>
          <option value="Mario">Mario</option>
          <option value="Toka">Toka</option>
        </select>
        { !isPending && <button>Submit</button> }
        { isPending && <button disabled>Adding the blog...</button> }
      </form>
    </div>
  );
}
 
export default Create;