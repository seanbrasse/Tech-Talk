// Import necessary dependencies and utility functions
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { deleteComment, formatDate } from '../utils'

// Define the Comment component as a functional component that accepts props
const Comment = ({ id, uuid, name, title, message, created, onDelete}) => {

    // Define function to handle deletion of comment
    const handleDelete = () => {
        deleteComment(uuid, onDelete);
    }

    // Render the comment details, including title, message, author, and trash icon for deletion
    return (
        <div className='comment'>
            <h2>{title}</h2>
            <p className='message'>{message}</p>
            <div className='author'>
                <h4>{name} on {formatDate(created)}</h4>
                <FontAwesomeIcon className='trash' icon={faTrash} onClick={handleDelete} data-testid="delete-button" />
            </div>
        </div>
    )
}

export default Comment
