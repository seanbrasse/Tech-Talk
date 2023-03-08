import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { deleteComment, formatDate } from '../utils'

const Comment = ({ id, uuid, name, title, message, created, onDelete}) => {

    const handleDelete = () => {
        deleteComment(uuid, onDelete);
    }

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