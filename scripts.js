const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
let currentPlayer = 'X';
let board = Array(9).fill(null);

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (board[index] === null) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            displayMessage(`${currentPlayer} wins!`);
            setTimeout(resetGame, 5000);
        } else if (board.every(cell => cell !== null)) {
            displayMessage(`It's a draw!`);
            setTimeout(resetGame, 5000);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return board[index] === player;
        });
    });
}

function displayMessage(message) {
    messageElement.textContent = message;
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    messageElement.textContent = '';
}