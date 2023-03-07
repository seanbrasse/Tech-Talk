import './style.css';
import Navbar from './components/Navbar';
import Input from './components/Input';
import React, {useState } from 'react';
import CommentSection from './components/CommentSection';


const App = () => { 

  const [comments, setComments] = useState([])

  const handleNewComment = (newComment) => {
    setComments([...comments, newComment])
  }

  return (
    <div className="App">
      <Navbar />
      <Input handleNewComment={handleNewComment} />
      <CommentSection comments={comments} setComments={setComments}/>
    </div>
  );
}

export default App;
