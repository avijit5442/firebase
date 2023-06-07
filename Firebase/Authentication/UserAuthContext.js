import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword,onAuthStateChanged,GoogleAuthProvider,signInWithPopup,FacebookAuthProvider,GithubAuthProvider,RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import { auth } from "./firebase";
const UserAuthContext=createContext()

export function UserAuthContextProvider({children}){
    const [user, setUser] = useState()
    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }
    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }
    function googleSignIn(){
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth,googleAuthProvider)
    }
    function facebookSignIn(){
        const facebookAuthProvider = new FacebookAuthProvider();
        return signInWithPopup(auth,facebookAuthProvider)
    }
    function githubSignIn(){
        const githubAuthProvider = new GithubAuthProvider();
        return signInWithPopup(auth,githubAuthProvider)
    }
    function verifyCaptcha(phone){
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        recaptchaVerifier.render()
        return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    }
    useEffect(() => {
        const unsubscribe=onAuthStateChanged(auth,(currentuser)=>{
            setUser(currentuser)
        })
      return () => {
        unsubscribe()
      }
    }, [])

    return(
        <UserAuthContext.Provider value={{user,signUp,logIn,googleSignIn,facebookSignIn,githubSignIn,verifyCaptcha}}>
                    {children}
        </UserAuthContext.Provider>
    )
}
export function useUserAuth(){
    return useContext(UserAuthContext)
}