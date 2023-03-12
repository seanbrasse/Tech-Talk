import React, {useState} from 'react'
import { createComment } from '../utils'
import TextInput from './TextInput'
import { v4 as uuidv4 } from 'uuid';

const Input = ({handleNewComment}) => {

    // Using state hooks to manage the state of the input fields and pop-up window.
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [showPopup, setShowPopup] = useState(false)

    // Generating a unique ID for each comment using UUID
    const uuid = uuidv4(); 

    // Function to handle changes in the name input field.
    const handleNameChange = (event) => {
        setName(event.target.value);
        if (name && message) {
          setShowPopup(false)
        }
      };

    // Function to handle changes in the title input field.
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
      };
    
    // Function to handle changes in the message input field.
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
        if (name && message) {
          setShowPopup(false)
        }
      };

    // Function to handle form submission.
    const handleSubmit = (event) => {
      console.log("Clicked submit")
      if (!name || !message){    
        setShowPopup(true)
        return;
      }
      createComment(uuid, name, title, message)
        .then(() => {
          handleNewComment({uuid, name, title, message})
          setName('')
          setTitle('')
          setMessage('')
        })
        .catch((error) => console.log(error));
    };

    // Returns a section containing input fields and a button for submitting comments.
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
          
          {/* Displays an error message if name and message fields are empty on form submission. */}
          {showPopup && (
                <div className='popup'>
                  <h3>Name and Message Fields are Required!</h3>
                </div>
              )}
          
          {/* Button to submit the comment form */}
          <button className='submit' onClick={(event) => handleSubmit(event)}>
                  <h2>Comment</h2>
          </button>
        </section>
    )
}

export default Input
