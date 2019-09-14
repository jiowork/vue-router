class HistoryRoute {
    constructor() {
        this.current = null
    }
}
// 创建对象，并引出  export default VueRouter
class VueRouter {
    // 构造函数
    constructor(options) {
        this.mode = options.mode || "hash"
        this.routes = options.routes || []
        this.routesMap = this.createMap(this.routes)
        this.history = new HistoryRoute()
        this.init() //用于初始化
    }
    init() {
        if (this.mode === "hash") {
            // 使用hash路由
            location.hash ? "" : location.hash = "/"
            // console.log(location.hash)  // #/
            window.addEventListener("load", () => {
                this.history.current = location.hash.slice(1)
            })
            window.addEventListener("hashchange", () => {
                this.history.current = location.hash.slice(1)
            })
        } else {
            // 使用非hash路由，即history路由
            location.pathname ? "" : location.pathname = "/"
            window.addEventListener("load", () => {
                this.history.current = location.pathname
            })
            window.addEventListener("popstate", () => {
                this.history.current = location.pathname
            })
        }
    }
    // createMap方法可以将数组结构转化为对象结构
    // [
    //     {path:"/home",component:Home},
    //     {path:"/about",component:About},
    // ]
    createMap(routes) {
        // reduce方法 遍历数组的每一个元素，第一个参数初始值为空，通常用作累加器
        // https://www.runoob.com/jsref/jsref-reduce.html
        return routes.reduce((memo, current) => {
            memo[current.path] = current.component
            return memo
        }, {})
    }
    // 定义方法
    push() {}
    go() {}
    back() {}
}
// install方法中的第一个参数就是vue构造器
// 当使用Vue.use(Vue-router)时，调用install方法
VueRouter.install = function (Vue) {
    Vue.mixin({
        // 给每个组件都混入一个beforeCreate
        beforeCreate() {
            //  获取根组件
            if (this.$options && this.$options.router) {
                // 找到根组件
                // 把当前实例挂载到_root
                this._root = this
                // 把router实例挂载到_router上
                this._router = this.$options.router
                // 异步
                Vue.util.defineReactive(this,"xxx",this._router,history)
            } else {
                this._root = this.$parent._root
            }
            // this.$options.name 获取组件的名字
            Object.defineProperty(this, "$router", {
                get() {
                    return this._root._router
                }
            })
            Object.defineProperty(this, "$route", {
                get() {
                    return {
                        current:this._root._router.history.current
                    }
                }
            })
        },
    })
    // 定义全局组件 Vue.component()
    Vue.component("router-link", {
        props: {
            to:String
        },
        render(h) {
            let mode=this._self._root._router.mode
            return <a href={mode === 'hash' ? `#${this.to}` : this.to}>{this.$slots.default}</a>
        },
    })
    Vue.component("router-view", {
        render(h) {
            let current = this._self._root._router.history.current
            let routesMap = this._self._root._router.routesMap
            return h(routesMap[current])
        },
    })
}

export default VueRouter