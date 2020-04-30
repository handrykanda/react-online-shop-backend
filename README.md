# **React + Redux + Firebase Backend Project - Google Cloud Functions**

## **Live Demo:**

You can check out the live demo [Here](https://cellstore-a0a6c.web.app/).

## **Getting Started**

- Create Firebase project and add your [javascript project](https://github.com/handrykanda/react-online-shop), your web app.

It's easy, just follow the steps on this [link](https://firebase.google.com/docs/web/setup#node.js-apps) for a step by step walkthrough.

After you complete all the steps you get a local directory that is linked to your Firebase project. This was created using `firebase init`. By now you also have an **firebaseConfig** object created when you initialize your Firebase app. Create this functions/util/firebaseConfig.js and just paste your **firebaseConfig** object in that file. It will look like this:

```
module.exports = {
  apiKey: "##################################",
  authDomain: "######################",
  databaseURL: "#################################",
  projectId: "##########",
  storageBucket: "#######################",
  messagingSenderId: "########",
  appId: "######################",
  measurementId: "############",
};
```

Great! You can now copy and paste other files in this repo.

- `npm install --save firebase express cors` to install all the required dependencies for this project.

## **Testing**

You can test this using [Postman](https://www.postman.com/downloads) <br> OR
clone the repo on this [link](https://github.com/handrykanda/react-online-shop), please note that it has some setup stuff that takes few minutes.

## **Functionality overview**

You can view a live demo over [here](https://cellstore-a0a6c.web.app/), the complete project.
