/*
 * @Author: tongliang
 * @Date:   2015-12-18 17:09:12
 * @Last Modified by:   tongliang
 * @Last Modified time: 2015-12-19 18:54:34
 */

'use strict';

window.onload = function() {
  searchColor();
  timeList();
  slider();
}


// 顶部搜索盒子颜色
var searchColor = function() {
  var header_box = document.getElementsByClassName('jd-header-box')[0];
  var banner = document.getElementById('banner');
  var height = header_box.offsetHeight;
  window.onscroll = function() {
    var scrolltop = document.body.scrollTop;
    if (scrolltop > height) {
      jd_header.style.backgroundColor = 'rgba(201,21,35,0.85)';
    } else {
      var op = scrolltop / height * 0.85;
      // console.log(op);
      jd_header.style.backgroundColor = 'rgba(201,21,35,' + op + ')';
    }
  }
}

// 倒计时
var timeList = function() {
  var parent = document.getElementsByClassName('seckill-time')[0];
  var list = parent.getElementsByClassName('num');
  var time = 6 * 60 * 60,
    timer = null;
  timer = setInterval(function() {
    time--;
    var h = Math.floor(time / 60 / 60);
    var m = Math.floor(time / 60 % 60);
    var s = time % 60;
    // console.log(h + '-' + m + "-" + s);
    list[0].innerHTML = h > 10 ? Math.floor(h / 10) : 0;
    list[1].innerHTML = h % 10;
    list[2].innerHTML = m > 10 ? Math.floor(m / 10) : 0;
    list[3].innerHTML = m % 10;
    list[4].innerHTML = s > 10 ? Math.floor(s / 10) : 0;
    list[5].innerHTML = s % 10;
    if (time <= 0) {
      clearInterval(timer);
    }

  }, 1000);
}

//轮播图
var slider = function() {
  var banner = document.getElementById('banner');
  var width = banner.offsetWidth;
  var imgBox = banner.getElementsByTagName('ul')[0];
  var imgList = imgBox.children;
  var pointBox = banner.getElementsByTagName('ul')[1];
  var pointList = pointBox.children;
  var index = 1,
    timer = null;

  // 动画方法
  var addTransition = function() {
    imgBox.style.transition = 'all .3s ease 0s';
    imgBox.style.webkitTransition = 'all .3s ease 0s';
  }
  var removeTransiton = function() {
    imgBox.style.transition = 'none';
    imgBox.style.webkitTransition = 'none';
  }
  var setTransform = function(t) {
    imgBox.style.transform = 'translateX(' + t + 'px)';
    imgBox.style.webkitTransform = 'translateX(' + t + 'px)';
  }
  var removeTransform = function() {
    imgBox.style.transform = 'none';
    imgBox.style.webkitTransform = 'none';
  }

  // 设置点

  var setPoint = function() {
    var currIndex = 0;
    currIndex = index;
    if (index >= 9) {
      currIndex = 1;
    } else if (index <= 0) {
      currIndex = 8;
    }
    for (var i = 0; i < pointList.length; i++) {
      pointList[i].className = '';
    }
    pointList[currIndex - 1].className = 'active';
  }

  //轮播图开启定时器

  timer = setInterval(function() {
    index++;
    addTransition();
    setTransform(-index * width);
  }, 1000)

  //无缝滚动

  imgBox.addEventListener('transitionEnd', function() {
    if (index >= 9) {
      index = 1;
    } else if (index <= 0) {
      index = 8;
    }
    removeTransiton();
    setTransform(-index * width);
    setPoint();
  }, false)
  imgBox.addEventListener('webkitTransitionEnd', function() {
    if (index >= 9) {
      index = 1;
    } else if (index <= 0) {
      index = 8;
    }
    removeTransiton();
    setTransform(-index * width);
    setPoint();
  }, false)

  // 手指触摸可以滑动图片
  var startX = 0,
    endX = 0,
    moveX = 0;
  imgBox.addEventListener('touchstart', function(e) {
    // console.log('touchstart');
    startX = e.touches[0].clientX;
  });
  imgBox.addEventListener('touchmove', function(e) {
    // console.log('touchmove');
    e.preventDefault();
    endX = e.touches[0].clientX;
    moveX = startX - endX;
    clearInterval(timer);
    removeTransiton();
    setTransform(-index * width - moveX);
  });
  imgBox.addEventListener('touchend', function(e) {
    // console.log('touchend');

    if (Math.abs(moveX) > (1 / 3 * width) && endX != 0) {
      if (moveX > 0) {
        index++;
      } else {
        index--;
      }
      setTransform(-index * width);
    }
    addTransition();
    setTransform(-index * width);

    //初始化
    startX = 0;
    endX = 0;
    clearInterval(timer);
    timer = setInterval(function() {
      index++;
      addTransition();
      setTransform(-index * width);
    }, 1000)
  });

}
