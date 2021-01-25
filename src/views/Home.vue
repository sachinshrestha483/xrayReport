<template>
  <div class="home">
    <div class="container">
      <br />
      <div class="jumbotron">
        <div align="center">
          <br />

          <img
            src="../assets/home.png"
            width="120"
            height="120"
            class="img-fluid"
            alt="..."
          />
          <br />
          <h1 class="display-4 text-center">Aakansha X-Ray</h1>
        </div>
      </div>
      <br />
      <br />
      <div class="row p-4">
        <div class="col-8"></div>
        <div class="col-4">
          <div class="mb-3">
            <label class="form-label text-center">Search</label>
            <input type="text"  v-on:keyup="SearchFun"   v-model="search" class="form-control" />
          </div>
        </div>
      </div>

<div v-if="isSearching">
  <h3>Filter Results</h3>
  <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Open</th>
              <th scope="col">Pdf</th>

              <th>Share</th>
              <th v-if="user">Delete</th>

              <th v-if="user">Change Status</th>

              <th scope="col">Status</th>
              <th scope="col">Patient&nbsp;Id</th>
              <th scope="col">&nbsp;Patient&nbsp;Name&nbsp;</th>
              <th scope="col">Age</th>
              <th scope="col">&nbsp;&nbsp;X-Ray&nbsp;Type&nbsp;&nbsp;</th>
              <th scope="col">&nbsp;Date&nbsp;</th>
              <th scope="col">Sex</th>
              <th scope="col">
                &nbsp;&nbsp;&nbsp;Ref&nbsp;By&nbsp;&nbsp;&nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="doc in searchResults"
              :class="doc.status == 0 ? 'table-danger' : 'table-primary'"
              :key="doc"
            >
              <th id="pointer" v-on:click="PushtoSeeReport(doc.id)">
                <h3>🖨️</h3>
              </th>
              <th id="pointer">
                <h3>
                  <a :href="doc.reportLink" target="_blank">{{
                    doc.reportLink == "" ? "" : "📄"
                  }}</a>
                </h3>
              </th>

              <th id="pointer" v-on:click="PushToShareReport(doc.id)">
                <h3>🔗</h3>
              </th>
              <th
                v-if="user"
                id="pointer"
                v-on:click="deleteReport(doc, doc.id)"
              >
                <h3>🗑</h3>
              </th>

              <th v-if="user">
                <div
                  v-on:click="changeStatus(doc.id, doc.status)"
                  class="btn btn-secondary"
                >
                  Change Status
                </div>
              </th>

              <th scope="row">
                {{ doc.status == 0 ? "प्रिंट करना  है" : "प्रिंट हो चूका है" }}
              </th>
              <td>{{ doc.pid }}</td>
              <td>{{ doc.patientName }}</td>

              <td>{{ doc.age }}</td>
              <td>{{ doc.xrayType }}</td>
              <td>{{ doc.date }}</td>
              <td>{{ doc.gender }}</td>
              <td>{{ doc.refBy }}</td>
            </tr>
          </tbody>
        </table>
      </div>
