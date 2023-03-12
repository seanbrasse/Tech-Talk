import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Navbar = () => {

    return (
        <div className='nav'>
            <FontAwesomeIcon className='chat' icon={faMessage} />
            <h1> Tech Talk </h1>
        </div>
    )
}

export default Navbar 