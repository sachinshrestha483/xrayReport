<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-8 col-sm-12">
        <div class="container border p-3 rounded">
          <h1 class="text-center text-secondary" id="FormHead">
            Create Report
          </h1>

          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label text-secondary">Patient ID</label>
              <input
                type="text"
                v-model="pid"
                required
                class="form-control text-secondary"
              />
            </div>

            <div class="mb-3">
              <label class="form-label text-secondary">X-Ray Type</label>
              <input
                type="text"
                v-model="xrayType"
                required
                class="form-control text-secondary"
              />
            </div>
            <div class="mb-3">
              <label class="form-label text-secondary">Patient Name</label>
              <input
                type="text"
                v-model="pname"
                required
                class="form-control text-secondary"
                id="exampleInputEmail1"
              />
            </div>
            <div class="mb-3">
              <label class="form-label text-secondary">Age</label>
              <input
                type="text"
                required
                v-model="age"
                class="form-control text-secondary"
              />
            </div>
            <div class="mb-3">
              <label class="form-label text-secondary">Sex</label>
              <input
                type="text"
                required
                v-model="gender"
                class="form-control text-secondary"
              />
            </div>
            <div class="mb-3">
              <label class="form-label text-secondary">Modality</label>
              <input
                type="text"
                v-model="modality"
                required
                class="form-control text-secondary"
              />
            </div>
            <div class="mb-3">
              <label class="form-label text-secondary">Report Date</label>
              <input
                type="date"
                v-model="date"
                required
                class="form-control text-secondary"
              />
            </div>
            <div class="mb-3">
              <label class="form-label text-secondary"> Report Time</label>
              <input
                type="time"
                v-model="time"
                required
                class="form-control text-secondary"
              />
            </div>
            <div class="mb-3">
              <label class="form-label text-secondary">Ref. Phys.: </label>
              <input
                type="text"
                v-model="refBy"
                required
                class="form-control text-secondary"
              />
            </div>
            <div class="error m-2">
              {{ fileError }}
            </div>
            <div class="input-group mb-3">
              <input
                multiple
                @change="handleChange"
                type="file"
                class="form-control"
                id="inputGroupFile02"
              />
            </div>
            <div id="emailHelp" class="form-text mb-3">
              If Already Have Edited Pdf File Then Upload it
            </div>

            <div class="mb-3">
              <label class="form-label text-secondary"
                >Report Description
              </label>
              <editor
                v-model="description"
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
<div class="error">{{error}}</div>
            <button
              v-if="isPending"
              type="submit"
              v-on:click="handleSubmit"
              class="btn btn-primary rounded"
            >
              Submitting ....
            </button>
            <button
              v-if="!isPending"
              type="submit"
              v-on:click="handleSubmit"
              class="btn btn-primary rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import useCollection from "../composables/useCollection";
import useStorage from "../composables/useStorage";
import { timestamp } from "@/firebase/config";
import { ref } from "vue";
import { useRouter } from 'vue-router';

export default {
  components: {
    editor: Editor,
  },

  setup() {
    const {  addDoc } = useCollection("reports");
    const { url, filePath, uploadReportPdf } = useStorage();
      const router=useRouter();

    // const {updateDoc}=useDocument("playlists",props.playList.id);
    const pname = ref("");
    const age = ref("");
    const gender = ref("");
    const modality = ref("");
    const refBy = ref("");
    const pid = ref("");
    const xrayType = ref("");
    const date = ref("");
    const time = ref("");
    const description = ref("");
    const file = ref(null);
    const isPending = ref(false);
    const fileError = ref(null);
    const error=ref(null);

    const types = ["application/pdf"];

    const handleChange = (e) => {
      const selected = e.target.files[0];

      console.log(selected);

      if (selected && types.includes(selected.type)) {
        file.value = selected;
      } else {
        file.value = null;
        fileError.value = "Please Select an Pdf File with .pdf Extension";
      }
    };

    const handleSubmit = async () => {
      isPending.value = true;
      if (file.value) {
     let res=   await uploadReportPdf(file.value);

     if(res==null){
      isPending.value = false;
error.value="Not Able To Add Report";

     }
      }

      const data = {
        patientName: pname.value,
        age: age.value,
        gender: gender.value,
        modality: modality.value,
        refBy: refBy.value,
        pid: pid.value,
        xrayType: xrayType.value,
        date: date.value,
        time: time.value,
        description: description.value,
        reportLink: url.value == null ? "" : url.value,
        reportPdfpath: filePath.value == null ? "" : filePath.value,
                  createdAt: timestamp(),
                  status:0


      };
     let res= await addDoc(data);
if(res==null){
error.value="Not Able To Add Report";
  
}
      isPending.value = false;
      router.push({name:"Home"});



      pname = "";
      age = "";
      gender = "";
      modality = "";
      refBy = "";
      pid = "";
      xrayType = "";
      date = "";
      time = "";
      description = "";
      file = null;
      isPending = false;
      fileError = null;

      console.log(data);
    };

    return {
      handleSubmit,
      pname,
      age,
      gender,
      modality,
      refBy,
      pid,
      xrayType,
      date,
      time,
      description,
      isPending,
      handleChange,
      fileError,
      error,
    };
  },
};
</script>

<style scoped>
#formhead {
  color: #4f515a;
}
</style>