</div>
<div v-else>
  <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Open</th>
              <th scope="col">Pdf</th>

              <th>Share</th>
              <th v-if="user">Delete</th>

              <th v-if="user">Change Status</th>

              <th scope="col">Status</th>
              <th scope="col">Patient&nbsp;Id</th>
              <th scope="col">&nbsp;Patient&nbsp;Name&nbsp;</th>
              <th scope="col">Age</th>
              <th scope="col">&nbsp;&nbsp;X-Ray&nbsp;Type&nbsp;&nbsp;</th>
              <th scope="col">&nbsp;Date&nbsp;</th>
              <th scope="col">Sex</th>
              <th scope="col">
                &nbsp;&nbsp;&nbsp;Ref&nbsp;By&nbsp;&nbsp;&nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="doc in documents"
              :class="doc.status == 0 ? 'table-danger' : 'table-primary'"
              :key="doc"
            >
              <th id="pointer" v-on:click="PushtoSeeReport(doc.id)">
                <h3>🖨️</h3>
              </th>
              <th id="pointer">
                <h3>
                  <a :href="doc.reportLink" target="_blank">{{
                    doc.reportLink == "" ? "" : "📄"
                  }}</a>
                </h3>
              </th>

              <th id="pointer" v-on:click="PushToShareReport(doc.id)">
                <h3>🔗</h3>
              </th>
              <th
                v-if="user"
                id="pointer"
                v-on:click="deleteReport(doc, doc.id)"
              >
                <h3>🗑</h3>
              </th>

              <th v-if="user">
                <div
                  v-on:click="changeStatus(doc.id, doc.status)"
                  class="btn btn-secondary"
                >
                  Change Status
                </div>
              </th>

              <th scope="row">
                {{ doc.status == 0 ? "प्रिंट करना  है" : "प्रिंट हो चूका है" }}
              </th>
              <td>{{ doc.pid }}</td>
              <td>{{ doc.patientName }}</td>

              <td>{{ doc.age }}</td>
              <td>{{ doc.xrayType }}</td>
              <td>{{ doc.date }}</td>
              <td>{{ doc.gender }}</td>
              <td>{{ doc.refBy }}</td>
            </tr>
          </tbody>
        </table>
      </div>
</div>

    
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// @ is an alias to /src
import getCollection from "../composables/getCollection";
import getUser from "../composables/getUser";
import useDocument from "../composables/useDocument";
import useStorage from "../composables/useStorage";
import { useRouter } from "vue-router";
export default {
  name: "Home",
  components: {},

  setup() {
    const router = useRouter();
    const { error, documents } = getCollection("reports");
const search=ref("");
const searchResults=ref([]);
const isSearching=ref(false);
    const PushtoSeeReport = (id) => {
      router.push({ name: "Report", params: { id } });
    };

    const PushToShareReport = (id) => {
      router.push({ name: "ShareReport", params: { id } });
    };

    const { user } = getUser();

const SearchFun=(key)=>{

if(search.value==""){
  isSearching.value=false;
}
else{
  isSearching.value=true;

}

  console.log("search is:"+search.value);
  let temp;
  temp=documents.value.filter((e)=>{
let t=false;
    for (let key in e) {
        
        if(key=="createdAt"||key=="description"||key=="reportLink"||key=="reportPdfPath"||key=="status"){
continue;
        }
        
        if(typeof e[key]=="string"){
         
         if(e[key].toLowerCase().includes(search.value.toLowerCase())){



           console.log("Fount it in: "+e[key])
t=true;
break
         }


         }
  }
return t;
  })
  console.log(temp);

  searchResults.value=[...temp];
  //documents.value=temp.value;
}












    const deleteReport = async (doc, id) => {
      const { deleteReportPdf } = useStorage();
      const { deleteDoc } = useDocument("reports", id);
      if (doc.reportLink != "") {
        console.log("delete report karna hai")
        await deleteReportPdf(doc.reportPdfpath);
      }

      await deleteDoc();
    };
    const changeStatus = (id, status) => {
      console.log("Status:" + id);
      const { updateDoc } = useDocument("reports", id);

      let res = null;

      if (status == 0) {
        res = updateDoc({ status: 1 });
      } else if (status == 1) {
        res = updateDoc({ status: 0 });
      }

      if (res == null) {
        error.value = "Not Able To Change Status";
        console.log("error");
      }

      console.log("Status:");

      console.log(id);
    };

    return {
      documents,
      error,
      user,
      changeStatus,
      PushtoSeeReport,
      PushToShareReport,
      deleteReport,
      search,
      SearchFun,
      isSearching,
      searchResults
    };
  },
};
</script>

<style scoped>
#pointer {
  cursor: pointer;
}
</style>