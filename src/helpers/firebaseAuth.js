import { auth, provider } from "../firebase";

const logout = () => {
  auth.signOut();
};

const login = (event, email, pass, setCookie, name) => {
  event.preventDefault();

  auth
    .signInWithEmailAndPassword(email, pass)
    .then((userRef) => {
      const userCookie = {
        name,
        email,
        avatar: "nothing",
        uid: userRef.user.uid,
      };
      setCookie("user", userCookie);
      console.log("User logged in", userCookie, userRef);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert(errorMessage);
      }
    });
};

const register = (event, email, password, name, setCookie) => {
  event.preventDefault();
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userRef) => {
      console.log("Got here");
      const userCookie = {
        name,
        email,
        avatar: "nothing",
        uid: userRef.user.uid,
      };
      setCookie("user", userCookie);
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
