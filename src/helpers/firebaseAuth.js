import db, { auth, provider } from "../firebase";

const randomColChannel = () => {
  const col = Math.floor(Math.random() * 255).toString(16);
  return col.length <= 1 ? `0${col}` : col;
};
const background = randomColChannel()+randomColChannel()+randomColChannel();

const logout = () => {
  auth.signOut();
};

const registerFavChannel = (id) => {
  db.collection("favouriteChannels")
    .doc(id)
    .get()
    .then((fav) => {
      if (!fav.data()) {
        db.collection("favouriteChannels").doc(id).set({
          id,
          channels: [],
        });
      }
    })
    .catch((error) => console.error(error));
};

const login = (event, email, pass, setCookie, name) => {
  event.preventDefault();

  auth
    .signInWithEmailAndPassword(email, pass)
    .then((userRef) => {
      let userCookie = {};
      db.collection("users")
        .doc(userRef.user.uid)
        .get()
        .then((doc) => {
          // if doc not exist then create the cookie and save to firebase
          if (doc.exists) {
            userCookie.name = doc.data().name;
            userCookie.email = doc.data().email;
            userCookie.background = doc.data().background;
            userCookie.color = doc.data().color;
            userCookie.avatar = doc.data().avatar;
            userCookie.id = userRef.user.uid;
          } else {
            if (!name) name = prompt("Enter your name");
            userCookie.name = name;
            userCookie.email = email;
            userCookie.background = background;
            userCookie.color = "fff";
            userCookie.avatar = `https://ui-avatars.com/api/?name=${name}&background=${background}&color=fff`;
            userCookie.id = userRef.user.uid;
            // setCookie("user", userCookie);
            db.collection("users")
              .doc(userRef.user.uid)
              .set(userCookie)
              .then((docRef) => console.log("User's added with id: ", docRef))
              .catch((error) => console.log("Error in writing user", error));
            registerFavChannel(userRef.user.uid);
          }
        })
        .then(() => {
          setCookie("user", userCookie);
          console.log("User logged in", userCookie, userRef.user.uid);
        });

      registerFavChannel(userRef.user.uid);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
};

const register = (event, email, password, name, setCookie) => {
  event.preventDefault();
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userRef) => {
      // create random background and colour
      const userCookie = {
        name,
        email,
        background,
        color: "fff",
        avatar: `https://ui-avatars.com/api/?name=${name}&background=${background}&color=fff`,
        id: userRef.user.uid,
      };
      setCookie("user", userCookie);
      db.collection("users")
        .doc(userRef.user.uid)
        .set(userCookie)
        .then((docRef) => console.log("User's added with id: ", docRef))
        .catch((error) => console.log("Error in writing user", error));
      registerFavChannel(userRef.user.uid);
      console.log("registered", email, userRef, userCookie);
    })
    .catch(function (error) {
      const errorCode = error.code;
      let errorMessage = error.message;
      switch (errorCode) {
        case "auth/weak-password":
          alert("The password is too weak.");
          break;
        case "auth/invalid-email":
          alert("Invalid email.");
          break;
        default:
          alert(errorMessage);
      }
      console.log(error);
    });
};

const loginWithGoogle = (setCookie) => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      // const token = result.credential.accessToken;
      const user = result.additionalUserInfo.profile;
      setCookie("user", user);
    })
    .catch((error) => console.log(error));
};

export { logout, login, register, loginWithGoogle };
