/*
 * @Author: tongliang
 * @Date:   2015-12-19 18:29:17
 * @Last Modified by:   tongliang
 * @Last Modified time: 2015-12-20 12:44:09
 */

'use strict';

window.onload = function() {
  categoryLeft();
  categoryRight();
}
var categoryLeft = function() {
  //左边盒子
  var parentBox = document.querySelector('#category_left');
  var childBox = document.querySelector('.category-left-box');
  var childBoxList = childBox.querySelectorAll('li');
  var parentH = parentBox.offsetHeight - document.querySelector('#topBar').offsetHeight;
  var childH = childBox.offsetHeight;

  // 右边盒子
  var rightBox = document.querySelector('#category_right');

  var startY = 0,
    endY = 0,
    moveY = 0,
    currY = 0,
    upDownY = 150,
    startTime = 0,
    endTime = 0;

  /*加过渡*/
  var addTransition = function() {
      childBox.style.transition = "all .3s ease 0s";
      childBox.style.webkitTransition = "all .3s ease 0s";
    }
    /*减过渡*/
  var removeTransition = function() {
      childBox.style.transition = "none";
      childBox.style.webkitTransition = "none";
    }
    /*改变位置*/
  var setTransform = function(t) {
    childBox.style.transform = 'translateY(' + t + 'px)';
    childBox.style.webkitTransform = 'translateY(' + t + 'px)';
  }

  childBox.addEventListener('touchstart', function(e) {
    //console.log('start');
    startY = e.touches[0].clientY;
    //console.time('tap');
    startTime = new Date().getTime();
    //console.log(startTime);

  }, false);

  childBox.addEventListener('touchmove', function(e) {
    console.log('move');
    e.preventDefault();
    endY = e.touches[0].clientY;
    moveY = startY - endY;
    /*上下的间距不大于upDownY*/
    if (currY - moveY < upDownY && currY - moveY > -(childH - parentH) - upDownY) {
      removeTransition();
      setTransform(currY - moveY);
    }

    //moveY =  startY - endY时
    //老师写的
    //if (currY - moveY < upDownY && currY - moveY > -(childH - parentH) - upDownY) {
    //自己的另一种理解
    // var distance = Math.abs(currY - moveY);
    // if (moveY < 0 && distance < upDownY ||
    //   moveY > 0 && distance < childH - parentH + upDownY) {
    //
    //
    // moveY = endY - startY (暂时currY = 0) 时
    // 向下滑动 ：moveY >0，moveY - currY > 0,让距离小于150
    //
    // 向上滑动：(translate小于0，即是向上滑动)
    // moveY < 0，moveY - currY < 0（为负）。
    // 需求：让最后一个li离最下面距离小于150
    // （整个childBox向上滑动距离不能超过 (childH - parentH) +upDownY。
    // childH - parentH 为整个childBox原本可以向上滑动到的距离，
    // 向上滑动translate小于0，所以为- (childH - parentH)，再往上滑动150，
    // 所以 - (childH - parentH) -upDownY（为负）
    // 两个负数可以通过绝对值来理解判断用大于号还是小于号


  }, false);

  childBox.addEventListener('touchend', function(e) {
    //console.log('end');
    /*上面满足吸附的条件*/
    if (currY - moveY > 0) {
      addTransition();
      setTransform(0);
      currY = 0;
    }
    /*下面满足吸附的条件*/
    else if (currY - moveY < -(childH - parentH)) {
      addTransition();
      setTransform(-(childH - parentH));
      currY = -(childH - parentH);
    }
    /*正常情况*/
    else {
      currY = currY - moveY;
    }
    endTime = new Date().getTime();
    //console.log(endTime);
    //console.log(endTime - startTime);
    //console.timeEnd('tap');
    if (endTime - startTime < 150 && moveY == 0) {
      for (var i = 0; i < childBoxList.length; i++) {
        childBoxList[i].classList.remove('active');
        childBoxList[i].index = i;
      }
      //console.log(e.target);
      var li = e.target.parentNode;
      li.classList.add('active');
      var translateY = -li.index * 50;
      if (translateY > -(childH - parentH)) {
        addTransition();
        setTransform(translateY);
        currY = translateY;
      } else {
        removeTransition();
        setTransform(-(childH - parentH));
        currY = -(childH - parentH);
      }
      rightBox.style.transition = 'all .2s ease 0s';
      rightBox.style.webkitTransition = 'all .2s ease 0s';
      rightBox.style.opacity = 0;
      setTimeout(function() {
        rightBox.style.opacity = 1;
      }, 200);

    }

  }, false);

}

//右边盒子刷新效果

var categoryRight = function() {
    var parentBox = document.querySelector('#category_right');
    var childBox = parentBox.querySelector('.category-right-box');
    //console.log(childBox);
    refresh(childBox, parentBox, 150);

  }
  //
  //
  //
  //此方法的功能：模拟向上向下拖动刷新
  //childBox被拖动的DOM元素, parentBox被拖动的DOM元素的父亲,
  //upDownY能被拖动的最大距离
function refresh(childBox, parentBox, upDownY) {
  var childH = childBox.offsetHeight;
  var parentH = parentBox.offsetHeight;
  var startY = 0,
    endY = 0,
    moveY = 0,
    currY = 0;
  var addTransition = function() {
    childBox.style.transition = 'all .5s ease 0s';
    childBox.style.webkitTransition = 'all .5s ease 0s';
  }
  var removeTransition = function() {
    childBox.style.transition = 'none';
    childBox.style.webkitTransition = 'none';
  }
  var setTransform = function(t) {
    childBox.style.transform = 'translateY(' + t + 'px)';
    childBox.style.webkitTransform = 'translateY(' + t + 'px)';
  }
  childBox.addEventListener('touchstart', function(e) {
    // console.log('start');
    startY = e.touches[0].clientY;
  }, false);
  childBox.addEventListener('touchmove', function(e) {
    // console.log('move');
    e.preventDefault();
    endY = e.touches[0].clientY;
    moveY = startY - endY;
    if (currY - moveY < upDownY && currY - moveY > -(childH - parentH) - upDownY) {
      removeTransition();
      setTransform(currY - moveY);
    }
  }, false);
  childBox.addEventListener('touchend', function(e) {
    //console.log('end');
    if (currY - moveY >= 0) {
      addTransition();
      setTransform(0);
      currY = 0;
    } else if (currY - moveY <= -(childH - parentH)) {
      addTransition();
      setTransform(-(childH - parentH));
      currY = -(childH - parentH);
    } else {
      currY = currY - moveY;
    }
  }, false);
}
