import router from '@/router';
import AuthService from '@/services/AuthService';
import { defineStore } from 'pinia';

export const authSetStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(userData: { email: string, password: string }): Promise<void> {
      const auth = new AuthService();
      const login = await auth.login(userData.email, userData.password);

      if (login.errors?.[0]) {
        alert(login.errors[0].message);
      } else {
        const token = login.token;
        this.token = token;
        localStorage.setItem('token', token);
        router.push('/dashboard');
      }
    },

    isAuthenticated(): boolean {
      return !!this.token;
    },

    logout() {
      this.token = null;
      localStorage.removeItem('token');
      router.push('/login');
    }
  }
});
