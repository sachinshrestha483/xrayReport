import {ref,watcEffect} from "vue";
import {projectFirestore} from "../firebase/config"

const getDocumet =(collection,id)=>{

const document=ref(null);
const error= ref(null);


let documentRef= projectFirestore
.collection(collection)
.doc(id);

const unsub=documentRef.onSnapshot(
    (doc)=>{
        if(doc.data()){
            document.value={...doc.data(),id:doc.id}

        }

        else{
            error.value="that document dont exist"
        }

        // Update Values

        console.log("Data Fetched Sucessfully");
        error.value=null;

    },
    (err)=>{
        console.log(err.message);
        error.value="Could Not fetch The data";
    }


)
return { error, document};

}

export default getDocumet;


