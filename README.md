# FavOne
Your place of your favorite Movie/Drama/Episode/Actor. The users can add their favorite movies, dramas, episodes, and actors and share them with the world. (FavOne) is the shortcut of Favorite One, nice name right? :)

## Important Links

- [FaveOne Back-End Repo](https://git.generalassemb.ly/eman-e-alatawi/FavOne-BackEnd)
- [Deployed FaveOne API](www.link.com)
- [Deployed FaveOne React App](www.link.com)


## Planning Story
From Day-1 start choosing the idea and decide the name, design the ERD, Wireframes and create the Apps, Repos. Continue by creating one Model/Controller in the back-end and check it with the Postman then go and design the related components in the front-end. For each 2 days there is a complete feature in the front-end with design and styles and the back-end functionality.

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





## Images

### Wireframe:
##### Home-UnLogged user
![Home](https://i.ibb.co/TYdrbjq/Screen-Shot-2021-02-19-at-2-06-53-PM.png)

##### Home-LoggedIn user
![Home](https://i.ibb.co/K7mLsrL/Screen-Shot-2021-02-19-at-2-06-59-PM.png)

##### Join
![Join](https://i.ibb.co/QmTpgKX/Screen-Shot-2021-02-19-at-2-07-08-PM.png)

##### LogIn
![LogIn](https://i.ibb.co/sFR4Xgw/Screen-Shot-2021-02-19-at-2-07-13-PM.png)

##### Drama-Detail
![Drama-Detail](https://i.ibb.co/7Vvfh0c/Screen-Shot-2021-02-19-at-2-07-38-PM.png)


##### Movie-Detail
![Movie-Detail](https://i.ibb.co/KmFfY1W/Screen-Shot-2021-02-19-at-2-08-13-PM.png)


### App Screenshot:





## Installtion:

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