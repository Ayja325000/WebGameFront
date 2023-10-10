export const debounce = (fn: () => void, delay: number) => {
  let timer: string | number | NodeJS.Timeout | undefined;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, delay);
  }
};

// function fullScreen(ele) {
//   if (ele.requestFullscreen) {
//     ele.requestFullscreen();
//   } else if (ele.mozRequestFullScreen) {
//     ele.mozRequestFullScreen();
//   } else if (ele.webkitRequestFullscreen) {
//     ele.webkitRequestFullscreen();
//   } else if (ele.msRequestFullscreen) {
//     ele.msRequestFullscreen();
//   }
// }

// function exitFullscreen() {
//   if (document.exitFullScreen) {
//     document.exitFullScreen();
//   } else if (document.mozCancelFullScreen) {
//     document.mozCancelFullScreen();
//   } else if (document.webkitExitFullscreen) {
//     document.webkitExitFullscreen();
//   } else if (element.msExitFullscreen) {
//     element.msExitFullscreen();
//   }
// }

// function isFullScreen() {
//   return !!(
//     document.fullscreen ||
//     document.mozFullScreen ||
//     document.webkitIsFullScreen ||
//     document.webkitFullScreen ||
//     document.msFullScreen
//   );
// }

//判断设备类型, PC端false, 移动端true
export function isMobile() {
  return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
}