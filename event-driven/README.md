# 使用document事件实现前端路由

## 实现方式

1. 注册navigation事件
2. 监听navigation事件，在监听器内根据传递的路由渲染对应的内容到页面上
3. 页面首次渲染时使用当前路由触发navigation事件
4. 点击导航时使用pushState更新路由，并使用目标路由触发navigation事件
5. 监听window的popstate事件，在浏览器前进/后退时使用当前路由触发navigation事件
