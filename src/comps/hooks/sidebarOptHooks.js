import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import db from "../../firebase";
// import { useCookies } from "react-cookie";

export default function useSidebarOption({
  id,
  setCurrChannel,
  cookies,
  setCookie,
  setNumUsers,
  numUsers,
  currChannel,
}) {
  // const [numUsers, setNumUsers] = useState(0);
  // const [cookies] = useCookies(["user"]);
  const history = useHistory();
  const [addChannelOption, setAddChannelOption] = useState(true);

  const selectChannel = () => {
    if (id) {
      history.push(`/channel/${id}`);
      setCookie("channel", id);
      // check # of users online on this channel
      db.collection("channelUsers")
        .doc(id)
        .get()
        .then((doc) => {
          const arrUsers = doc.data().users;
          // if user not in the channel users array then add user into the channel user array
          if (!arrUsers.some((e) => e === cookies.user.id)) {
            arrUsers.push(cookies.user.id);
            db.collection("channelUsers")
              .doc(id)
              .update({ users: arrUsers })
              .then(() => setNumUsers(arrUsers.length))
              .catch((error) =>
                console.error("Error in updating the array of users!")
              );
          }

          // if prev channel != null && != id => push user's id into users(array,doc) then setCurrChannel with current channel
          setCurrChannel((prev) => {
            if (prev && prev !== null && prev !== id) {
              // console.log("prev = ", prev, id);
              // set previous channel users decrease by 1
              db.collection("channelUsers")
                .doc(prev)
                .get()
                .then((doc) => {
                  const newArr = doc.data().users;
                  db.collection("channelUsers")
                    .doc(prev)
                    .update({
                      users: newArr.filter((cid) => cid !== cookies.user.id),
                    })
                    .catch((error) =>
                      console.error(
                        "Error in setting the current channel",
                        error
                      )
                    );
                })
                .then(() => {
                  // set current channel to current
                  // console.log("got here");
                  return id;
                });
              // return id;
            }
            // console.log("id =", id);
            return id;
          });
        })
        .catch((error) =>
          console.error("Error in pushing a users into array", error)
        );
    } else {
      history.push("title");
    }
    // return numUsers;
  };

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      db.collection("channels")
        .add({
          name: channelName,
        })
        .then((docRef) => {
          console.log("docRef :", docRef.id);
          db.collection("channelUsers")
            .doc(docRef.id)
            .set({
              id: docRef.id,
              users: [],
            })
            .then((doc) => console.log(doc))
            .catch((error) =>
              console.error("Error adding online users by channel", error)
            );
        })
        .catch((error) => console.error("Error in adding new channel", error));

      setAddChannelOption(false);
    }
  };

  useEffect(() => {
    if (id) {
      db.collection("channelUsers")
        .doc(id)
        .onSnapshot((snaps) => {
          if (snaps.data()) setNumUsers(snaps.data().users.length);
        });
    }
    // if (numUsers > 0) return numUsers;
  }, [id, setNumUsers]);

  // const initNumUsers = () => {
  // useEffect here? to reduce calls to firebase
  // console.log("calls", id);

  // };

  return { addChannel, selectChannel };
}
