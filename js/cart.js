/*
 * @Author: tongliang
 * @Date:   2015-12-20 12:45:47
 * @Last Modified by:   tongliang
 * @Last Modified time: 2015-12-20 15:10:41
 */

'use strict';
window.onload = function() {
  checkBox();
  deleFunc();

}

//复选框
var checkBox = function() {
  var checkBox = document.querySelectorAll('.icon-check-box');

  for (var i = 0; i < checkBox.length; i++) {
    checkBox[i].onclick = function() {
      var hasChecked = this.getAttribute('checked');
      hasChecked !== null ?
        this.removeAttribute('checked') : this.setAttribute('checked', '');
    }
  }
}

//点击删除图标
var deleFunc = function() {
  var delBox = document.querySelectorAll('.del-box ');
  var deleWin = document.querySelector('#dele_win');
  var delWinBox = document.querySelector('.dele-win-box');
  var cancle = document.querySelector('.cancle');
  // var up = document.querySelector('.del-box-up');
  // var down = document.querySelector('.del-box-down');
  var up;

  for (var i = 0; i < delBox.length; i++) {
    delBox[i].onclick = function() {
      //弹窗显示并做动画
      deleWin.style.display = 'block';
      delWinBox.classList.add('jumpOut');
      // 删除图标做动画
      up = this.querySelector('.del-box-up');

      up.style.transition = 'all 1s ease';
      up.style.webkitTransition = 'all 1s ease';

      up.style.transform = 'rotate(-45deg) translateX(-1px) translateY(-5px)';
      up.style.webkitTransform = 'rotate(-45deg) translateX(-1px) translateY(-5px)';

      cancle.onclick = function() {
        deleWin.style.display = 'none';
        delWinBox.classList.remove('jumpOut');
        if (up) {
          up.style.transition = 'all 1s ease';
          up.style.transform = 'rotate(0)';
        }


      }
    }
  }



}
