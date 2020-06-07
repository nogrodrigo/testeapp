import React from 'react';
import './Game.css';


//Componente de função referente aos quadrados, herdam o style 'Square' em Game.css
function Square(props) {
	return (
		<button
			className="square"
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

//Controla todo o tabuleiro
class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
			n: 0,
		};
	}

	//Retorna procedimentos após clique em um quadrado
	handleClick(i) {
		const squares = this.state.squares.slice();
		if (calculateWinner(squares, this.state.n) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? ' ×' : ' ○';
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext,
			n: this.state.n + 1,
		});
	}

	//Renderiza os quadrados à partir da Componente de função Squares
	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
			/>
		);
	}
	
	//Cuida da renderização do tabuleiro
	render() {
		const winner = calculateWinner(this.state.squares, this.state.n);
		let status;
		if (winner === ' ×' || winner === ' ○') {
			status = 'Vencedor: ' + winner;
		}
		else {
			if (winner == null) {
				status = 'É a vez de: ' + (this.state.xIsNext ? ' ×' : ' ○');				
			}
			else {
				status = 'Deu velha! ';
			}
		}

		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

//Componente principal que será exportada para index.js
class Game extends React.Component {
	render() {
		return (
			<div className="centered">
				<div className="game">
					<div className="game-board">
						<Board />
					</div>
				</div>
			</div>
		);
	}
}

//Calcula o vencedor, se houver um
function calculateWinner(squares, n) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	if (n === 9) {
		return 'Empate!';
	}
	return null;		
}

export default Game;