import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/pages/Home.vue";

//Login
import Login from "@/pages/Login/Login.vue";
import LoginSearch from "@/pages/Login/Search.vue";
import NewPwd from "@/pages/Login/NewPwd.vue";
import LoginMessage from "@/pages/Login/Message.vue";

//Join
import JoinStep from "@/pages/Join/JoinStep.vue";

//Test
import test from "@/pages/test.vue"


Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {path:"/", component: Home},
        
        {path:"/Login", component: Login},
        {path:"/LoginSearch", component: LoginSearch},
        {path:"/NewPwd", component: NewPwd},
        {path:"/LoginMessage/:text", component: LoginMessage},

        {path:"/JoinStep", component: JoinStep},

        {path:"/test", name:"test", component: test}
    ]
})

export default router;