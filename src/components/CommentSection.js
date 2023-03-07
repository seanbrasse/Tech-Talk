import React from 'react'
import Comment from './Comment';

const CommentSection = ({comments, setComments}) => {

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
          <div className='commentTitle'>
            <h1 className='commentFeed'>Comment Feed</h1>
          </div>
        <div>
          {commentList.length > 0 ? commentList : <h3 className='noComments'>There are no comments to show, get us started!</h3>}
        </div>
    </section>
    )
}

export default CommentSection