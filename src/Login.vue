<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="heading">Login</h2>
      <div class="logo">
        <img :src="logo" alt="Logo" width="60" height="60" />
      </div>

      <form @submit.prevent="onSubmit">
        <div class="form-control">
          <label for="email">Email address</label>
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            id="email"
          />
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Enter your password"
            id="password"
          />
        </div>

        <button type="submit" class="btn">Sign In</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.webp' // Adjust the path as necessary

export default defineComponent({
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')

    const onSubmit = () => {
      if (email.value === 'Amir' && password.value === 'root') {
        localStorage.setItem('connexion', 'true')
        router.replace('/')
      }
    }

    return {
      email,
      password,
      onSubmit,
      logo,
    }
  },
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.heading {
  text-align: center;
  margin-bottom: 1.5rem;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.form-control {
  margin-bottom: 1.5rem;
}

.form-control label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-control input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
}

.btn {
  width: 100%;
  padding: 1rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2b6cb0;
}
</style>
