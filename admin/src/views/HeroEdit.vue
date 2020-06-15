<template>
  <div class="category-edit">
    <h1>{{id?"Edit":"Create"}} Hero</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="base info" name="basic">
          <el-form-item label="hero name:">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="hero title:">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="hero category:">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="hero difficult:">
            <el-rate style="margin-top:0.6rem" max="10" v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="hero skill:">
            <el-rate style="margin-top:0.6rem" max="10" v-model="model.scores.skill"></el-rate>
          </el-form-item>
          <el-form-item label="hero attack:">
            <el-rate style="margin-top:0.6rem" max="10" v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="hero survive:">
            <el-rate style="margin-top:0.6rem" max="10" v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="good items:">
            <el-select v-model="model.itemsGood" multiple>
              <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="bad items:">
            <el-select v-model="model.itemsBad" multiple>
              <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="usage tip">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="usage tip">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="usage tip">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
          <el-form-item label="hero icon:">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.icon" :src="model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="skills" name="skills">
          <el-button @click="model.skills.push({})">
            <i class="el-icon-plus"></i>Add
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
              <el-form-item label="description">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="tips">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button size="small" type="danger" @click="model.skills.splice(i,1)">delete</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem">
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
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
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
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
          skill: 0,
          attack: 0,
          survive: 0
        }
      },
      categories: [],
      items: []
    };
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchItems();
  },
  methods: {
    afterUpload() {},
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/hero/${this.id}`, this.model);
        this.$router.push("/hero/list");
        this.$message({
          type: "success"
        });
      } else {
        await this.$http.post("/rest/hero", this.model);
        this.$router.push("/hero/list");
        this.$message({
          type: "success"
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/hero/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get(`/rest/category`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get("/rest/items");
      this.items = res.data;
    }
  }
};
</script>