# DC-SDK

<p>
<img src="https://img.shields.io/github/actions/workflow/status/dvgis/dc-sdk/build.yml"/>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<a href="https://www.npmjs.com/package/@dvgis/dc-sdk" target="_blank">
 <img src="https://img.shields.io/npm/v/@dvgis/dc-sdk?color=orange&logo=npm" />
</a>
<a href="https://www.npmjs.com/package/@dvgis/dc-sdk" target="_blank">
 <img src="https://img.shields.io/npm/dt/@dvgis/dc-sdk?logo=npm"/>
</a>
<a href="https://resource.dvgis.cn/dc-docs/v2.x/zh" target="_blank">
 <img src="https://img.shields.io/badge/docs-online-yellow.svg"/>
</a>
<a href="http://dc.dvgis.cn" target="_blank">
 <img src="https://img.shields.io/badge/demo-online-red.svg"/>
</a>
</p>

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> `DC-SDK` 是基于开源项目 `Cesium` 进行二次开发的二三维一体的 `WebGis` 应用框架，该框架优化了部分 `Cesium` 的使用方式和增添一些通用功能，旨在为开发者快速构建 `WebGis` 应用。

```warning
Tips：本框架是 JS+GIS 的框架包。开发者需要有一定的前端技术和 GIS 相关技术
```

## 运行示例

```shell
  yarn run build
  yarn run server
```

## 安装

`NPM / YARN` **_`(推荐使用)`_**

NPM / YARN 的方式安装，它能更好地和 `webpack` 打包工具配合使用。

```shell
yarn add @dvgis/dc-sdk
-------------------------
npm install @dvgis/dc-sdk
```

```js
import DC from '@dvgis/dc-sdk/dist/dc.base.min' //基础包
import DcCore from '@dvgis/dc-sdk/dist/dc.core.min' //核心包
import DcChart from '@dvgis/dc-sdk/dist/dc.chart.min' //chart包
import DcMapv from '@dvgis/dc-sdk/dist/dc.mapv.min' //mapv包
import DcS3M from '@dvgis/dc-sdk/dist/dc.s3m.min' // s3m包
import '@dvgis/dc-sdk/dist/dc.core.min.css' // 主要样式
```

`NPM / YARN` **_`(按需安装)`_**

```shell
yarn add @dvgis/dc-base
yarn add @dvgis/dc-core
yarn add @dvgis/dc-chart
yarn add @dvgis/dc-mapv
yarn add @dvgis/dc-s3m
-------------------------
npm install @dvgis/dc-base
npm install @dvgis/dc-core
npm install @dvgis/dc-chart
npm install @dvgis/dc-mapv
npm install @dvgis/dc-s3m
```

```js
import DC from '@dvgis/dc-base' //基础包
import DcCore from '@dvgis/dc-core' //核心包
import DcChart from '@dvgis/dc-chart' //chart包
import DcMapv from '@dvgis/dc-mapv' //mapv包
import DcS3M from '@dvgis/dc-s3m' //mapv包
import '@dvgis/dc-core/dist/dc.core.min.css' // 主要样式
```

`CDN`

