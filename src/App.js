import './style.css';
import Navbar from './components/Navbar';
import Input from './components/Input';
import React, {useState, useEffect } from 'react';
import CommentSection from './components/CommentSection';

const App = () => { 
  // Using state hook to initialize the 'comments' state variable with an empty array
  const [comments, setComments] = useState([])

  // Fetching all comments from the database and setting the 'comments' state variable with the response
  useEffect(() => {
    fetch('http://localhost:3001/getComments')
      .then(response => response.json())
      .then(data => {
        setComments(data)
        console.log("Fetched all comments from the db")
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Function to handle new comments being submitted and adding them to the 'comments' state variable
  const handleNewComment = (newComment) => {
    setComments([newComment, ...comments]) // This appends the new comments to our state of comments in order of newest to oldest (oldest being fetched from the db)
    console.log(comments)
  }

  // Returning the main application components and passing in necessary props
  return (
    <div className="App">
      <Navbar />
      <Input handleNewComment={handleNewComment} />
      <CommentSection comments={comments} setComments={setComments}/>
    </div>
  );
}

export default App;
