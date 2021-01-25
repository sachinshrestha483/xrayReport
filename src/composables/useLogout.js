import {ref} from "vue";
import { useRouter } from "vue-router";
import {projectAuth} from "../firebase/config";



const error= ref(null);
const router= useRouter();


const logout =async()=>{
    error.value=null;

try{
    await projectAuth.signOut()
    //router.push({name:Home})
}catch(err){
console.log(err.message)
error.value=err.message
}

}


const useLogout=()=>{
    return {logout,error}
}

export default useLogout