import {React, useState} from 'react'
import { createComment } from '../utils'
import TextInput from './TextInput'

const Input = ({handleNewComment}) => {

    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [showPopup, setShowPopup] = useState(false)

    const handleNameChange = (event) => {
        setName(event.target.value);
        if (name && message) {
          setShowPopup(false)
        }
      };

      const handleTitleChange = (event) => {
        setTitle(event.target.value);

      };
    
      const handleMessageChange = (event) => {
        setMessage(event.target.value);
        if (name && message) {
          setShowPopup(false)
        }
      };

    const handleSubmit = (event) => {
      if (!name || !message){    
        setShowPopup(true)
        return;
      }
      createComment(name, title, message)
        .then(() => {
          handleNewComment({id: Math.random(), name, title, message})
          setName('')
          setTitle('')
          setMessage('')
        })
        .catch((error) => console.log(error));
    };

    return (
        <section className='inputSection'>
            <div className='inputs'>
              <h2>Share Your Latest Tech News Here</h2>
              <TextInput
                  value = {name} 
                  placeholder = {"Add your name here"}
                  className = "nameInput" 
                  maxChar = {70} 
                  rows = {1} 
                  onChange = {handleNameChange}
              />
               <TextInput
                  value = {title} 
                  placeholder = {"Add your title here (optional)"}
                  className = "nameInput" 
                  maxChar = {160} 
                  rows = {2} 
                  onChange = {handleTitleChange}
              />
              <TextInput
                  value = {message} 
                  placeholder = {"Add your comment here"} 
                  className = "messageInput"
                  rows = {10} 
                  maxChar = {900}
                  onChange = {handleMessageChange}
              />
          </div>
          {showPopup && (
                <div className='popup'>
                  <h3>Name and Message Fields are Required!</h3>
                </div>
              )}
          <button className='submit' onClick={(event) => handleSubmit(event)}>
                  <h2>Comment</h2>
          </button>
        </section>
    )
}

export default Input