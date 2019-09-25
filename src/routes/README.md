## hce-routes
hce-routes responds to route change. Then change inner contents with imported html

```
<hce-routes>
  <div route-match="page1" import="page1.html" default></div>
  <div route-match="page2" import="page2.html"></div>
</hce-routes>
```

hce-routes respones to route change. Then set active as class to any elements that has 'href' attributes

```
<hce-routes>
  <ul class="table-of-contents">
    <li><a href="#home">home</a></li>
    <li><a href="#tooltip" class="active">tooltip</a></li>
    <li><a href="#tabs">tabs</a></li>
    <li><a href="#loading">loading</a></li>
    <li><a href="#carousel">carousel</a></li>
    <li><a href="#snackbar">snackbar</a></li>
    <li><a href="#drawer">drawer</a></li>
    <li><a href="#dialog">dialog</a></li>
    <li><a href="#calendar">calendar</a></li>
    <li><a href="#list">list</a></li>
    <li><a href="#overlay">overlay</a></li>
    <li><a href="#menu">menu</a></li>
    <li><a href="#file">file</a></li>
    <li><a href="#sticky">sticky</a></li>
    <li><a href="#routes">routes</a></li>
    <li><a href="#draggable">draggable</a></li>
    <li><a href="#collapsible">collapsible</a></li>
  </ul>
</hce-routes>
```