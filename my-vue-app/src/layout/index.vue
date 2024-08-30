<template>
  <el-container style="height: 100vh;">
    <!-- 头部区域 -->
    <el-header style="background-color: #409EFF; color: white; display: flex; align-items: center; padding: 0 20px;">
      <el-button @click="toggleMenu" icon="el-icon-menu" style="margin-right: 15px;"></el-button>
      <span>Header</span>
    </el-header>

    <el-container>
      <!-- 左侧可隐藏菜单 -->
      <el-aside v-show="isMenuVisible" width="200px" style="background-color: #D3DCE6;">
        <el-menu default-active="1" class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="/index/home">
            <router-link to="/index/home">
              <i class="el-icon-s-home"></i>
              <span>主页</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="/index/scores">
            <router-link to="/index/scores">
              <i class="el-icon-document"></i>
              <span>查看往期成绩</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="/index/training">
            <router-link to="/index/training">
              <i class="el-icon-training"></i>
              <span>训练</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="/index/personal">
            <router-link to="/index/personal">
              <i class="el-icon-user"></i>
              <span>个人信息</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="/index/employee-management" v-if="isAdmin">
            <router-link to="/index/employee-management">
              <i class="el-icon-user-solid"></i>
              <span>员工管理</span>
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容区域 -->
      <el-main style="background-color: #F2F6FC;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { computed, ref } from 'vue';
import { useUserStore } from '@/store/user'; // 如果你使用 Pinia

export default {
  setup() {
    const userStore = useUserStore();
    
    const isMenuVisible = ref(true); // 控制左侧菜单显示隐藏的状态
    const isAdmin = computed(() => userStore.role === 'admin'); // 检查是否为管理员

    function toggleMenu() {
      isMenuVisible.value = !isMenuVisible.value; // 切换菜单显示状态
    }

    return {
      isMenuVisible,
      isAdmin,
      toggleMenu,
    };
  },
};
</script>

<style scoped>
/* 可根据需要自定义样式 */
</style>