[Resources 下载链接](https://github.com/dvgis/dc-sdk/releases)

```html
<!--基础包-->
<script src="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.base.min.js"></script>
<!--核心包-->
<script src="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.core.min.js"></script>
<!--chart包-->
<script src="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.chart.min.js"></script>
<!--mapv包-->
<script src="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.mapv.min.js"></script>
<!--s3m包-->
<script src="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.s3m.min.js"></script>
<!--主要样式-->
<link
  href="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.core.min.css"
  rel="stylesheet"
  type="text/css"
/>
```

```
请将 resources 放置工程根目录 libs/dc-sdk 下，如果放置到其他目录下，框架将无法正常运行
```

## 配置

> 配置主要用于 `NPM / YARN` 的方式

由于 `DC` 框架中将 `CESIUM_BASE_URL` 设置为 `./libs/dc-sdk/resources/` ，这样需将 Cesium 相关的静态资源文件: `Assets` 、`Workers` 、`ThirdParty` 复制到工程的 `libs/dc-sdk/resources` 目录下以保证三维场景能够正常呈现,也可通过 `DC.baseUrl` 进行 `Cesium` 相关的静态资源路基设置

`Webpack`

[工程模板](https://github.com/cavencj/dc-vue-app)

```js
// webpack.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
        to: 'libs/dc-sdk/resources',
      },
    ]),
  ],
}
```

`Vue2.x`

[工程模板](https://github.com/dvgis/dc-vue)

```js
// vue.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  // 其他配置
  chainWebpack: (config) => {
    config.plugin('copy').use(CopywebpackPlugin, [
      [
        {
          from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
          to: 'libs/dc-sdk/resources',
        },
      ],
    ])
  },
}
```

`Vue3.x`

[工程模板](https://github.com/dvgis/dc-vue-next)

```js
// vue.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  // 其他配置
  chainWebpack: (config) => {
    config.plugin('copy').use(CopywebpackPlugin, [
      {
        patterns: [
          {
            from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
            to: path.join(__dirname, 'dist', 'libs/dc-sdk/resources'),
          },
        ],
      },
    ])
  },
}
```


## 开始

```js
global.DC = DC
DC.use(DcCore) // Node 方式
DC.ready(() => {
  let viewer = new DC.Viewer(divId) // divId 为一个div节点的Id属性值，如果不传入，会无法初始化3D场景
})
```

## 示例

|  ![picture](http://dc.dvgis.cn/examples/images/baselayer/baidu.png?v=3) | ![picture](http://dc.dvgis.cn/examples/images/baselayer/tdt.png?v=2) | ![picture](http://dc.dvgis.cn/examples/images/baselayer/arcgis.png?v=3) | ![picture](http://dc.dvgis.cn/examples/images/mini-scene/china.gif) |
|  :-----------------------------------------------------------: | :-----------------------------------------------------------: | :------------------------------------------------------------------: | :--------------------------------------------------------------: |
|  ![picture](http://dc.dvgis.cn/examples/images/mini-scene/dfmz.gif) | ![picture](http://dc.dvgis.cn/examples/images/mini-scene/factory.gif?v=1) | ![picture](http://dc.dvgis.cn/examples/images/layer/cluster_circle.gif) | ![picture](http://dc.dvgis.cn/examples/images/model/shp_custom_shader.gif) |
|  ![picture](http://dc.dvgis.cn/examples/images/overlay/polyline_image_trail.gif) | ![picture](http://dc.dvgis.cn/examples/images/overlay/wall_trail.gif?v=1) | ![picture](http://dc.dvgis.cn/examples/images/overlay/water.gif?v=2)  |  ![picture](http://dc.dvgis.cn/examples/images/overlay/plot-overlay.png?v=3)   |

[更多>>](http://dc.dvgis.cn/#/examples)

## QQ 群

<p>
<img src="http://dc.dvgis.cn/examples/images/base/q1.png?v=2" style="width:60px;height:60px" title="数字视觉(已满)"/>
<img src="http://dc.dvgis.cn/examples/images/base/q2.png?v=6" style="width:60px;height:60px" title="Cesium开心农场"/>
<img src="http://dc.dvgis.cn/examples/images/base/q3.png?v=6" style="width:60px;height:60px" title="数字视觉(2群)"/>
</p>

## 支持

> 如果dc-sdk能够给您带来效益，请支持一下呗~
<p>
<img src="http://dc.dvgis.cn/examples/images/base/sponsor.jpg?v=2" style="width:60px;height:60px" title="数字视觉"/>
</p>

## 版权声明

```warning
1.框架作为一个基础平台，代码开源，任何个人和机构可以修改、重构，无需经过我方授权。
2.任何个人和机构修改框架出现的问题，我方无需负责。
3.后期会添加一些行业性的插件和工具，代码会适量开源。
4.对于我方发布的程序包，任何个人和机构在遵守下列条件的前提下可以永久免费使用:
   1)程序包完整引用；
   2)保留此版权信息在控制台输出
我方保留对此版权信息的最终解释权。
```

## 谢谢
