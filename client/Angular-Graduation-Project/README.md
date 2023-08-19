1.0 Introduction
The app’s purpose is to establish a discussion forum where users can create articles and share these articles with the world. The authenticated users can create articles, subscribe to users and topics, like articles and comment on articles. The not-authenticated users can see and read the articles that other users have created.
The app has its own REST api built with ExpressJS and MongoDB. For convenience purposes a dark mode is also provided, implementing the ‘dark reader’ npm extension.

2.0 Modules

2.1 Auth module
Components
Login component
A login form that takes an email and a password as values. The email and password have ‘required’ validators and a custom validator (validator for wrong email or password). Appropriate error messages have been added to the form. On submit the form sends an http request via the Angular http client and if all goes well it receives a jwt response in the format of the IJwt interface.

On success the component invokes the createSession method in the authentication service with the just received token and redirects to the home page.

Register component
A register form that takes name, email, description, password, repeat password and topics as values. The name, email, and description are in a ‘personalDetailsGroup’ form group. The password group consists of the password and repeat password controls. The topics are in a third group. The name, email and description all have a ‘required’ validator and the email has an ‘email’ validator. The password group has a custom validator that checks if the both passwords are the same. The topics have no validators, since they are not mandatory to input. In this form I used the ‘mat-chip’ and ‘mat-autocomplete’ components from angular material to enhance the user experience of adding topics to the user’s interests. The mat-autocomplete fetches all already existing topics and provides input suggestions for the chips.
On successful submit the form sends a post request to the backend and returns a jwt in the same format as the login form (IJwt).

After that the the createSession method is called with the jwt as an argument.

The register form also doubles as an ‘edit user form’. On init the component makes a check to see if it has received some state from the route and if it has, the form changes to and edit form and gets populated with details coming from the route state. A “registerOrEdit” variable is responsible for the switch and what this variable does is changing the actions that trigger when the form is submitted and also changes the text on the form submit button (‘register’ or ‘edit’).
The variable is initially set to ‘register’.
Services
Provided here is the custom password validation match service. The service checks whether the entered password and repeated password are of the same value.

2.2. Core module

Interceptors
JWT Interceptor
The app has an interceptor that triggers on every outgoing HTTP request and what it does is populate the “Authorization” header of the HTTP request with the token in the format: `Bearer ${token}`. If no token is found the interceptor does not set anything.

Services
Api-calls service
A service that makes all of our Api calls to the backend. All services are explained here.

Users:
getAllUsers: A get request that receives all registered users. On success it returns an object with ‘users’ key that contains an array of all registered users.
getSingleUser: A post request that sends a userId and gets the user that has the same .\_id. The ‘topics’ key is already populated with the actual topic documents for convenience. It returns an object with a ‘user’ key that contains the user data.
getSingleUserLean: Logic is the same as in getSingleUser, but instead it returns the user document leanified.
subscribeToUser: A post request that sends a userId and subscribes to the user that has the same .\_id. It returns an object with a single key ‘updatedUser’ which contains the updated user object of the just subscribed user.

Authentication:
postRegisterForm: A post request that sends formdata to the backend and registers the user that sends it. It returns an object with a single key: ‘jwt’ that holds a json web token.
postLoginForm: Logic is the same as in the register component, but this time the backend handles the login functionality.
postEditUserForm: Logic is the same as in the register component, but this time the backend handles the edit user functionality.

