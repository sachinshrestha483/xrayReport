import {ref} from "vue";
import {projectAuth} from "../firebase/config"


const user= ref(projectAuth.currentUser);

projectAuth.onAuthStateChanged((_user)=>{
    console.log(user.value);
console.log("User value Canged")
user.value=_user;
console.log(user)

})


const getUser=()=>{
    return {user}
}

export default getUser