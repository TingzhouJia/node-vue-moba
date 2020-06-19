<template>
    <el-container style="height: 100vh; ">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1',]" unique-opened default-active="$route.path">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>content</template>
        <el-menu-item-group>
          <template slot="title">Category</template>
          <el-menu-item index="/categories/create">new category</el-menu-item>
          <el-menu-item index="/categories/list">show category</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">Object</template>
          <el-menu-item index="/item/create">new object</el-menu-item>
          <el-menu-item index="/item/list">show object</el-menu-item>
        </el-menu-item-group>
       <el-menu-item-group>
          <template slot="title">Article</template>
          <el-menu-item index="/item/create">new article</el-menu-item>
          <el-menu-item index="/item/list">show article</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">Ads</template>
          <el-menu-item index="/ads/create">new ads</el-menu-item>
          <el-menu-item index="/ads/list">show ads</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>admin </template>
        <el-menu-item-group>
          <template slot="title">admin</template>
          <el-menu-item index="/admin/create">new admin</el-menu-item>
          <el-menu-item index="/admin/list">show admin</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    
    <el-main>
     
      <router-view :key="$route.path"></router-view>
    </el-main>
  </el-container>
</el-container>




</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>