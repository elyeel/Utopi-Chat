import { auth, provider } from "../firebase";

const logout = () => {
  auth.signOut();
};

const login = (event, email, pass, setCookie) => {
  event.preventDefault();

  auth
    .signInWithEmailAndPassword(email, pass)
    .then(() => {
      setCookie("user", email);
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

const register = (event, email, password, setCookie, name) => {
  event.preventDefault();
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      const userCookie = {
        name,
        email,
        avatar: "nothing",
      };
      setCookie("user", userCookie);
      console.log("registered", email);
    })
    .catch(function (error) {
      let errorMessage = error.message;
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
