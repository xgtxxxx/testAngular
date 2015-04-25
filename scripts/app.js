/**
 * 声明app
 * 注意：
 * 1、不管有没有依赖其他service，都必须加上[]。
 * 2、app里面所有需要用到的依赖包，都需要在这块引入，否则在controller中无法注入相关的service
 */
angular.module('angularApp', ['ui.router','ngAnimate','ui.bootstrap','ngCookies','ngMessages']);
        