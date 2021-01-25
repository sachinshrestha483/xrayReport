import { ref } from "vue";
import { projectStorage } from "../firebase/config";


const useStorage=()=>{
    const error = ref(null);
    const url = ref(null);
    const filePath = ref(null);

const uploadReportPdf=async(file)=>{
   filePath.value=`x-ray_Report_pdf/${file.name}`
   const storageRef=projectStorage.ref(filePath.value)

   try{
       const res=await storageRef.put(file);
       url.value= await res.ref.getDownloadURL();
       return res;

   }
   catch(err){
       console.log(err.message);
       error.value=err.message;
   }


}

const deleteReportPdf=async(filePath)=>{

    const storageRef = projectStorage.ref(filePath);
    try {
        storageRef.delete();
      } catch (err) {
          console.log(err.message);
        error.value = err.message;
      }
};






return{url,filePath,error,uploadReportPdf,deleteReportPdf}
}


export default useStorage

