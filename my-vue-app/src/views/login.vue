<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="nickname">Nickname:</label>
        <input v-model="nickname" id="nickname" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';
import router from '@/router';
import axios from '@/services/axios'; // 确保你有一个 Axios 实例配置

export default {
  setup() {
    
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const nickname = ref('hello');
    const password = ref('123');
    const errorMessage = ref('');
  
    const login = async () => {
      try {
        const response = await axios.post('/user/login', {
          nickname: nickname.value,
          password: "23",
        });
        
      
        if (response.code === 1) {
          // 成功登录
          const { role, nickname, userId, token } = response.data;


          authStore.setToken(token);
          userStore.setUserData({ role, nickname, userId });


          // 登录成功后的处理逻辑，例如跳转到主页
          router.push('/index/home'); // 根据需要使用路由跳转
        } else {
          // 登录失败，显示错误消息
          errorMessage.value = 'Login failed: ' + (response.msg || 'Unknown error');
        }
      } catch (error) {
        // 网络错误或其他异常
        errorMessage.value = 'An error occurred: ' + error.message;
      }
    };

    return {
      nickname,
      password,
      login,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
}

form div {
  margin-bottom: 1em;
}

label {
  margin-bottom: .5em;
  color: #333;
  display: block;
}

input {
  border: 1px solid #ddd;
  padding: .5em;
  font-size: 1em;
  width: 100%;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.7em;
  font-size: 1em;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  font-size: 0.9em;
}
</style>
