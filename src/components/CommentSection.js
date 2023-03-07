import React, { useEffect } from 'react'
import Comment from './Comment';

const CommentSection = ({comments, setComments}) => {
  
  useEffect(() => {
    fetch('http://localhost:3001/getComments')
      .then(response => response.json())
      .then(data => setComments(data));

  }, [comments, setComments]);

  const handleDelete = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  }


  const commentList = comments.map((comment) => {
    return (
      <Comment 
        key = {comment.id}
        id = {comment.id}
        onDelete={handleDelete}
        {...comment}
      />
    )
  })

  return (
    <section className='commentSection'>
        <h1 className='commentTitle'>Comment Feed</h1>
        {commentList.length > 0 ? commentList : <h3 className='noComments'>There are no comments to show, get us started!</h3>}
    </section>
    )
}

export default CommentSection