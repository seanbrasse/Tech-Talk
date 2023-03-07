# Front-end Choose Your Own Adventure Take-Home

Design and build a comments feed:

- [x] that displays all comments  
- [x] notifies a user in real-time when new comments are added

Here is the data schema for a Comment:
* id: INTEGER
* name: TEXT
* created: DATETIME
* message: TEXT

Here are the API endpoints:
* Create a comment: /createComment (POST)
* Retrieve all comments: /getComments (GET)
* Retrieve a comment: /getComment (GET)
* Delete all comments: /deleteComments (DELETE)
  * This is useful for purging data

This is a basic wireframe, you can change the layout. While you won't be screened as a product designer, make sure you build a good user experience. If you decide to use a third-party design system, be prepared to discuss your decision.

![Basic wireframe](wireframe.png)

- Please write unit tests and handle errors where you see fit.

## Engineering Style

We do not expect you to have expertise in all the topics that encapsulate front-end web development. We recognize that some folks are specialists and others are generalists!

### Specialist

If there's a particular topic you enjoy, you can focus your assignment solution on that!

Some examples include:
* Performance optimizations
* Accessibility
* Integration testing

### Generalist

- If you're a generalist, you can focus more on building the minimum viable product described above with the wireframe!


## Interview Details

We have already set up an API client for a Node Express server that stores comments in SQLite.

You have the option of doing the assignment with or without a front-end JS framework.

If you decide to use a framework, we recommend the following boilerplates:
* [facebook/create-react-app](https://github.com/facebook/create-react-app)
* [vuejs/vue-cli](https://github.com/vuejs/vue-cli)
* [angular/angular-cli](https://github.com/angular/angular-cli)
* [ember-cli/ember-cli](https://github.com/ember-cli/ember-cli)

Be prepared to have a discussion about your implementation. Here are some example discussion questions:
- How can you optimize fetching new comments in real-time?
- Are there any restrictions we should place on the comment input?

We recommend spending up to four hours on this assignment. If you don't get every piece you hoped completed done in the timeframe, that's alright! We'll be having an hour long discussion on your thought processes and where you might spend more time, and that discussion is a key part of our evaluation!

## Usage

### Run in Development and Run Test

```
$ npm install
$ npm run dev

or 

$ npm install 
$ npm run test
```
### Please Note Before Running Tests:
I ran into an issue running unit tests. In order to run server.test.js, please swap line 8 of /server/index.js with 
export const app = express();

to run the app, swap line 8 of /server/index.js back to 
const app = express(); (this is the default)

Apologies in advance, I didn't want to spend too much time on this issue

----------------------

### Screenshots
![Screenshot 2023-03-07 at 6 46 59 PM](https://user-images.githubusercontent.com/43007609/223582084-91eee2b7-4cdc-41be-ae29-bc755d86600b.png)
![Screenshot 2023-03-07 at 6 48 17 PM](https://user-images.githubusercontent.com/43007609/223582376-6596d27f-3e5b-4724-9fa3-80d67bf6ce80.png)
![Screenshot 2023-03-07 at 6 48 22 PM](https://user-images.githubusercontent.com/43007609/223582022-c1b37b65-712d-4cfd-99ae-31a7caba0717.png)
![Screenshot 2023-03-07 at 6 48 44 PM](https://user-images.githubusercontent.com/43007609/223582018-4907369c-31b0-48cf-89d6-9f8cc2ea57b7.png)
![Screenshot 2023-03-07 at 6 56 27 PM](https://user-images.githubusercontent.com/43007609/223582690-5d2eda7d-0d9d-4350-a72b-998c8cd381c7.png)


### Optimizations I Implemented

- Sorted comments in reverse chronological order to improve user experience. 
  - At first I got the data as a list of objects and then reversed it. I ended up pulling the data in order of earliest to latest date directly from the database, making reversing the list unecessary. This was a small optimization that could be more useful on larger datasets.

- Implemented client-side caching to reduce API requests and speed up app responsiveness.
  - I did my best to implement client-side caching, by storing new comments locally on the client-side (in my React state) after my initial fetch from the database. New comments in my commentlist were then rendered from my state, instead of pulling data from the database again, reducing unecessary API requests. This worked really nicely, though it did lead to new kinds of problems down the line.
   
### Additional Features to Add

  - Display maximum comment length to help users compose their comments effectively.
  - Allow users to delete comments and implement a "delete all comments" function.
  - Add an auto-scroll feature and allow users to upload media files.
  - Enhance input restrictions to disallow non-meaningful content.
  - Investigate periodic posting of data to optimize app speed for larger datasets.
  - [x] Display dates of comments in a more readable format.
  - [x] Prevent empty fields when submitting comments and display an error message.

### Challenges I Overcame:
  - CSS :( 
  - Solved an issue with updating the CommentSection component state by removing excessive fetching from the database.
    - Originally I didn't even know this was a problem until I left the webpage alone for a few minutes, came back, and new components weren't automatically rendering. Rerenders in React can be caused by state changes. 
    - I came up with a solution to trigger a state change in my CommentSection component, from my Input component. As they aren't parent or child components to eachother, I had to pass data from Input up to my App component and down to CommentSection
    - I then noticed excessive fetching from the database when looking at my Network tab (I this fixed by removing comments from the dependency array on my useEffect hook that fetched comments from the db, and ensuring the hook only fetched data on initial render)
    - Maintaining a local state of comments for newly created comments was necessary for triggering rerenders of my commentSection
    - Appending the local state of comments to my newly created comments was an issue because I was sorting newly creaded comments in order of oldest to newest, so they would appear under my entire list, which escaped me for a little too long
  - Maintaining the local state of comments introduced a new issue: tracking id's for deleting comments. This was something I'll want to fix in the future. Deleting is currently a little wierd, you need to refresh first to sync with the database comments, otherwise the components will reappear on refresh. One theory for fixing this is making an api to call the "MAX" query function on commentSection's initial render within our useEffect hook.
      - This could also be fixed by storing a unique id in addition to the sqlite ascending id with each entry. This way, id's could be created with the comment and sent up to the database immediatley.
      - I think the delete issue also led to issues in unit tests involving deleting function which makes sense 
  - Unit tests: writing unit tests is not my strongsuit and I'm hoping and working towards to get better at it. This app was tested manually and with some unit tests. It's very far from perfect