Articles:
getAllArticles(): a get request that fetches all of the created articles from the db. On success it returns an object with an ‘articles’ key in it that contains an array of all of the articles.
getSingleArticle: a post request that sends an articleId and fetches the corresponding article from the db (the one that has the same .\_id as the request). On success it returns an object with an ‘article’ key which contains the article data. The ‘topics’ key is prepopulated for convenience.  
getSingleArticleLean: same as the previous one, but leanified.
createArticle: a post request that sends form data from the create article form to the backend. On success it returns an object with a ‘newArticle’ key that holds the just created article data.
getArticlesByTopics: a post request that sends an array witht topics to the backend. On success it returns an object with ‘articlesByTopics’ key that holds the articles that are associated with the provided topics (only unique articles are returned, no duplicates.
addComment: A post request that sends the ‘add comment’ form data and the just commented article Id to the backend. On success the backend returns a success message and adds relations between the commenting user and the article.
likeArticle: a get request that adds adds relations between the liking user and the article being liked. On success returns an object with an ‘updatedArticle’ key that holds the updated article data.
editArticle: a post request that sends formdata to the backend and then the backend edits the article document according to the formdata. On success returns an object with an ‘article’ key that holds the updated article data.
deleteArticle: a get request that attemps to delete the article from the collection. On success returns a success message.

Topics:
getSingleTopic: a post request that sends an id to the backend and fetches the corresponding topic that has .\_id the same as the provided one. It returns an object with a ‘topic’ key that holds the topic data.
getAllTopics: a get request that fetches all of the topics from the backend. It returns an object with a topics key that contains an array filled with all of the topic docs available at the moment.

Comments:
getCommentById: a post request that sends an id to the backend and fetches the corresponding comment that has an .\_id the same as the provided one. It returns an object with a ‘comment’ key that holds the comment data.
Auth service
A service that handles the user authentication. On init it initiates a behavior subject (sessionSubject) and casts it to an observable which then the interested components subscribe to (sessionObservable$). Then the service attempts to get a ‘user’ object from the localstorage. On success It returns the user object (holding the user data), JSON parsed. The service then emits the user object via the behavior subject, or emits ‘null‘ if nothing is found.

Methods:
setJwt: A method that accepts a jsonwebtoken and sets it in the local storage.
getJwt: a method that attempts to get the jwt from the local storage.
decodeJwt: a method that accepts a jwt as an argument and attempts to decode it.
getUserId: a method that combines getJwt and decodeJwt in order to get and return the decoded jwt (containing the user id). On failure the method returns null.
setUserDetails: a method that receives a JSON stringified user object and sets it in local storage. After that it invokes the behavior subject with the JSON parsed user object.
createSession: method that accepts a jwt. Then it calls the setJwt method to set the token in local storage. Then it calls the decodeJwt method to decode the token and extracts the user id from it. After that the method makes an api call to fetch a single user by the provided id and on success it calls the setUserDetails method to sets the stringified user object in the local storage.
destroySession: a method that removes the user and the jwt objects from the local storage. Then it invokes the behavior subject with ‘null’ to inform all the interested components that the session is destroyed.

3.0 Feature module
This is the module for the features in the app: the user feature and the article feature.

Components
Article-list component
This is the home page component that triggers on the ‘/’ route. The purpose of this component is to compose a list of article-cards. On init this component subscribes to the session observable already mentioned in the Auth Service in order to fetch the logged in user (if any). On success it gets the logged in user in the form of a user object (a mongoose document parsed to object, leanified) in the format of a an IUser interface. After receiving the logged in user object (or null) the component populates the user variable with the just received user. Later this variable is used to filter the logged in user’s articles by the topics that he has subscribed to.
After this first stream ends an api call is made to retreive all of the articles from the database. The api call response holds an object with an ‘articles’ key that contains an array of articles (in the interface format of ‘IArticle’). A local articles variable is populated with these articles and a filter function is invoked, that automatically filters the articles based on the logged in user’s interests. The user can change the filter anytime.
This component passes the article data to the ‘article-card’ component , and composes an article list using it in a loop for each article document.
Article-card component
This component gets composed by the article-list component mentioned previously and it receives the article data (some of it, without the ‘content’ key).
Article-details component
The purpose of this component is to compose an article details page. On init it fetches the article id from the route params and makes an api call to get the leanified article document. On success the api returns an object with an ‘article’ key that contains the article data. After that first stream ends the component initiates a second stream that fetches the logged in user data (if any) from the ‘sessionObservable$’. After subscribing to the user session the ‘setFlags’ method is called, which sets boolean flags to determine user access to the various functionalities in this page. The user can like and comment an article if he is logged in and is not the article owner. If he is logged in and is the article owner he can edit and delete the article.
On like the article (invoking the onLike function) an api call is made to the backend to like the article. The backend adds a ref of the liking user to the article’s likes array and adds a ref of the article to the user’s liked articles array and on success it returns the updated article doc. The article variable is updated to reflect the changes in the ui.
On comment (invoking the onComment function) the component redirects to the article comment form (the ArticleCommentComponent) and there the user can post a comment to the article. The backend logic is the same as with liking the article.
On edit (invoking the onEdit function) the article’s topics and data are populated in a route state and are used to populate the Edit Article form (the create article component form double-used as an edit article component form).
On delete (invoking the onDelete function) a backend request is sent to delete the article and on success the component redirects us to the home page.
This component passes comment data to the ArticleCommentsComponent in order to render the components.
Article-comments component
The purpose of this component is to hold a list of comments which it renders according to the comments reference array of the article doc. The component receives its data from the parent ArticleDetails component.
Article-comment component
This component holds a comment article form. On init it fetches and populates the articleId variable from the route params and then updates the article document associated with this id. The form has two fields: title and content. Both are required and have errors to reflect if they are left empty.
On submit the form makes an api call to add a comment to the article passing the form data and the article id. On success the component redirects the user to the article’s details page.
Article-create component
A create article form that takes title, description, content and topics as values. The title, description, and content are in an ‘articleDataGroup’ form group, the topics are in a ‘topicsGroup’. All controls have a ‘required’ validator. A custom error is also implemented: on form submit the component sends an api call to check if the article’s title has already been taken. If it has, a relevant error triggers in the title field.
Just like in the register user form ‘mat-chip’ and ‘mat-autocomplete’ components from angular material are used to enhance the experience of adding topics to the article. On init the component populates the mat-autocomplete with all already existing topics and provides input suggestions for the chips.
On submit the create article form sends a post request to the backend and on success redirects the user to the article details page.
Our create article form also doubles as an edit article form. On init the component makes a check to see if it has received some state from the route and if it has, the form gets set to edit and gets populated with article details. A “registerOrEdit” variable is responsible for the switch and changing the actions that trigger when the form is submitted and the text on the form submit button (‘register’ or ‘edit’). The variable is initially set to ‘register’.
User-list component
The purpose of this component is to compose a list of all of the authors (registered users) that the app has. On init it makes an api call to receive all of the registered users. On success the backend returns an object with a ‘users’ key that holds an array of ‘IUser’ objects. The component loops through the data and for each user object renders the user-card component, passing the user details to it.
User-card component
This card receives a user object from the user-list component and composes a user card based on the object’s details. On init it subs to the session observable and gets the logged in user (if we have one). After receiving the logged in user’s data the components sets boolean flags that determine whether the logged in user can subscribe to the user on the card (a user can’t subscribe to himself and the user must be logged in, in order to subscribe). This card holds a link to each user’s profile page.

Profile component
A component that composes the profile page of each user. If the logged in user is the owner of the page he can see the Created Articles, Users Subscribed to, Topics Subscribed to and Liked articles list. If not, the user can see the owner’s Created articles list.
On init the profile component subscribes to the route parameters and extracts the owner id from them. After that, it makes an api call to retrieve the corresponding user object from the backend. After that, it subscribes the “sessionObservable$” in order to fetch the currently logged in user (if any). The streams are chained into a single one and when that chained stream completes the component sets relevant boolean flags that determine what access the currently logged in user has.
The component has an onEdit method which becomes available when the logged in user is the owner of the page. The method fetches and populates the user’s topics and populates the route state with the user’s data. After that it redirects to the register form, this time used as an ‘edit user form’.
The profile component passes user data to the ‘profile-article-card’, ‘profile-user-card’, ‘subscribed-topics-card’ and ‘subscribed-users-card’ in order to compose the user profile page. All of the child components receive corresponding id-s with which to make api calls except for the ‘profile-user-card’, which receives the data of the fetched user here.
Profile-article-card
A component that doubles its use as a ‘created articles card’ and ‘liked articles card’. It receives an article id from the profile component and then on init fetches the article associated with this id. It populates the card with details from the fetched object.
Profile-user-card
A component that receives the user object from the profile component and populates the template with user details.
Subscribed-topics -card
The component receives a topic id from the profile component and then on init fetches the topic associated with this id. It populates the card with details from the fetched object.

Subscribed-users-card
The component receives a user id from the profile component and then on init fetches the user associated with this id. It populates the card with details from the fetched object.

4.0 Shared module

Components
About page
A static about page describing the app’s purpose.
Dark-mode-toggle
A toggle implementing the ‘dark reader’ extension. It adds css for the app’s dark mode.
Error
An error card component. Its purpose is to serve as the content of the angular ‘snackbar’ in order to display an error message.  
Footer
A static footer component.
Header
A header component. Holds the main navigation of the site in a nav. If a user is logged in it displays: Profile, Create Article, Authors, About and Logout. If a user is not logged in it displays: Login, Register, Authors, About.
On init the header subscribes to the sessionObservable$ and gets the logged in user’s data (if there is a logged in user). Then it sets the isLoggedIn and user variables to true or false depending on the outcome. These variables determine the visibility of the various navigation elements.

Interfaces
IArticlePopulated
An interface for the article documents. The topics reference array is populated.
IArticle
An interface for the article documents. Leanified.
IComment
An interface for the comments format.
ICreateArticleFormData
An interface for the ‘create article form’ form data.
IDecoded
Interface for the decoded JWT.

IJwt
Interface for the JWT backend responses.
IloginFormData
An interface for the login form data.
IregisterFormData
An interface for the register form data.
Itopic
An interface for the topic documents.
IuserPopulated
An interface for the user documents. The topics reference array is populated.
Iuser
An interface for the user documents. Leanified.
Services
displayFormErrorsService
A service that takes a formgroup as an argument and loops through all of the form controls. It displays every error in the console.
ErrorHandlerService
A service that handles the global error messaging functionality. It initiates a subject, casts it as an observable and emits every time an error occurs in the app. This service works in tandem with the ‘error’ component.

Login-or-register-guard-service
A route guard that uses the getJwt() method from the authService and if it receives a JWT it prevents access to paths: 'auth/login' and 'auth/register'. It essentially prevents authenticated users access to the login and register routes.
User-authorized-guard-service
A route guard that uses the getUserId() method from the authService and the parameters of the previous activated route. It prevents navigation to the 'auth/profile/:id/edit' path for users who do not own the profile page of the user associated with the route. The guard compares the profile page path with the userId val of the logged in user. If they differ it blocks access, essentially denying access to the ‘edit user’ functionality for users who do not own the account.
User-must-be-authenticated-guard-service
A route guard that attempts to retrieve the jwt from local storage. If it succeeds it allows access to the route, if it fails it denies it. It guards the route: 'articles/create'. It essentially prevents not logged in users access to the create article route.
User-must-be-author-guard.service
A route guard that fetches an article id through the currently activated route. Then it compares the currently logged in user’s id with the article’s author and if they differ it denies access. Protects the path: 'articles/:id/edit'. It essentially prevents users who do not own the article resource from editing it.
