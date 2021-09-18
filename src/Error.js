import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <h2>Page not found...</h2>
      <Link to='/'>Go back to HomePage</Link>
    </div>
  );
}
 
export default Error;