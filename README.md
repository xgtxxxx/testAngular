项目的开发人员首先需要安装node.js，下载地址：http://www.nodejs.org。

接下来需要安装[bower](http://bower.io/)和[grunt](http://www.gruntjs.net/)。
其中bower用来管理项目的js框架和类库，grunt提供了一整套前端开发的解决方案，包括：运行项目、单元测试、js/css/html代码的压缩合并等等。

安装方法，打开命令行分别运行如下命令：
npm install -g bower
npm install -g grunt-cli

构建工程:
npm install
bower install

运行项目
grunt serve

将项目构建到dist下面：
grunt build

测试
grunt test