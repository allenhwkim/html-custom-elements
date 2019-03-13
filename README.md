# html-custom-elements

[![Build Status](https://travis-ci.org/allenhwkim/html-custom-elements.png)](https://travis-ci.org/allenhwkim/html-custom-elements)

Collection of html custom elements (IE11/Chrome/Safari/FF compatible)

![image](https://user-images.githubusercontent.com/1437734/46240499-8fbebf00-c376-11e8-9c59-04f7a6b3469d.png) ![image](https://user-images.githubusercontent.com/1437734/46240506-a8c77000-c376-11e8-9e89-a410ce0563ff.png) ![image](https://user-images.githubusercontent.com/1437734/46240509-b54bc880-c376-11e8-98ea-52a708780d2f.png) ![image](https://user-images.githubusercontent.com/1437734/46240513-bf6dc700-c376-11e8-9f9d-2c70a7b22aa7.png)

[DEMO](https://allenhwkim.github.io/html-custom-elements/#home)
![image](https://user-images.githubusercontent.com/1437734/54254491-45975780-452a-11e9-8d03-38adb4545d65.png)

## Dead simple
Just include html-custom-element.js. Done!
## Light as a feather
12KB minified & gzipped.
## Blazing fast
No framework loading, or any dependence. It's based on built-in web standard, custom elements.
## Basic Usage
```
<!DOCTYPE html>
<html lang="en">
<head>
  <b><script src="http://unpkg.com/html-custom-elements/dist/html-custom-elements.umd.js"></script></b>
</head>
<body>
  <hce-carousel id="x1" selected="1">
    <ul>
      <li><img src="//picsum.photos/300/200?1"></li>
      <li><img src="//picsum.photos/300/200?2"></li>
      <li><img src="//picsum.photos/300/200?3"></li>
      <li><img src="//picsum.photos/300/200?4"></li>
    </ul>
  </hce-carousel>
</body>
</html>
```

## Usage with Webpack, Browserify, & Other Bundlers
If you want to use it with a bundler, install `html-custom-elements` with npm:
```
$ npm install html-custom-elements --save-dev
```
Simply import the module into your bundle:
```
import 'html-custom-elements';
```
[Stackblitz Demo](https://stackblitz.com/edit/hce-basic-usage)

## For Developer

``` bash
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm start
# build for production with minification
npm run build
```
