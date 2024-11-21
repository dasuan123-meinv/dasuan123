let words = ["hello"]; // 初始的单词数组
let currIdx = 0; // 当前索引
let inputField, submitButton; // 用户输入字段和按钮
let newWord = ""; // 临时存储新单词
let resultText = "Enter a word to visualize it"; // 提示消息
let word = words[currIdx]; // 默认展示的单词

function preload() {
  words = loadStrings('words.txt'); // 加载外部文件中的单词
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);

  // 创建用户输入和按钮
  inputField = createInput('').attribute("maxlength", "100");
  inputField.position(10, height + 10);
  inputField.input(getWord);
  inputField.addClass('inputField'); // 添加CSS样式

  submitButton = createButton('Visualize');
  submitButton.position(200, height + 10);
  submitButton.mousePressed(changeWord);
  submitButton.addClass('submitButton'); // 添加CSS样式
}

function draw() {
  background(0);
  fill(255);
  textSize(32);
  text(word, width / 2, height / 2);

  // 可视化单词
  visualizeWord(word);

  // 显示提示消息
  textSize(12);
  fill(255, 0, 0);
  text(resultText, width / 2, height - 30);

  // 动画单词切换
  if (frameCount % 10 === 0) {
    currIdx++;
    if (currIdx >= words.length) {
      currIdx = 0;
    }
    word = words[currIdx];
  }
}

// 可视化单词字符的函数
function visualizeWord(w) {
  let x = 50;
  let y = 50;
  for (let i = 0; i < w.length; i++) {
    let asciiVal = unchar(w.charAt(i));
    let size = map(asciiVal, 97, 122, 10, 50); // 将ASCII值映射到大小
    fill(100, asciiVal, 255 - asciiVal);
    rect(x, y, size, size);
    x += size + 10;
    if (x > width - 50) {
      x = 50;
      y += 60;
    }
  }
}

// 处理用户输入
function getWord() {
  let msg = inputField.value();

  if (msg.includes(" ")) {
    resultText = "Only one word allowed";
    inputField.attribute("maxlength", msg.length.toString());
  } else {
    resultText = "";
    inputField.attribute("maxlength", "100");
    newWord = msg;
  }
}

// 用户点击按钮时更新单词
function changeWord() {
  if (newWord.length > 0) {
    newWord = newWord.replace(/[^a-zA-Z- ']/g, ""); // 移除标点符号
    newWord = newWord.trim(); // 删除两端空格
    word = newWord.toLowerCase(); // 转为小写
    resultText = "";
  } else {
    resultText = "Click the input field to start typing";
  }
}

