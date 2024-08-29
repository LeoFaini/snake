<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2487.7">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Courier; -webkit-text-stroke: #000000; background-color: #ededed}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Courier; -webkit-text-stroke: #000000; background-color: #ededed; min-height: 17.0px}
    span.s1 {font-kerning: none}
  </style>
</head>
<body>
<p class="p1"><span class="s1">const playBoard = document.querySelector(".play-board");</span></p>
<p class="p1"><span class="s1">const scoreElement = document.querySelector(".score");</span></p>
<p class="p1"><span class="s1">const highScoreElement = document.querySelector(".high-score");</span></p>
<p class="p1"><span class="s1">const controls = document.querySelectorAll(".controls i");</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">let gameOver = false;</span></p>
<p class="p1"><span class="s1">let foodX, foodY;</span></p>
<p class="p1"><span class="s1">let snakeX = 5, snakeY = 5;</span></p>
<p class="p1"><span class="s1">let velocityX = 0, velocityY = 0;</span></p>
<p class="p1"><span class="s1">let snakeBody = [];</span></p>
<p class="p1"><span class="s1">let setIntervalId;</span></p>
<p class="p1"><span class="s1">let score = 0;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Getting high score from the local storage</span></p>
<p class="p1"><span class="s1">let highScore = localStorage.getItem("high-score") || 0;</span></p>
<p class="p1"><span class="s1">highScoreElement.innerText = `High Score: ${highScore}`;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">const updateFoodPosition = () =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// Passing a random 1 - 30 value as food position</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>foodX = Math.floor(Math.random() * 30) + 1;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>foodY = Math.floor(Math.random() * 30) + 1;</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">const handleGameOver = () =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// Clearing the timer and reloading the page on game over</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>clearInterval(setIntervalId);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>alert("Game Over! Press OK to replay...");</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>location.reload();</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">const changeDirection = e =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// Changing velocity value based on key press</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if(e.key === "ArrowUp" &amp;&amp; velocityY != 1) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>velocityX = 0;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>velocityY = -1;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>} else if(e.key === "ArrowDown" &amp;&amp; velocityY != -1) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>velocityX = 0;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>velocityY = 1;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>} else if(e.key === "ArrowLeft" &amp;&amp; velocityX != 1) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>velocityX = -1;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>velocityY = 0;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>} else if(e.key === "ArrowRight" &amp;&amp; velocityX != -1) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>velocityX = 1;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>velocityY = 0;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// Calling changeDirection on each key click and passing key dataset value as an object</span></p>
<p class="p1"><span class="s1">controls.forEach(button =&gt; button.addEventListener("click", () =&gt; changeDirection({ key: button.dataset.key })));</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">const initGame = () =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if(gameOver) return handleGameOver();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>let html = `&lt;div class="food" style="grid-area: ${foodY} / ${foodX}"&gt;&lt;/div&gt;`;</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// Checking if the snake hit the food</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if(snakeX === foodX &amp;&amp; snakeY === foodY) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>updateFoodPosition();</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>snakeBody.push([foodY, foodX]); // Pushing food position to snake body array</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>score++; // increment score by 1</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>highScore = score &gt;= highScore ? score : highScore;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>localStorage.setItem("high-score", highScore);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>scoreElement.innerText = `Score: ${score}`;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>highScoreElement.innerText = `High Score: ${highScore}`;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// Updating the snake's head position based on the current velocity</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>snakeX += velocityX;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>snakeY += velocityY;</span></p>
<p class="p2"><span class="s1"><span class="Apple-converted-space">    </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// Shifting forward the values of the elements in the snake body by one</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>for (let i = snakeBody.length - 1; i &gt; 0; i--) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>snakeBody[i] = snakeBody[i - 1];</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// Checking if the snake's head is out of wall, if so setting gameOver to true</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if(snakeX &lt;= 0 || snakeX &gt; 30 || snakeY &lt;= 0 || snakeY &gt; 30) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>return gameOver = true;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>for (let i = 0; i &lt; snakeBody.length; i++) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>// Adding a div for each part of the snake's body</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>html += `&lt;div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"&gt;&lt;/div&gt;`;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>// Checking if the snake head hit the body, if so set gameOver to true</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>if (i !== 0 &amp;&amp; snakeBody[0][1] === snakeBody[i][1] &amp;&amp; snakeBody[0][0] === snakeBody[i][0]) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>gameOver = true;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>playBoard.innerHTML = html;</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">updateFoodPosition();</span></p>
<p class="p1"><span class="s1">setIntervalId = setInterval(initGame, 100);</span></p>
<p class="p1"><span class="s1">document.addEventListener("keyup", changeDirection);</span></p>
</body>
</html>
