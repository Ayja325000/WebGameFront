// export const wsUrl = 'ws://127.0.0.1:8888';
export const wsUrl = 'ws://124.220.108.199:8888';

export const useWebSocket = (onMessage: (data: any) => void, sessionInfo: {} = {}) => {
  const ws = new WebSocket(wsUrl, 'echo-protocol');
  //onopen事件监听
  ws.addEventListener('open', e => {
    console.log('与服务端连接打开->', e)
  }, false)
  //onclose事件监听
  ws.addEventListener('close', e => {
    console.log('与服务端连接关闭->', e)
  }, false)
  ///////onmessage事件监听/////////
  ws.addEventListener('message', e => {
    // console.log('来自服务端的消息->', e);
    try {
      const data = JSON.parse(e.data);
      onMessage(data);
    } catch (err) {
      onMessage(e.data);
    }
  }, false)
  //onerror事件监听
  ws.addEventListener('error', e => {
    console.log('与服务端连接异常->', e)
  }, false)
  const send = (data: {}) => {
    let time = { time: new Date().getTime() };
    // console.log('向服务端发送->', data, sessionInfo, time);
    let D = Object.assign({}, data, sessionInfo, time);
    ws.send(JSON.stringify(D));
  }
  return {
    this: ws,
    send
  }
}