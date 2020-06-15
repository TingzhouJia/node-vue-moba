<template>
  <div class="category-edit">
    <h1>{{id?"Edit":"Create"}} Article</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
         <el-form-item label="parent category name:">
        <el-select v-model="model.categories" multiple>
            <el-option v-for="item in parent" :key="item._id" :label="item.name" :value="item._id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="article name:">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
            <el-form-item label="article detail:">
       <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdd"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import {VueEditor} from 'vue2-editor'
export default {
  props: {
    id: {}
  },
      components:{
        VueEditor
    },
  data() {
    return {
      model: {
          categories:[]
      },
      categories:[]
    };
  },
  created() {
      this.fetchCategory()
    this.id && this.fetch();
  },
  methods: {
      async handleImageAdd(file,Editor,cursorLocation,resetUploader){
            var formData=FormData()
            formData.append("image",file)
            const res=await this.$http.post('/upload',formData)
            Editor.insertEmbed(cursorLocation,"image",res.data.url),
            resetUploader()
      },
    async save() {

      if (this.id) {
        await this.$http.put(`/rest/article/${this.id}`,this.model);
        this.$router.push("/article/list");
        this.$message({
          type: "success"
        });
      } else {
         await this.$http.post("/rest/article", this.model);
        this.$router.push("/article/list");
        this.$message({
          type: "success"
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/article/${this.id}`);
      this.categories = res.data;
    },
    async fetchCategory(){
        const res=await this.$http.get('/rest/categories')
        this.parent=res.data
    }
  }
};
</script>