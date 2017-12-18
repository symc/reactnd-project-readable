## Readable

This is an implementation of the second project of  Udacity's React Fundamentals course. The single page app contains. The app contains a navigation bar, a category bar and a list displaying posts. 

### Navigation Bar
Navigation Bar is located at the topmost part of the single page app. In all the views of the app, this bar is visible. Navigation Bar has the following clickable objects:
- 'Readable' text: This text is located at the topmost leftmost part of the single page app. You can return to main page from any view by clicking on this text.
- 'Add new post': You can use this button to go to the page where you can create a new post. See creating a new post in the README for more information.
- 'Sort posts by votes': Change the sorting method used in the main page to sorting by votes. This is the default sorting method when you first run the app. The posts on the main page will be sorted by vote, and the post with the highest vote will be the first post.
- 'Sort posts by dates': Change the sorting method used in the main page to sorting by dates. The posts on the main page will be sorted by creation date, and the newest post will be the first post.
- 'Sort posts by titles': Change the sorting method used in the main page to sorting by titles. The posts on the main page will be sorted by post title (using standard string comparison).

### Category Bar
Category Bar is located under the Navigation Bar. Currently, there are three available categories: react, redux and udacity. Category Bar is not visible when creating/editing a post/comment and when displaying the details of a post. Category Bar has the following clickable objects.
- 'Show all categories': Show all posts
- '["Category name"]': Show all posts under category 'Category name'


### Posts
Under the Category Bar, there is a list of posts. Each post is displayed in a panel, where the topmost blue part is the post title, the text under the title is the post body and the part under the text is the post banner.

Each post banner contains (from left to right):
- a green text displaying the author name
- a blue text displaying # followed by the category name
- total number of comments this post has
- date of creation of the post
- total vote of the post
- two buttons, one green and one red to increase/decrease post score by one
- a button which links to the post detail page
- a button which can be used to edit the post
- a button which can be used to delete the post

### Post details and comments
By clicking the Details button of the post, you can display the post details. This view will show the post on top (without the details button) and the comments about this post under the post. A comment can be upvoted, downvoted, edited or deleted, just like a post. At the bottom of the list of comments, there is a blue button ("Add new comment") which can be used to add a new comment. Each comment in this view displays
- a comment body on top
- comment author
- date of creation of the comment
- total vote of the comment


### Creating and editing posts or comments
By pressing "Add new post" button in the navigation bar, you can open the comment creation page. This page has fields for post title, post body, post author and category. After changing these fields, you can save the post by pressing "Save". If you press "Discard", your changes will be discarded and you will be redirected to the main page of the app. If you leave the author field empty, a default author name ("anonymous") will be used. Similarly, an empty title will be replaced with the text "[No title]".

If you press "Edit" button on any page, you will reach a similar page. This page can be distinguished from the "Add new post" page by the green text which states "Editing the post". In this view, the post fields will be prepopulated with the existing values of the post. "Save" and "Discard" buttons function similar to the corresponding buttons in the post creation page. The only difference is in the discarding case, where you will be redirected to the post details page, instead of the main page.

Comments can be created by pressing "Add new comment" button at the end of the comment list; and they can be edited by pressing the green "Edit" button on comments. The rest of the process is very similar to the post creation/editing. You will see two fields, one for comment body and the second for the author. Pressing "Discard" will redirect you to the detailed page of the parent post of the comment you are editing/creating.

### Incorrect URLs

If you type any URL on your browser which does not exist, including the ones which refers to a post, comment or category that does not exist, you will be redirected to the main page.

### Network connectivity

The app requires a live network connection with the back end to exist. In case of a connection loss, the operation you perform on the app will not be completed and an error message will be displayed. You can use the developer console to see more information about the network error. 

## Known issues

None

## Installation

You can follow the directions below to install and run the app:

1. Install Node.js and npm. For more information, please check https://docs.npmjs.com/getting-started/installing-node

2. To install and start the back end server
- Make sure you are in the api-server directory
- Install all project dependencies with `npm install`
- Run the server with `node server`

3. To install and start the front end app
- Make sure you are in the frontend directory
- Install all project dependencies with `npm install`
- Start the development server with `npm run start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
