<template>
  <div class="category-edit">
    <h1>{{id?"Edit":"Create"}} Admin</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="admin name:">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="admin password:">
        <el-input v-model="model.password"></el-input>
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
  border-color: #409eff;
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
      model: {
        items: []
      }
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    afterUpload() {},
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/ads/${this.id}`, this.model);
        this.$router.push("/ads/list");
        this.$message({
          type: "success"
        });
      } else {
        await this.$http.post("/rest/ads", this.model);
        this.$router.push("/ads/list");
        this.$message({
          type: "success"
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/ads/${this.id}`);
      this.model = Object.assign({}, thos.model, res.data);
    }
  }
};
</script>