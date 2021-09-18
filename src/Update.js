import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Update = () => {

  const {id} = useParams();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/blogs/${id}`)
      .then((res) => res.json())
      .then(data => {
        setTitle(data.title);
        setBody(data.body);
        setAuthor(data.author);
      });
  }, [id]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const blog = {title, body, author};
    
    setTimeout(() => {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
      })
      .then(() => {
        setIsPending(false);
        console.log('Blog Updated');
        history.push('/');
      });
    }, 1000);
  }

  return (
    <div className="create">
      <h2>Update the blog</h2>
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
        { isPending && <button disabled>Updating the blog...</button> }
      </form>
    </div>
  );
}
 
export default Update;