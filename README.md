vue-router 封装了 router-view  router-link  $router  $route
实现vue-router必须实现这些功能,其中router-view ,router-link全局注册    


1.  创建对象，并引出  export default VueRouter

2. constructor使用构造函数，this.init()初始化方法，判断使用路由类型：hash  |  history

3. 使用install方法，插件的必要方法，install方法的第一个参数就是Vue构造器，将实例挂载上去

4. 定义全局组件Vue.component()：<router-link></router-link>    <router-view></router-view>


***
* install方法， 使用插件 Vue.use()，install方法中的第一个参数就是vue构造器

* Vue-Router在install的时候侵入了每个vue componet的beforeCreate以及destroyed生命周期钩子中，在创建之前以及摧毁的时候做一些事情。

* [参考文章](https://juejin.im/post/5af108dc518825672565cf31)，源码请移步[GitHub](https://github.com/vuejs/vue-router)