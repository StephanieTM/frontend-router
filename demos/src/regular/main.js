function support_history_api () {
  // 判断浏览器是否支持history API
  return !!(window.history && history.pushState);
}

function setupHistoryClicks() {
  // 为导航按钮增加点击事件监听器
  addClicker(document.getElementById('photonext'));
  addClicker(document.getElementById('photoprev'));
}

function addClicker(link) {
  if (!link) {
    return;
  }
  link.addEventListener('click', function (e) {
    // 点击导航后先获取新路由的内容并将其替换到页面中
    swapPhoto(link.href);
    // 使用history API在不刷新页面的情况下更新路由
    history.pushState(null, null, link.href);
    // 阻止a标签的默认行为（跳转至目标链接）
    e.preventDefault();
  }, false);
}

function swapPhoto(href) {
  const req = new XMLHttpRequest();
  req.open(
    'GET',
    `${window.location.origin}/src/regular/parts/${href.split('/').pop()}`,
    false
  );
  req.send(null);
  if (req.status === 200) {
    // 获取到新路由的内容后将其替换到页面中
    document.getElementById('gallery').innerHTML = req.responseText;
    // 为新页面中的导航按钮增加点击事件监听器
    setupHistoryClicks();
    return true;
  }
  return false;
}

window.onload = function () {
  if (!support_history_api()) {
    return;
  }
  // 初次加载页面时，如果浏览器支持history API：
  // 先获取当前路由的内容并将其渲染到页面中
  swapPhoto(window.location.pathname);
  // 为页面中的导航按钮增加点击事件监听器
  setupHistoryClicks();
  window.setTimeout(function () {
    // 监听window的popstate事件（该事件在浏览器前进/后退时触发）
    window.addEventListener('popstate', function () {
      // 当浏览器前进/后退时获取变化后的路由的内容并将其渲染到页面中
      swapPhoto(window.location.pathname);
    }, false);
  }, 1);
}
