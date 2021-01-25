<template>
  <div class="text-center no-print">
    <button
      type="button"
      v-on:click="increaseSpace"
      class="btn btn-secondary btn-sm m-2"
    >
      Increase Space
    </button>
    <button
      type="button"
      v-on:click="decreaseSpace"
      class="btn btn-secondary btn-sm"
    >
      Derease Space
    </button>
    <br />
    <br />
    <label>Add A Pdf Instead</label>
    <br />
    <br />

    <div class="row justify-content-md-center">
      <br />

      <div class="col-4">
        <div class="input-group mb-3">
          <input type="file"
          multiple
          v-on:change="addPdf"
           class="form-control" id="inputGroupFile01" />
        </div>
        <p class="text-danger">{{fileError}}</p>
        <button 
        type="button"
        v-on:click="uploadPdf" 
        class="btn btn-secondary btn-sm">
          Upload Pdf
        </button>
      </div>
    </div>
  </div>

  <div v-for="(space, index) in spaces" :key="index">
    <br />
  </div>

  <div v-if="document == null && error == null">Loading.......</div>

  <div v-else>
    <div v-if="document != null">
      <div id="paper">
        <div class="p-2 border border-dark">
          <button
            type="button"
            v-on:click="EditHeader"
            class="btn btn-secondary btn-sm m-1 no-print"
          >
            ✎
          </button>

          <div class="row">
            <div class="col-6">
              <p class="">Patient Name: {{ document.patientName }}</p>
              <p class="">Age/Sex: {{ document.age }}/{{document.gender}}</p>
              <p class="">Modality: {{ document.modality }}</p>
            </div>

            <div class="col-6">
              <p class="">Patient ID: {{ document.pid }}</p>
              <p class="">
                Report Date/Time: {{ document.date }}/{{ document.time }}
              </p>
              <p class="">Ref. Phys.: {{ document.refBy }}</p>
            </div>
          </div>
        </div>
        <div
          class="p-2 border border-dark bg-light"
          id="headerEditor"
          v-if="showHeaderEditer"
        >
          <br />
          <br />
          <div class="row">
            <br />
            <div class="col-6">
              <div class="row">
                <div class="col-4 pl-1">Patient&nbsp;Name:<br /></div>
                <div class="col-8">
                  <input
                    class="form-control"
                    v-model="document.patientName"
                    id="ex3"
                    type="text"
                  />
                </div>
              </div>
              <br />

              <div class="row">
                <div class="col-4 pl-1">Age/Sex:<br /></div>
                <div class="col-4">
                  <input
                    class="form-control"
                    v-model="document.age"
                    id="ex3"
                    type="text"
                  />
                                  
                </div>
                  <div class="col-4">
                  <input
                    class="form-control"
                    v-model="document.gender"
                    id="ex3"
                    type="text"
                  />
                                  
                </div>
              </div>
              <br />

              <div class="row">
                <div class="col-4 pl-1">Modality:<br /></div>
                <div class="col-8">
                  <input
                    class="form-control"
                    v-model="document.modality"
                    id="ex3"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div class="col-6">
              <div class="row">
                <div class="col-4 pl-1">Patient ID:<br /></div>
                <div class="col-8">
                  <input
                    class="form-control"
                    v-model="document.pid"
                    id="ex3"
                    type="text"
                  />
                </div>
              </div>

              <br />

              <div class="row">
                <div class="col-4 pl-1">Report Date:<br /></div>
                <div class="col-8">
                  <input
                    class="form-control"
                    v-model="document.date"
                    id="ex3"
                    type="date"
                  />
                </div>
              </div>

              <br />
              <div class="row">
                <div class="col-4 pl-1">Ref. Phys.:<br /></div>
                <div class="col-8">
                  <input
                    class="form-control"
                    v-model="document.refBy"
                    id="ex3"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <br />
            <br />

            <div class="col-6">
              <div class="row">
                <div class="col-4 pl-1">Time<br /></div>
                <div class="col-8">
                  <input
                    class="form-control"
                    v-model="document.time"
                    id="ex3"
                    type="time"
                  />
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <button
            type="button"
            v-on:click="UpdateHeader"
            class="btn btn-secondary text-center"
          >
            Save
          </button>
          <br />
          <br />
        </div>

        <br />
        <button
          type="button"
          v-on:click="EditXrayType"
          class="btn btn-secondary btn-sm m-1 no-print"
        >
          ✎
        </button>

        <p
          class="text-center text-uppercase fs-3 text-decoration-underline font-weight-bold"
        >
          {{ document.xrayType }}
        </p>

        <div class="text-center" v-if="showXrayTypeEditer">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <input
                type="text"
                v-model="document.xrayType"
                class="form-control"
              />
            </div>
            <button
              type="button"
              v-on:click="UpdateXrayType"
              class="btn btn-secondary text-center col-md-4"
            >
              Save
            </button>
          </div>
        </div>

        <br />

        <button
          type="button"
          v-on:click="EditXrayDescription"
          class="btn btn-secondary btn-sm m-1 no-print"
        >
          ✎
        </button>

        <div id="text" v-html="document.description"></div>

        <div v-if="showXrayDescriptionEditer" class="no-print">
          <button
            v-if="showXrayDescriptionEditer"
            type="button"
            v-on:click="UpdateExrayDescription"
            class="btn btn-secondary text-center no-print"
          >
            Save
          </button>
          <br />
          <br />

          <editor
            v-model="document.description"
            api-key="no-api-key"
            :init="{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Editor from "@tinymce/tinymce-vue";

