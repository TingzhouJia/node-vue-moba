<template>
  <div class="category-edit">
    <h1>{{id?"Edit":"Create"}} Category</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
         <el-form-item label="parent category name:">
        <el-select v-model="model.parent">
            <el-option v-for="item in parent" :key="item._id" :label="item.name" :value="item._id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="category name:">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parent:[]
    };
  },
  created() {
    this.fetchParent()
    this.id && this.fetch();
  },
  methods: {
    async save() {

      if (this.id) {
        await this.$http.put(`/rest/categories/${this.id}`,this.model);
        this.$router.push("/categories/list");
        this.$message({
          type: "success"
        });
      } else {
         await this.$http.post("/rest/categories", this.model);
        this.$router.push("/categories/list");
        this.$message({
          type: "success"
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParent(){
        const res=await this.$http.get('/rest/categories')
        this.parent=res.data
    }
  }
};
</script>
