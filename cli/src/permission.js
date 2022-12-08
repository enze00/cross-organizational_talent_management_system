import router,{constantRouterMap,asyncRouterMap,resetRouter} from "@/router";
import store from "@/store";
import getPageTitle from "@/util/get_page_title";

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = getPageTitle(to.meta.title)
  next()
})