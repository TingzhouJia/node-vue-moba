<template>
    <div>
        <h1>category list</h1>
         <el-table :data="items">
        <el-table-column prop="_id" label="Id" > </el-table-column>
        <el-table-column prop="name" label="category name" >
        </el-table-column>
        <el-table-column fixed="right" label="manipulation" width="180">
            <template slot-scope="scope">
                <el-button @click="$router.push(`/categories/edit/${scope.row._id}`)" type="primary" size="small">edit </el-button>
                
            </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            items:[]
        }
    },
    methods:{
        async fetch(){
            const res=await this.$http.get('/categories')
            this.items=res.data
        }
    },
    created(){
        this.fetch()
    }
}
</script>