# FaveOne
Your place of your favorite Movie/Drama/Episode/Actor. The users can add their favorite movies, dramas, episodes, and actors and share them with the world. (FaveOne) is the shortcut of Favorite One, nice name right? :)

## Important Links

- [FaveOne Back-End Repo](https://git.generalassemb.ly/eman-e-alatawi/FavOne-BackEnd)
- [Deployed FaveOne API](http://faveone-env.eba-3dzduni8.us-east-2.elasticbeanstalk.com/)
- [Deployed FaveOne React App](https://pages.git.generalassemb.ly/eman-e-alatawi/FaveOne-FrontEnd/)


## Planning Story
From Day-1 start choosing the idea and decide the name, design the ERD, user stories, wireframes and create the Apps, Repos. Continue by creating one Model/Controller in the back-end and check it with the Postman then go and design the related components in the front-end. For each 2 days there is a complete feature in the front-end with design and styles and the back-end functionality.

## Technologies Used

- React
- React Router DOM
- ReactPlayer
- React-Toastify
- React-Bootstrap
- Axios
- javaScript
- jsonwebtoken
- material-design-icons
- swal(sweetalert)
- tailwindcss
- JSX
- Visual Studio Code
- Justinmind to design the Wireframe
- GitHub
- GitHub Pages


## User Stories
- As a visitor, I prefer not asked to register, so that I can view the Movies/Dramas/Episodes/Actors/Image Galleries/Genders(Catagories)without having an account.
- As a visitor, I want to be able to do registration, so that I can have further features related to my account type.
- As a user, I want to be able to Register/Login to my account.
- As a registered-user(Admin/User), I want to have an edit option for the password, so that I can change the account's password when I want.
- As a registered-user(Admin/User), I want to able to receive notifications/messages for my actions, so that I can be aware of the situations.
- As a registered-user(Admin/User), I want to be able to view the details of all Movies/Dramas/Episodes/Actors.
- As a registered-user(Admin/User), I want to have an add Movie/Drama option, so that I can add my favorite Movies/Dramas.
- As a registered-user(Admin/User), I want to have an edit Movie/Drama option, so that I can edit the Movies/Dramas that I added.
- As a registered-user(Admin), I want to have a delete Movie/Drama option, so that I can delete the Movies/Dramas that I added.
- As a registered-user(Admin/User), I want to have an add Episode option, so that I can add Episodes to the Dramas.
- As a registered-user(Admin/User), I want to have an edit Episode option, so that I can edit the Episodes that are added by me and by others.
- As a registered-user(Admin), I want to have a delete Episode option, so that I can delete the Episodes that are added by me and by others.
- As a registered-user(Admin/User), I want to have an add Gender/Catagory option, so that I can add Genders of the  Movies/Dramas.
- As a registered-user(Admin/User), I want to have an edit Gender/Catagory option, so that I can edit Genders of the  Movies/Dramas that are added by me and by others.
- As a registered-user(Admin), I want to have a delete Gender option, so that I can delete the Genders that are added by me and by others.
- As a registered-user(Admin/User), I want to have an add Image Gallery option, so that I can add Image Galleries to the  Movies/Dramas.
- As a registered-user(Admin/User), I want to have an edit Image Gallery option, so that I can edit Image Galleries to the  Movies/Dramas that are added by me and by others.
- As a registered-user(Admin), I want to have a delete Image Gallery option, so that I can delete the Image Galleries that are added by me and by others.
- As a registered-user(Admin/User), I want to have an add Actor option, so that I can add my favorite Actors.
- As a registered-user(Admin/User), I want to have an edit Actor option, so that I can edit the Actors who are added by me and by others.
- As a registered-user(Admin), I want to have a delete Actor option, so that I can delete the Actors who are added by me and by others.

## Important Notes About FaveOne
 

-  Sharing the resources with the world means that you are agreeing to let other users contribute with you (reading, editing, adding, and for Admins they can delete the whole resource or some parts of it).

- The base idea of FavOne website is to let the people share the resources that they're like, and give the permissions to any registered user/admin to edit other registered user's resources.

- We allow the registered users only to own the Movies/Dramas so that they're be able to add/edit what they added,  and for deletion process is allowed only for users with Admin Role

- The resources(Actors/Genders/Episodes/ImageGalleries) ownership is for all registered users.

- The users/Visitors can search for Movies or Dramas by Title, and search for Actors or Movie-Drama's Gender by Name.

- In order to see the details of the Dramas/Movies/Actors and watch the episodes you should join first.

## Images

###  Component Hierarchy:
![Component Hierarchy](https://i.ibb.co/d5HNKMQ/Fave-One-React-App-Component-Hierarchy-FINAL.jpg)



### Wireframe:

### - Visitor View:
![V](https://i.ibb.co/CpL1Yr9/Visual-Table.jpg)


### - Login-user view:

![L-1](https://i.ibb.co/ZYvL6sR/Visual-Table-5.jpg)

[see more](https://drive.google.com/drive/folders/1bj0nVEEfU45E9XO26lYjEi_wrczwbyy8?usp=sharing)


### App Screenshot:
![main - page](https://i.ibb.co/3rTkxg3/main-page-1.png)
![all movies-dramas ](https://i.ibb.co/1Gx1JFg/all-movies-dramas-1.png)

![all actors](https://i.ibb.co/KqfsSLB/all-actors-1.png)
![all episodes](https://i.ibb.co/jGkxqrV/all-episodes-1.png)
![all-image-galleries](https://i.ibb.co/nbqfdJH/all-image-galleries-1.png)

![all-movies-drames-genders](https://i.ibb.co/GCGRY77/all-movies-drames-genders-1.png)

![single-drama-details](https://i.ibb.co/DVDrRdj/single-drama-details-1.png)

![search-actor](https://i.ibb.co/yhdNNV6/search-actor.png)


![single-episode-details](https://i.ibb.co/P4N6ZRc/single-episode-details-1.png)



![welcome-notification](https://i.ibb.co/jzyz9pn/welcome-notification.png
)
![sayBye-notification](https://i.ibb.co/kS8Yx25/sayBye.png
)

[see more](https://drive.google.com/drive/folders/1u2zI58i6tzyUuG1dgOKLyEKZSuRghyf3?usp=sharing)



## Installtion

### 1- React Router DOM:
DOM bindings for React Router
  - In the terminal inside your react  app,  use the command below: 
  ```
   npm install react-router-dom 
   ```
  - In the App.js add the import below:
 ```
 import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
```

### 2- ReactPlayer:
A React component for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion.
  - In the terminal inside your react app, use the command below: 
  ```
  npm install react-player
  ```
  - Add the import below in the js file you want to use the Router:
  ```
  import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
  ```
 - [Documentation](https://www.npmjs.com/package/morphizm-react-player)

  ### 3- React-Toastify:
React-Toastify allows you to add notifications to your app with ease. No more nonsense!.
  - In the terminal inside your react app, use the command below: 
  ```
  npm install --save react-toastify
  ```
  - In the index.js (the root component) add the imports below:
  ```
 import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  ```
   - then call the ToastContainer as shown below:
  ```
  <ToastContainer />
  ```
  - Add the import below in the js file you want to use toastify:
  ```
  import {toast } from 'react-toastify';
  ```

  - [Documentation](https://www.npmjs.com/package/react-toastify)

 ### 4- React-Bootstrap:
React-Bootstrap is a complete re-implementation of the Bootstrap components using React. It has no dependency on either bootstrap.js or jQuery. If you have React setup and React-Bootstrap installed, you have everything you need.
  - In the terminal inside your react app, use the command below: 
  ```
  npm install react-bootstrap bootstrap
  ```
  - In the index.js (the root component) add the import below:
  ```
 import 'bootstrap/dist/css/bootstrap.min.css';
  ```
 - [Documentation](https://react-bootstrap.github.io/getting-started/introduction/)

 ### 5- Axios:
Promise based HTTP client for the browser and node.js
  - In the terminal inside your react app, use the command below: 
  ```
  npm install axios
  ```
  - Add the import below in the js file you want to use axios:
  ```
import axios from 'axios';
  ```
 - [Documentation](https://www.npmjs.com/package/axios)

 ### 6- jsonwebtoken:
JSON Web Token (JWT) is a compact, URL-safe means of representing
   claims to be transferred between two parties.  The claims in a JWT
   are encoded as a JSON object that is used as the payload of a JSON
   Web Signature (JWS) structure or as the plaintext of a JSON Web
   Encryption (JWE) structure, enabling the claims to be digitally
   signed or integrity protected with a Message Authentication Code
   (MAC) and/or encrypted.
  - In the terminal inside your react app, use the command below: 
  ```
  npm install jsonwebtoken
  ```
  - Add the import below in the js file you want to use  decode method:
  ```
import { decode } from "jsonwebtoken";
  ```
 - [Documentation](https://www.npmjs.com/package/jsonwebtoken)

### 7- material-design-icons:
Material icons are delightful, beautifully crafted symbols for common actions and items. Download on desktop to use them in your digital products for Android, iOS, and web.
  - In the terminal inside your react app, use the command below: 
  ```
 npm install material-design-icons
  ```
  - Add the link below in the head of index.html file:
  ```js
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
  ```
 - [Documentation](https://material.io/resources/icons/?style=baseline)

 ### 8- sweetalert:
A beautiful replacement for JavaScript's "alert"
  - In the terminal inside your react app, use the command below: 
  ```
npm install --save sweetalert
  ```
  - Add the import below in the js file you want to use swal:
  ```
import swal from 'sweetalert';
  ```
 - [Documentation](https://www.npmjs.com/package/sweetalert)

  ### 9- tailwindcss:
A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.

  - In the terminal inside your react app, use the command below: 
  ```
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

  ```
  - After that, You should follow the installation instructions provided on the tailwindcss official website since there is a lot of steps.

 - [Documentation](https://tailwindcss.com/docs/guides/create-react-app#setting-up-tailwind-css)