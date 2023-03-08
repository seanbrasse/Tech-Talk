import { Api } from "./api";

export const formatDate = (created) => {
    let date;
    if (created) { //Since we are storing new comments in our local state and not fetching them, we need to append the date to them. 
        date = new Date(`${created} UTC`);
    } else {
        date = new Date();
    }
    const currentDate = new Date();
    const daysAgo = Math.ceil((currentDate - date) / (1000 * 60 * 60 * 24));

    if (daysAgo <= 7) {
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/New_York'});
      const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New_York'});
      return `${dayOfWeek} at ${time}`;
    } else {
      const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
      const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      return `${formattedDate} at ${time}`;
    }
  }

  

export const createComment = async (uuid, name, title, message) => {
  // Build the body data to be sent in the post request
  const body = { uuid, name, title, message };

  try {
    // Call the post method of the Api component
    const response = await Api.post('http://localhost:3001/createComment', body);
    console.log(`Posted ${body.name}'s comment to the db`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteComment = (id, onDelete) => {
    Api.delete(`http://localhost:3001/deleteComment/${id}`)
      .then(() => {
        console.log(`entry at id ${id} has been deleted`);
        onDelete(id);
      })
      .catch(error => {
        console.log(error);
      });
  }

