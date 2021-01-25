<template>
  <nav id="navbar"  class="navbar navbar-expand-lg navbar-light bg-light no-print">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#">Aakansha&nbsp;X-Ray </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/CreateReport"
              class="nav-link active"
              aria-current="page"
              >Create Report</router-link
            >
          </li>
          

         
        </ul>
        <div class="d-flex">
          <ul v-if="user==null" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                class="nav-link active"
                to="/Login"
                aria-current="page"
                >Login</router-link
              >
            </li>
          </ul>
          <ul v-if="user != null" class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
              <div
                class="nav-link active"
              
                id="logoutButton"
                aria-current="page"
              >
                {{user.email}}
              </div>
            </li>
          
            <li class="nav-item">
              <div
                class="nav-link active"
                @click="logout"
                id="logoutButton"
                aria-current="page"
              >
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

 
</template>



<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    //const{logout,error}=useLogout();
    const { user } = getUser();
    const router = useRouter();
const{logout}=useLogout();


    watch(user, () => {
      if (user.value == null) {
          console.log(user)
        router.push({ name: "Home" });
      }
    });

    return { user,logout };
  },
};
</script>

<style scoped>
#logoutButton{
  cursor: pointer;
}

</style>