import { Api } from "./api";

export const formatDate = (created) => {
    const date = new Date(`${created} UTC`); //This should ensure the date is interpreted at UTC and is more easily converted
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

  

export const createComment = async (name, title, message) => {
  // Build the body data to be sent in the post request
  const body = { name, title, message };

  try {
    // Call the post method of the Api component
    const response = await Api.post('http://localhost:3001/createComment', body);
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

