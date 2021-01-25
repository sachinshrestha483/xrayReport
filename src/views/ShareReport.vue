<template>
 
  

  <div v-if="document == null && error == null">Loading.......</div>

  <div v-else>
    <div v-if="document != null">
      <div id="paper">
        <div class="p-2 border border-dark">
        

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
        

       <br>
       <br>

        <p
          class="text-center text-uppercase fs-3 text-decoration-underline font-weight-bold"
        >
          {{ document.xrayType }}
        </p>


        <br />
      
      

        <div id="text" v-html="document.description" ></div>

      




      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Editor from "@tinymce/tinymce-vue";

import getDocument from "../composables/getDocument";
import useDocument from "../composables/useDocument";
export default {
    components: {
    editor: Editor,
  },
  props: ["id"],
  setup(props) {
   

    const { error, document } = getDocument("reports", props.id);


console.log(document)




    return {
      document,
      error
    };
  },
};
</script>


<style scoped >
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