# FavOne
Your place of your favorite  Movie/Drama/Actor. The users can add their favorite movies, dramas, actors and share them with the world. (FavOne) is the shortcut of Favorite One. nice name right? :)

## Important Links

- [FaveOne Back-End Repo](https://git.generalassemb.ly/eman-e-alatawi/FavOne-BackEnd)
- [Deployed FaveOne API](www.link.com)
- [Deployed FaveOne React App](www.link.com)


## Planning Story
From Day-1 start choosing the idea and decide the name, design the ERD, wireframes and create the apps, repos.

## Technologies Used

- React
- React Router DOM
- ReactPlayer
- React-Toastify
- React-Bootstrap
- Axios
- javaScript
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

 ### 6- Axios:
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