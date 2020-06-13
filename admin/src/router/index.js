import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/ItemEdit.vue'
import HeroList from '../views/ItemList.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path:'/categories/create',component:CategoryEdit},
      {path:'/categories/edit/:id',component:CategoryEdit,props:true},
      {path:'/categories/list',component:CategoryList},

      {path:'/item/create',component:ItemEdit},
      {path:'/item/edit/:id',component:ItemEdit,props:true},
      {path:'/item/list',component:ItemList},
            
      {path:'/hero/create',component:HeroEdit},
      {path:'/hero/edit/:id',component:HeroEdit,props:true},
      {path:'/hero/list',component:HeroList}
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
