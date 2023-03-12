import React from 'react'
import Comment from './Comment';

const CommentSection = ({comments, setComments}) => {

  // a function that removes a comment from the list of comments when the user clicks the trash icon
  const handleDelete = (uuid) => {
    setComments(comments.filter(comment => comment.uuid !== uuid));
  }

  // maps through the list of comments and creates an array of Comment components
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

  
  //The second child div element contains the list of Comment components. If there are no comments to show,
  // a h3 element with a className of 'noComments' is displayed instead
  return (
    <section className='commentSection'>
      <div className='commentTitle'>
        <h1 className='commentFeed'>Comment Feed</h1>
      </div>
      <div className='feed'>
        {commentList.length > 0 ? commentList : <h3 className='noComments'>There are no comments to show, get us started!</h3>}
      </div>
    </section>
  )
}

export default CommentSection
