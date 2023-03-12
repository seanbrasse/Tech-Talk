// Exported object with methods for making API requests
export const Api = {
  // Function to make an API request
  call(url, method, body = {}) {
    // Create a data object with HTTP method and headers for JSON
    const data = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    // If there is a request body, add it to the data object
    if (Object.keys(body).length > 0) {
      data.body = JSON.stringify(body);
    }
    // Make the fetch request to the specified URL with the data object
    // and return the response as JSON
    return fetch(url, data).then(response => {
      return response.json();
    });
  },
  // Function to make a GET request
  get(url) {
    return this.call(url, 'get');
  },
  // Function to make a POST request
  post(url, body = {}) {
    return this.call(url, 'post', body);
  },
  // Function to make a DELETE request
  delete(url) {
    return this.call(url, 'delete');
  },
};
