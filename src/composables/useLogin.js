import { ref } from "vue";
import { projectAuth } from "../firebase/config";
 
const error = ref(null);
const waiting=ref(false); 
const login = async (email, password) => {
 
  // every time set the error to null  so next value  in composable get ok there or current value to beerased.....
  error.value = null;
  // making it null again so that  if user try again it dont get re inititalse it come s here againwith the previous value...
 
  try {
      waiting.value=true;
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    waiting.value=false;

    error.value = null;
    // no true false for error text
    console.log(res);
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = "Incorrect Login";
    waiting.value=false;

  }
};
 
const useLogin = () => {
// and why these new function here…….
  return { error, login,waiting };
};
 
export default useLogin;
 
