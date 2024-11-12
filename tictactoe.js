let currentPlayer = 'X';
        let board = Array(9).fill(null);
        let isGameOver = false;

        const cells = document.querySelectorAll('.cell');
        const message = document.getElementById('message');

        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(index));
        });

        function handleCellClick(index) {
            if (isGameOver || board[index]) return;

            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            cells[index].classList.add(currentPlayer);

            if (checkWinner()) {
                message.textContent = `Player ${currentPlayer} wins! 🎉`;
                isGameOver = true;
                return;
            }

            if (board.every(cell => cell !== null)) {
                message.textContent = "It's a draw! 😲";
                isGameOver = true;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 4, 8],
                [2, 4, 6],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ];

            return winningCombinations.some(combination => {
                const [a, b, c] = combination;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    combination.forEach(index => cells[index].classList.add('winning-cell'));
                    return true;
                }
                return false;
            });
        }

        function highlightWinningCells() {
            board.forEach((value, index) => {
                if (value) cells[index].classList.add('winning-cell');
            });
        }

        function resetGame() {
            board.fill(null);
            cells.forEach(cell => {
                cell.textContent = '';
                cell.className = 'cell'; // Reset all classes
            });
            currentPlayer = 'X';
            isGameOver = false;
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
