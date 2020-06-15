<template>
  <div class="category-edit">
    <h1>{{id?"Edit":"Create"}} Advertisement</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="ads name:">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="advertisement:">
        <el-button @click="model.items.push({})">
          add adds
        </el-button>

        <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="name">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="icon">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:3000/admin/api/upload"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
             
              <el-form-item>
                  <el-button size="small" type="danger" @click="model.skills.splice(i,1)">delete</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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