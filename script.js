 // 答えとなる単語
 let word="";
const hangmanElement = document.getElementById("hangmanImg");
const wordElement = document.getElementById("word");
const lettersElement = document.getElementById("letters");
const messageElement = document.getElementById("message");
let guessedLetters = "";
let wrongGuesses = 0;
function startGame() {
  const wordInputBox = document.getElementById("wordInputBox");
  word = wordInputBox.value.toLowerCase();// 入力された単語を取得
  const regex = /^[a-zA-Z]+$/;

  if(word === "") {
    console.log("単語が入力されていません");
    alert("単語を入力してください。");
    return;
  }

  if (!regex.test(word)) {
    console.log("不適切な文字が入力されました");
    alert("アルファベット以外の文字は使用できません。");
    return;
  }
  console.log(`選ばれた単語は ${word} です`);
  for(let i = 0; i < word.length; i++) {
    wordElement.innerHTML += "_ ";
  }
  // 以降の処理でこの単語を使います。例えば、
  // let displayedWord = "_".repeat(word.length);

  // 単語入力エリアを隠す
  const wordInputArea = document.getElementById("wordInputArea");
  wordInputArea.style.display = "none";

  // アンダーバーで単語の長さを表示
  // displayWord() など、あなたのコードに合わせて適当な関数を呼び出す
}

// 初期化など、他の必要なコード

// 初期化
function initialize() {
  console.log("初期化");
  const qwertyString = "qwertyuiopasdfghjklzxcvbnm";
  

    // QWERTY配列の各行
    const rows = [
      'qwertyuiop',
      'asdfghjkl',
      'zxcvbnm'
    ];
  
    for(const row of rows) {
      for(const letter of row) {
        const button = document.createElement("button");
        button.innerText = letter;
        button.addEventListener("click", guess);
        lettersElement.appendChild(button);
      }
      // 改行を追加
      const br = document.createElement("br");
      lettersElement.appendChild(br);
    }
}
// 単語の更新
function updateWord() {
  console.log("単語を更新");
  wordElement.innerHTML = "";

  let complete = true;
  for(let i = 0; i < word.length; i++) {
    if (guessedLetters.includes(word[i])) {
      wordElement.innerHTML += word[i] + " ";
    } else {
      wordElement.innerHTML += "_ ";
      complete = false;
    }
  }

  if (complete) {
    messageElement.innerHTML = "ゲームクリア!";
  }
}
// 文字を推測
function guess(event) {
  const letter = event.target.innerText;
  console.log("推測文字:", letter);
  console.log("現在のword:", word); 
  if (word.includes(letter)) {
    guessedLetters += letter;
    updateWord();
  } else {
    wrongGuesses++;
    updateHangman();
  }

  event.target.disabled = true;
}



// hangmanの更新
function updateHangman() {
  console.log("hangmanを更新");

  // この行でエラーが出る場合、要素が見つかっていないか、ID名に問題がある可能性があります。
  const hangmanImg = document.getElementById("hangmanImg");
  
  console.log(hangmanImg);  // この行でnullが出力される場合、要素が見つからないということです。
  
  // 間違い回数に対応する画像に変更
  hangmanImg.src = `hangman${wrongGuesses}.png`;
  if (wrongGuesses >= 6) {
    alert("ゲームオーバー")
    messageElement.innerHTML = "答え:"+word;
        // ボタンを全て消す
        const letterButtons = document.getElementById("letters");
        letterButtons.innerHTML = "";
        updateWord(true);

        
  }
}

initialize();