import getDocument from "../composables/getDocument";
import useDocument from "../composables/useDocument";
import useStorage from "../composables/useStorage";



export default {
  components: {
    editor: Editor,
  },
  props: ["id"],
  setup(props) {
    const spaces = ref([]);
    const showHeaderEditer = ref(false);

    const showXrayTypeEditer = ref(false);
    const showXrayDescriptionEditer = ref(false);

    const file=ref(null);

const fileError=ref("");

    const { error, document } = getDocument("reports", props.id);


    const { updateDoc,deleteDoc } = useDocument("reports", props.id);


          const{uploadReportPdf,deleteReportPdf,url,filePath}=useStorage();

    const types = ["application/pdf"];

const addPdf=(e)=>{
const selected= e.target.files[0]
      console.log(selected);
if(selected && types.includes(selected.type))
{
    file.value=selected;
    

}
else{
    file.value=null;
    fileError.value="Please Select File or File With Proper Format";
}

}





const uploadPdf= async()=>{
//     if(document.reportPdfpath==""){
//         console.log("Here in if ")
// await deleteReportPdf(props.reportPdfpath)
//     }
if(document.reportLink!=""){
   await deleteReportPdf(document.reportPdfpath);  
    }
if(file.value!=null){
let r=await uploadReportPdf(file.value);
if(r!=null){
updateDoc({
    reportLink:url.value,
    reportPdfpath:filePath.value

})
}

console.log(r)
}


    


}



    const increaseSpace = () => {
      spaces.value.push("space");
    };
    const decreaseSpace = () => {
      spaces.value.pop();
    };

    const EditHeader = () => {
      console.log("Edit Header");
      showHeaderEditer.value = !showHeaderEditer.value;
    };

    const UpdateHeader = async () => {
      console.log("Update Header");

      const res = await updateDoc({
        age: document.value.age,
        date: document.value.date,
        //  descrtption:document.value.descrtption,
        gender: document.value.gender,
        modality: document.value.modality,
        patientName: document.value.patientName,
        time: document.value.time,
        pid: document.value.pid,
        refBy: document.value.refBy,
        //  xrayType:document.xraytype,
      });
    };

    const EditXrayType = () => {
      showXrayTypeEditer.value = !showXrayTypeEditer.value;
    };

    const UpdateXrayType = async () => {
      console.log("Update Type");

      const res = await updateDoc({
        //  descrtption:document.value.descrtption,

        xrayType: document.value.xrayType,
      });
    };

    const EditXrayDescription = () => {
      showXrayDescriptionEditer.value = !showXrayDescriptionEditer.value;
    };

    const UpdateExrayDescription = async () => {
      //console.log("Update Description");
      const res = await updateDoc({
        description: document.value.description,

        // xrayType:document.value.xrayType,
      });
    };

    error.value = "dwd";
    return {
      document,
      error,
      spaces,
      increaseSpace,
      decreaseSpace,
      EditHeader,
      EditXrayType,
      EditXrayDescription,
      showHeaderEditer,
      showXrayTypeEditer,
      showXrayDescriptionEditer,
      UpdateHeader,
      UpdateXrayType,
      UpdateExrayDescription,
      fileError,
      uploadPdf,
      addPdf
    };
  },
};
</script>


<style scoped>
#frame {
  box-sizing: border-box;
  width: 623px;
  height: 100px;
  overflow: visible;
  background-color: #ffffff;
  border: 1px solid #222222;
  margin: 0 auto;
}
#paper {
  width: 794px;
  height: 1123px;
  overflow: hidden;
  background-color: #ffffff;
  /* border: 1px solid #222222; */
  margin: 0 auto;
  padding: 2cm;
}

#navbar {
  display: none;
}

#headerEditor {
  color: #538ffb #5b54fa;
}
</style>