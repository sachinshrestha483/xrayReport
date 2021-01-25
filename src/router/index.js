import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateReport from "../views/CreateReport"
import Login from "../views/Login"
import Report from "../views/Report"
import ShareReport from "../views/ShareReport"


import {projectAuth,projectFirestore} from "../firebase/config"

const requireAuth =(to,from,next)=>{
  let user= projectAuth.currentUser
  console.log("Current User in Auth Guard is:"+user)
  if(!user){
    next({name:'Home'})// check if user there 
  }
   
  next() // if next not here it wont reach where it want to reach
  // here is a problem that when refreshes firebase require time to connect so before that we need to put it on hold  because before that  user would be null  so we can do tat setting on  main.js...
  }
  




const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/CreateReport',
    name: 'CreateReport',
    component: CreateReport,
    beforeEnter:requireAuth

  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path:'/Report/:id',
    name:'Report',
    component:Report,
    props:true
  },
  {
    path:'/ShareReport/:id',
    name:'ShareReport',
    component:ShareReport,
    props:true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
