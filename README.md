## 修改说明：

  旨在：降低react技术栈深度、减少一些新技术过早的引入、应用最合适的开发工具（因人而异）、体验react新版本，修改了[react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)的技术架构；
  同时，也为了结合当前比较认可的React UI框架；
  抛砖引玉，希望可以帮助到有需要的同胞！

  修改内容详见[Github Commits](https://github.com/WeiFei365/react-boilerplate-3.5.0/commits/master)；
  在真实的使用中，可根据需要截取部分的 commit，或增加其他的自定义；

### 使用说明

  - 在 Git 仓库中新建一个项目，然后 clone 到本地；
  - 命令行进入到该项目根目录，如果没有 package.json 文件的话，运行 ```npm init```初始化该项目（生成 package.json 文件）；
  - 拷贝本项目根目录的所有文件（夹）到新建的项目，package.json 文件的内容可能需要和本项目的做 diff 合并处理；
  - 替换项目名称：在新项目根目录全局搜索: react-boilerplate-3.5.0 ,然后替换成需要的名称；
  - 测试新项目的可行性：```npm install``` 安装所有依赖、```npm start```启动本地开发、打开浏览器：localhost:3000，如果也页面正常不报错，下一步，否则检查报错，或提交 issue 给本项目；
  - 提交新项目所有的更改到远程仓库；
  - 继续开发......

### 组件目录结构、规划说明

  * /apis* 目录：所有请求 api 的存放目录，其内，以文件名划分不同的业务需求；
  * /antds* 目录：所有需要引用的 Antd 的组件目录，为了达到*按需加载*的目的；
  * /components* 目录：所有通用并且功能性组件的目录；
  * /containers* 目录：所有路由、布局、固定元素级别的组件目录，并且，路由内自用的组件、工具函数等在其内建子目录或文件存放；
  * /utils* 目录：项目个性化的 utils 目录；
  * /web-utils* 目录：参考[web-utils](https://github.com/WeiFei365/web-utils)，理论上不要修改、新增任一子目录，应该以其原项目的更新做修改依据；

### 开发、提交说明

  因为项目默认会在```git commit```时检查所有更改文件是否符合编码规范，因此推荐的提交流程：

  - 在项目根目录执行：```npm run lint```，如果出现代码不规范的错误提示，请尝试修改代码，不合理或不熟悉的 eslint 规则可 google 或在 package.json 中添加规则的忽略，再或者在不合规的代码处禁用某规则的检查：eslint-disable
  - 以上所有错误解决完毕后，再提交到远程仓库；切记不要先执行 commit 命令，因为如果报错，可能会在 git log 中插入不必要的 commit 信息；

### Antd 说明

#### 按需加载说明

  为了达到按需加载组件的方式，在 app 根目录创建 antds 目录专门用来管理项目中需要的 antd 组件，当项目中新需要 antd 的某个组件时，以下步骤（以 Button 组件为例）：
  - 在 app/antds 目录下新建目录 Button；
  - 在新建的 Button 目录新建 index.js 文件；
  - 在新建的 index.js 文件中从 antd 引入 Button 组件，包括 less 样式文件，代码如下：
    ```javascript
    import Button from 'antd/lib/button';
    // 引入 less 文件，方便在 less-loader 的 modifyVars 修改主题
    import 'antd/lib/button/style';

    export default Button;
    ```
  - 在需要使用 Button 组件的地方，这样导入 Button 组件：
    ```javascript
    import Button from 'antds/Button';
    ```

#### 定制主题

  在上一步中，从 antd 引入了 Button 组件，组件样式的引入方式是 ```antd/lib/button/style```，也就是引入了 less 文件，
  而 webpakc 的关于 antd 的 less 的 loader 的配置支持以 *modifyVars* 的方式改变 antd 中的 less 变量值，因此可以在 *app/antd-modifyVars.js* 中定制需要的样式，可定制样式参数参见: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

### Redux & saga 说明

  使用示例参考 [containers/GithubPage](https://github.com/WeiFei365/react-boilerplate-3.5.0/tree/master/app/containers/GithubPage) 组件的代码，以及对应的 commit 记录；

  另外，以下两种业务场景稍后更新（TODO）：
  * 在单 route 组件内（也就是同一个 reducer）增加多个 saga 的 watch；
  * 在单 route 组件内（原则上的单 reducer），如何拆分成多 reducer 模式，应用场景如：store 中保存多个 fetch 状态时，可能会出现：*loadingA、errorA、dataA、loadingB、errorB、dataB、loadingC、errorC、dataC......*，如何简化/隔离同类型参数名的定义；

  * 附1：[中文文档](https://cn.redux.js.org/)
  * 附2：在编写 redux 的测试代码时（也就是 GithubPage 模块），调试了很久，redux 总是不能通知 react 组件 props 更新，最后发现是：必须要在 reducer 中返回新的 state（比如 Object.assign({}, state)），redux 才能识别 state 更新，然后才能通知 UI 层更新！
  * 附3：示例中 ```stateAny``` Action 的定义是为了精简同类型（纯更新 store 中数据）操作的 Action 数量；

### 打包、发布说明

  因为项目中移除了测试模块，因此，在代码检查无误的情况下，在项目根目录直接执行：
  ```bash
  npm run build
  ```
  然后将在根目录生成的 /build 目录发送到web服务器即可；

### 约定

  * 因为使用了[web-utils](https://github.com/WeiFei365/web-utils)，所以在 history 的使用上，当需要使用或更改history/location的状态时，推荐导入[web-utils/store/history](https://github.com/WeiFei365/react-boilerplate-3.5.0/blob/master/app/web-utils/store/history.js)模块来使用/操作；
  * 同样的，对于 localStorage 的使用，也推荐导入[web-utils/store/local-storage](https://github.com/WeiFei365/react-boilerplate-3.5.0/blob/master/app/web-utils/store/local-storage.js)模块来使用/操作；更深入的使用可以查看源码；
  * 因为在3.5.0版本中超越了[react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)将 react 技术栈升级到最新版，之后需要真实的业务做验证，因此，本架构可能在将来进行持续优化更新，在这里约定在 commint 的日志中以"[修订]"作为前缀，以区别于当前[2018-10-18]的提交，类似的可能还有：[新增]、[补充]......

### 多说两句

  * react-router-redux: 其实并不需要在 redux 中保存 route 状态，并且原作者也已经明确启用该库了；
  * react-router 与 react-router-dom 的区别，其实就像 react 和 react-dom 的区别类似， react-router 是 router 的核心库， react-router-dom 是 react-router 在浏览器端的应用实现；附 react-router 的中文 API: https://react-router.docschina.org/

<img src="https://raw.githubusercontent.com/react-boilerplate/react-boilerplate-brand/master/assets/banner-metal-optimized.jpg" alt="react boilerplate banner" align="center" />

<br />

<div align="center"><strong>Start your next react project in seconds</strong></div>
<div align="center">A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices</div>

<br />

<div align="center">
  <!-- Dependency Status -->
  <a href="https://david-dm.org/react-boilerplate/react-boilerplate">
    <img src="https://david-dm.org/react-boilerplate/react-boilerplate.svg" alt="Dependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/react-boilerplate/react-boilerplate#info=devDependencies">
    <img src="https://david-dm.org/react-boilerplate/react-boilerplate/dev-status.svg" alt="devDependency Status" />
  </a>
  <!-- Build Status -->
  <a href="https://travis-ci.org/react-boilerplate/react-boilerplate">
    <img src="https://travis-ci.org/react-boilerplate/react-boilerplate.svg" alt="Build Status" />
  </a>
  <!-- Test Coverage -->
  <a href="https://coveralls.io/r/react-boilerplate/react-boilerplate">
    <img src="https://coveralls.io/repos/github/react-boilerplate/react-boilerplate/badge.svg" alt="Test Coverage" />
  </a>
</div>
<div align="center">
    <!-- Backers -->
  <a href="#backers">
    <img src="https://opencollective.com/react-boilerplate/backers/badge.svg" alt="Backers" />
  </a>
      <!-- Sponsors -->
  <a href="#sponsors">
    <img src="https://opencollective.com/react-boilerplate/sponsors/badge.svg" alt="Sponsors" />
  </a>
  <a href="http://thinkmill.com.au/?utm_source=github&utm_medium=badge&utm_campaign=react-boilerplate">
    <img alt="Supported by Thinkmill" src="https://thinkmill.github.io/badge/heart.svg" />
  </a>
  <!-- Gitter -->
  <a href="https://gitter.im/mxstbr/react-boilerplate">
    <img src="https://camo.githubusercontent.com/54dc79dc7da6b76b17bc8013342da9b4266d993c/68747470733a2f2f6261646765732e6769747465722e696d2f6d78737462722f72656163742d626f696c6572706c6174652e737667" alt="Gitter Chat" />
  </a>
</div>

<br />

<div align="center">
  <sub>Created by <a href="https://twitter.com/mxstbr">Max Stoiber</a> and maintained with ❤️ by an amazing <a href="https://github.com/orgs/react-boilerplate/teams/core">team of developers</a>.</sub>
</div>

## Features

<dl>
  <dt>Quick scaffolding</dt>
  <dd>Create components, containers, routes, selectors and sagas - and their tests - right from the CLI!</dd>

  <dt>Instant feedback</dt>
  <dd>Enjoy the best DX (Developer eXperience) and code your app at the speed of thought! Your saved changes to the CSS and JS are reflected instantaneously without refreshing the page. Preserve application state even when you update something in the underlying code!</dd>

  <dt>Predictable state management</dt>
  <dd>Unidirectional data flow allows for change logging and time travel debugging.</dd>

  <dt>Next generation JavaScript</dt>
  <dd>Use template strings, object destructuring, arrow functions, JSX syntax and more, today.</dd>

  <dt>Next generation CSS</dt>
  <dd>Write composable CSS that's co-located with your components for complete modularity. Unique generated class names keep the specificity low while eliminating style clashes. Ship only the styles that are on the page for the best performance.</dd>

  <dt>Industry-standard routing</dt>
  <dd>It's natural to want to add pages (e.g. `/about`) to your application, and routing makes this possible.</dd>

  <dt>Industry-standard i18n internationalization support</dt>
  <dd>Scalable apps need to support multiple languages, easily add and support multiple languages with `react-intl`.</dd>

  <dt>Offline-first</dt>
  <dd>The next frontier in performant web apps: availability without a network connection from the instant your users load the app.</dd>

  <dt>SEO</dt>
  <dd>We support SEO (document head tags management) for search engines that support indexing of JavaScript content. (eg. Google)</dd>
</dl>

But wait... there's more!

  - *The best test setup:* Automatically guarantee code quality and non-breaking
    changes. (Seen a react app with 99% test coverage before?)
  - *Native web app:* Your app's new home? The home screen of your users' phones.
  - *The fastest fonts:* Say goodbye to vacant text.
  - *Stay fast*: Profile your app's performance from the comfort of your command
    line!
  - *Catch problems:* AppVeyor and TravisCI setups included by default, so your
    tests get run automatically on Windows and Unix.

There’s also a <a href="https://vimeo.com/168648012">fantastic video</a> on how to structure your React.js apps with scalability in mind. It provides rationale for the majority of boilerplate's design decisions.

<sub><i>Keywords: React.js, Redux, Hot Reloading, ESNext, Babel, react-router, Offline First, ServiceWorker, `styled-components`, redux-saga, FontFaceObserver</i></sub>

## Quick start

1. Clone this repo using `git clone --depth=1 https://github.com/react-boilerplate/react-boilerplate.git`
2. Move to the appropriate directory: `cd react-boilerplate`.<br />
3. Run `npm run setup` in order to install dependencies and clean the git repo.<br />
   *We auto-detect `yarn` for installing packages by default, if you wish to force `npm` usage do: `USE_YARN=false npm run setup`*<br />
   *At this point you can run `npm start` to see the example app at `http://localhost:3000`.*
4. Run `npm run clean` to delete the example app.

Now you're ready to rumble!

> Please note that this boilerplate is **production-ready and not meant for beginners**! If you're just starting out with react or redux, please refer to https://github.com/petehunt/react-howto instead. If you want a solid, battle-tested base to build your next product upon and have some experience with react, this is the perfect start for you.

## Documentation

- [**The Hitchhikers Guide to `react-boilerplate`**](docs/general/introduction.md): An introduction for newcomers to this boilerplate.
- [Overview](docs/general): A short overview of the included tools
- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [Testing](docs/testing): How to work with the built-in test harness
- [Styling](docs/css): How to work with the CSS tooling
- [Your app](docs/js): Supercharging your app with Routing, Redux, simple
  asynchronicity helpers, etc.
- [**Troubleshooting**](docs/general/gotchas.md): Solutions to common problems faced by developers.

## Supporters

This project would not be possible without the support by these amazing folks. [**Become a sponsor**](https://opencollective.com/react-boilerplate) to get your company in front of thousands of engaged react developers and help us out!

<a href="https://opencollective.com/react-boilerplate/bronze-sponsor/0/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/bronze-sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/bronze-sponsor/1/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/bronze-sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/bronze-sponsor/2/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/bronze-sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/bronze-sponsor/3/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/bronze-sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/bronze-sponsor/4/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/bronze-sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/bronze-sponsor/5/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/bronze-sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/bronze-sponsor/6/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/bronze-sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/bronze-sponsor/7/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/bronze-sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/bronze-sponsor/8/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/bronze-sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/bronze-sponsor/9/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/bronze-sponsor/9/avatar.svg"></a>

----

<a href="https://opencollective.com/react-boilerplate/backer/0/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/backer/1/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/backer/2/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/backer/3/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/backer/4/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/backer/5/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/backer/6/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/backer/7/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/backer/8/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/react-boilerplate/backer/9/website" target="_blank"><img src="https://opencollective.com/react-boilerplate/backer/9/avatar.svg"></a>


## License

This project is licensed under the MIT license, Copyright (c) 2017 Maximilian
Stoiber. For more information see `LICENSE.md`.
