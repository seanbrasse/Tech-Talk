import { Api } from "./api";

// A function to format a given date into a human-readable string
export const formatDate = (created) => {
    let date;
    // If a created date is provided, create a new date object with that date
    if (created) { 
        date = new Date(`${created} UTC`);
    } else {
        // If no created date is provided, use the current date
        date = new Date();
    }
    // Get the number of days between the current date and the given date
    const currentDate = new Date();
    const daysAgo = Math.ceil((currentDate - date) / (1000 * 60 * 60 * 24));

    // If the date is within the last 7 days, return a string with the day of the week and time
    if (daysAgo <= 7) {
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/New_York'});
      const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New_York'});
      return `${dayOfWeek} at ${time}`;
    } else {
      // If the date is older than 7 days, return a string with the formatted date and time
      const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
      const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      return `${formattedDate} at ${time}`;
    }
  }

// A function to create a new comment by sending a POST request to the server with the comment data
export const createComment = async (uuid, name, title, message) => {
  // Build the body data to be sent in the post request
  const body = { uuid, name, title, message };

  try {
    // Call the post method of the Api component with the URL and body data
    const response = await Api.post('http://localhost:3001/createComment', body);
    console.log(`Posted ${body.name}'s comment to the db`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// A function to delete a comment by sending a DELETE request to the server with the comment id
export const deleteComment = (id, onDelete) => {
    // Call the delete method of the Api component with the URL including the comment id
    Api.delete(`http://localhost:3001/deleteComment/${id}`)
      .then(() => {
        console.log(`entry at id ${id} has been deleted`);
        onDelete(id);
      })
      .catch(error => {
        console.log(error);
      });
  }
