<style>
  body {
    background-color: #f4f7fa;
    color: #333;
    font-family: 'Arial', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #2c3e50;
  }

  #difficulty {
    padding: 10px;
    font-size: 1rem;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .sudoku-board {
    display: grid;
    grid-template-columns: repeat(9, 40px);
    gap: 2px;
    margin-bottom: 20px;
  }

  .sudoku-cell {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    background-color: #fff;
    font-size: 1.2rem;
  }

  .sudoku-cell:nth-child(3n) {
    border-right: 2px solid #000;
  }

  .sudoku-cell:nth-child(27n),
  .sudoku-cell:nth-child(54n) {
    border-bottom: 2px solid #000;
  }

  .sudoku-cell input {
    width: 100%;
    height: 100%;
    border: none;
    text-align: center;
    font-size: 1.2rem;
    background: transparent;
  }

  #check-solution {
    background-color: #2980b9;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
  }

  #check-solution:hover {
    background-color: #1c5980;
  }
</style>

<h1>Sudoku Game Simulator</h1>
<select id="difficulty">
  <option value="Junior">Junior</option>
  <option value="Mid-term">Mid-term</option>
  <option value="Senior">Senior</option>
  <option value="Master">Master</option>
  <option value="Grand Master">Grand Master</option>
</select>
<div id="app"></div>
<button id="check-solution">Check Solution</button>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const sudokuBoards = {
      'Junior': [
        [
          [5, 3, 0, 0, 7, 0, 0, 0, 0],
          [6, 0, 0, 1, 9, 5, 0, 0, 0],
          [0, 9, 8, 0, 0, 0, 0, 6, 0],
          [8, 0, 0, 0, 6, 0, 0, 0, 3],
          [4, 0, 0, 8, 0, 3, 0, 0, 1],
          [7, 0, 0, 0, 2, 0, 0, 0, 6],
          [0, 6, 0, 0, 0, 0, 2, 8, 0],
          [0, 0, 0, 4, 1, 9, 0, 0, 5],
          [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ]
      ],
      'Mid-term': [],
      'Senior': [],
      'Master': [],
      'Grand Master': []
    };

    function loadGame() {
      const difficulty = document.getElementById('difficulty').value;
      const board = getRandomBoard(sudokuBoards[difficulty]);
      renderBoard(board);
    }

    function getRandomBoard(boards) {
      if (boards.length === 0) {
        alert('No boards available for this difficulty.');
        return Array(9).fill().map(() => Array(9).fill(0));
      }
      const randomIndex = Math.floor(Math.random() * boards.length);
      return boards[randomIndex];
    }

    function renderBoard(board) {
      const app = document.getElementById('app');
      app.innerHTML = '<div class="sudoku-board"></div>';
      const sudokuBoard = app.querySelector('.sudoku-board');

      board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellElement = document.createElement('div');
          cellElement.className = 'sudoku-cell';
          if (cell !== 0) {
            cellElement.textContent = cell;
            cellElement.classList.add('fixed');
          } else {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.addEventListener('input', () => validateInput(input));
            cellElement.appendChild(input);
          }
          sudokuBoard.appendChild(cellElement);
        });
      });
    }

    function validateInput(input) {
      if (input.value < 1 || input.value > 9) {
        input.value = '';
      }
    }

    function checkSolution() {
      const cells = document.querySelectorAll('.sudoku-cell');
      let isComplete = true;

      cells.forEach(cell => {
        if (!cell.classList.contains('fixed')) {
          const input = cell.querySelector('input');
          if (!input || input.value === '' || input.value < 1 || input.value > 9) {
            isComplete = false;
          }
        }
      });

      if (isComplete) {
        alert('Congratulations! You have completed the puzzle.');
      } else {
        alert('There are still some empty or incorrect cells.');
      }
    }

    document.getElementById('difficulty').addEventListener('change', loadGame);
    document.getElementById('check-solution').addEventListener('click', checkSolution);

    // Load initial game
    loadGame();
  });
</script>
