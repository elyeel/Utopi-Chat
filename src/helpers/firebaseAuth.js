import db, { auth, provider } from "../firebase";

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
      const user = db.collection("users").doc(userRef.user.uid).get();
      console.log(user);
      const userCookie = {
        name: user.name,
        email: user.email,
        background: user.background,
        color: user.color,
        avatar: `https://ui-avatars.com/api/?name=${user.name}&background=${user.background}&color=${user.color}`,
        id: userRef.user.uid,
      };
      setCookie("user", userCookie);
      registerFavChannel(userRef.user.uid);
      console.log("User logged in", userCookie, userRef.user.uid);
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
      const userCookie = {
        name,
        email,
        background: "0d8abc",
        color: "fff",
        avatar: `https://ui-avatars.com/api/?name=${name}&background=0d8abc&color=fff`,
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
