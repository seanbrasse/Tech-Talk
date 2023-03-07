# Front-end Choose Your Own Adventure Take-Home

Design and build a comments feed:

- [ ] that displays all comments  
- [ ] notifies a user in real-time when new comments are added

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

- [ ] Please write unit tests and handle errors where you see fit.

## Engineering Style

We do not expect you to have expertise in all the topics that encapsulate front-end web development. We recognize that some folks are specialists and others are generalists!

### Specialist

If there's a particular topic you enjoy, you can focus your assignment solution on that!

Some examples include:
* Performance optimizations
* Accessibility
* Integration testing

### Generalist

- [ ] If you're a generalist, you can focus more on building the minimum viable product described above with the wireframe!


## Interview Details

We have already set up an API client for a Node Express server that stores comments in SQLite.

You have the option of doing the assignment with or without a front-end JS framework.

If you decide to use a framework, we recommend the following boilerplates:
* [facebook/create-react-app](https://github.com/facebook/create-react-app)
* [vuejs/vue-cli](https://github.com/vuejs/vue-cli)
* [angular/angular-cli](https://github.com/angular/angular-cli)
* [ember-cli/ember-cli](https://github.com/ember-cli/ember-cli)

Be prepared to have a discussion about your implementation. Here are some example discussion questions:
- [ ] How can you optimize fetching new comments in real-time?
- [ ] Are there any restrictions we should place on the comment input?

We recommend spending up to four hours on this assignment. If you don't get every piece you hoped completed done in the timeframe, that's alright! We'll be having an hour long discussion on your thought processes and where you might spend more time, and that discussion is a key part of our evaluation!

## Usage

### Run in Development

```
$ npm install
$ npm run dev
```

### Thoughts
  - Sqlite allows us to use a database without a server to host it. We should be able to deploy this?
  - I wanted my comments feed to show the most recent comments at the top. I originally had them in order of oldest to newest, but it didn't make a lot of sense for the app's usecase. I first reversed the comment list, however I chose to instead get the data list directly from the database already sorted correctly by date. This was a small optimization that could be more useful on larger scale datasets. 
   
### Things I Want to Add

- [ ] Show the text limit for comments
- [ ] Restrict commenting if one of the fields is empty. Maybe an error message
- [x] Be able to delete comments. Doesn't exactly make sense for the usecase, but might be useful to show
- [x] The wireframe showed dates within the current week as days of the week with their time, and anthing else as a date and the time. 

### Struggles
  - CSS :(


