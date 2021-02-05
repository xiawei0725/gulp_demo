# gulp_demo

## 使用说明

- 安装依赖 `npm install`

- 开发启动 `npm run dev`

~~由于`gulp`对`polyfill` 有点问题，所以我这里支持两种构建打包，如果你的代码没有使用ES6+的高级API或者一些垫片，那么你可以直接`npm run build2`,如果你使用了`Promise`或者`Array.prototype.includes`等高级特性，那么你就运行`npm run build1`,当然`build1`我也保留了原汁原味的打包，你可以看看打包后的结果，但是不能用于浏览器环境。~~

- 上面这里有bug,不知道为什么串行一直失败,所以删除了。所以不支持`polyfill`和 `es6+`的导入导出语法，请自行在`html`中引入,
- 
- `index.html`里面直接引入`dist`开头的静态资源,每次`build`会删除`dist`