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

initializeAuthentication();

const useFirebase = () => {
    // states
    const [user , setUser] = useState({});
    const [isLoading , setIsLoading] = useState(true);
    const [authError , setAuthError] = useState('');

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
        const unsubscirbe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
          } else {
            setUser();
          }
          setIsLoading(false);
        });
        return unsubscirbe;
      }, [auth]);

    return {
        user,
        isLoading,
        setIsLoading,
        signInWithGoogle,
        authError,
        logOut,
        loginWithEmail,
        createNewUserByEmail
    }
}

export default useFirebase;