/**
 * 斗鱼弹幕提醒系统
 * @author aokihu aokihu@gmail.com
 * @version 1.0.0
 */

//
// 引用第三方库
//

const BDSpeech = require('baidu_yuyin');
const chalk = require('chalk')
const douyu_danmu = require('douyu-danmu');

//
// 常量定义
//

const ROOM_ID = '1534934';
const apiKey = 'GFEBKyeGDD3T9FKa0wP8dnhe';
const secretKey = 'c7c728e7a1946e50894dde02ac628e21';

//
// 变量定义
//

const client = new douyu_danmu(ROOM_ID);
const speech = new BDSpeech(apiKey, secretKey);

//
// 事件监听
//

client.on('error', err => console.log(err));
client.on('connect', () => {
  console.log('Connect success!');
  speech.speak("准备完毕，开始直播");
});
client.on('close', () => client.start())

client.on('message', msg => {

  switch(msg.type){
    case 'other':
      if( msg.raw.type == 'uenter' ) {
        // 访客登陆
        onGuestEnter(msg.raw.nn);
      }
    break;
    case 'chat':
      onChat(msg);
    break;
    default:

    break;
  }
});

function onGuestEnter(nickname) {
  console.log(chalk.blue('欢迎'), chalk.green(nickname))
  speech.speak("欢迎"+nickname+"的到来")
}

function onChat(msg){
  const {from:{name}, content} = msg;
  console.log(chalk.red(name)+"说"+chalk.blueBright(content));
  speech.speak(name+'说:'+content);
}

// 斗鱼客户端运行
client.start();
