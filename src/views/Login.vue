<template>
  <div class="container">
    <br />
    <br />
    <br />
    <br />
    <div class="row justify-content-md-center">
      <div class="col-md-6 col-sm-8">
        <div class="container border p-3 rounded">
          <h3 class="text-center text-secondary" id="FormHead">Login</h3>

          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label text-secondary">Email </label>
              <input
                type="email"
                required
                v-model="email"
                class="form-control text-secondary"
                id="exampleInputEmail1"
              />
            </div>
            <div class="mb-3">
              <label class="form-label text-secondary">Password</label>
              <input
                type="password"
                required
                v-model="password"
                class="form-control text-secondary"
              />
            </div>
            <br />
            <p class="error">{{ error }}</p>
            <br />

            <div class="text-center">
              <button
                v-if="waiting"
                type="submit"
                align="center"
                disabled
                class="btn btn-secondary rounded text-center"
              >
                Loggin in
              </button>
              <button
                v-else
                type="submit"
                align="center"
                class="btn btn-secondary rounded text-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const { error, login, waiting } = useLogin();
    const handleSubmit = async () => {
      console.log(email.value, password.value);

      await login(email.value, password.value);

      if (!error.value) {
        router.push({ name: "Home" });
        console.log("User Logged In");
      }
    };

    return { email, password, handleSubmit, error, waiting };
  },
};
</script>

<style scoped>
</style>