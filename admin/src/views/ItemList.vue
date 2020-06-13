<template>
    <div>
        <h1>Item list</h1>
         <el-table :data="items">
        <el-table-column prop="_id" label="Id" > </el-table-column>
        <el-table-column prop="name" label="category name" >
        </el-table-column>
        <el-table-column fixed="right" label="manipulation" width="180">
            <template slot-scope="scope">
                <el-button @click="$router.push(`/categories/edit/${scope.row._id}`)" type="primary" size="small">edit </el-button>
                 <el-button @click="remove(scope.row)" type="text" size="small">delete </el-button>
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
            const res=await this.$http.get('/rest/item')
            this.items=res.data
        },
        async remove(row){
            this.$confirm(`are you sure to delete item ${row.name} ?`, 'Notice', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async()=>{
           await this.$http.delete(`/rest/item/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })
    }
    },
    created(){
        this.fetch()
    }
}
</script>