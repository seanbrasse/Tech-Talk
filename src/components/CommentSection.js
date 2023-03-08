import React from 'react'
import Comment from './Comment';

const CommentSection = ({comments, setComments}) => {

  const handleDelete = (uuid) => {
    setComments(comments.filter(comment => comment.uuid !== uuid));
  }

  const commentList = comments.map((comment) => {
    return (
      <Comment 
        key = {comment.uuid}
        id = {comment.uuid}
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