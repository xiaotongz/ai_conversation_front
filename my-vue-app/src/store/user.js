// src/store/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    role: null,
    nickname: null,
    userId: null,
  }),
  actions: {
    setUserData({ role, nickname, userId }) {
      this.role = role;
      this.nickname = nickname;
      this.userId = userId;
    },
    clearUserData() {
      this.role = null;
      this.nickname = null;
      this.userId = null;
    },
  },
});
