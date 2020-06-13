<template>
  <div class="category-edit">
    <h1>{{id?"Edit":"Create"}} Category</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
         <el-form-item label="item name:">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
      <el-form-item label="item icon:">
        <el-upload
  class="avatar-uploader"
  action="http://localhost:3000/admin/api/upload"
  :show-file-list="false"
  :on-success="afterUpload">
 
  <img v-if="model.icon" :src="model.icon" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    afterUpload(){

    },
    async save() {

      if (this.id) {
        await this.$http.put(`/rest/item/${this.id}`,this.model);
        this.$router.push("/item/list");
        this.$message({
          type: "success"
        });
      } else {
         await this.$http.post("/rest/item", this.model);
        this.$router.push("/item/list");
        this.$message({
          type: "success"
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/item/${this.id}`);
      this.model = res.data;
    },
    
  }
};
</script>