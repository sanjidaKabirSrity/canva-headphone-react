import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile 
} from "firebase/auth";
import { useEffect, useState } from 'react';
import initializeAuthentication from "../Firebase/firebaseInit";
import swal from "sweetalert";
import axios from "axios";

initializeAuthentication();

const useFirebase = () => {
    // states
    const [user , setUser] = useState({});
    const [isLoading , setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    // auth and provider
    const auth = getAuth();

    // Sign in with google
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        setIsLoading(true);
        return signInWithPopup(auth, provider);
        // signInWithPopup(auth, provider)
        // .then((result) => {
        //     const user = result.user;
        //     setAuthError('');
        // }).catch((error) => {
        //     const errorMessage = error.message;
        //     setAuthError(error.message);
        // })
        // .finally(()=>setIsLoading(false));

       
    };

    const logOut = () => {
        signOut(auth)
          .then(() => {
            setUser();
          })
          .catch((error) => {
            swal({
              text: error.message,
              icon: "error",
            });
          })
          .finally(() => setIsLoading(false));
      };

      //   create new user by email
    const createNewUserByEmail = (name, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((result) => {
            // save user to database
            saveUser(email, name);
            // setUser(result.user);
            updateProfile(auth.currentUser, {
              displayName: name,
            }).then(() => {});
            swal({
              title: "Account Successfully created!!",
              text: "Please Login",
              icon: "success",
            });
          })
          .catch((error) => {
            swal({
              text: error.message,
              icon: "error",
            });
          });
      };

      const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
      };

      //   observed user
    useEffect(() => {
         onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
          } else {
            setUser();
          }
          setIsLoading(false);
        });
      }, [auth]);

      // save user to database
  const saveUser = (email, displayName) => {
    const user = { email, displayName };
    axios
      .post("https://young-stream-80360.herokuapp.com/users", user)
      .then((result) => {});
  };

  const upsertUser = (email, displayName) => {
    const user = { email, displayName };
    axios
      .put("https://young-stream-80360.herokuapp.com/users", user)
      .then((result) => {});
  };

  // admin check
  useEffect(() => {
    axios({
      method: "get",
      url: `https://young-stream-80360.herokuapp.com/users/${user?.email}`,
    }).then((result) => {
      setAdmin(result.data?.admin);
      
    });
    setIsLoading(false);
  }, [user?.email]);
    return {
        user,
        isLoading,
        setIsLoading,
        signInWithGoogle,
        upsertUser,
        logOut,
        loginWithEmail,
        createNewUserByEmail,
        admin
    }
}

export default useFirebase;