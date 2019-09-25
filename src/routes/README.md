## hce-routes
hce-routes responds to route change. Then change inner contents with imported html

```
<hce-routes src="page1.html">
  <div route-match="page1" import="page1.html"></div>
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
  </ul>
</hce-routes>
```