import { calculateWinner } from "./calculateWinner";

const scores = {
    "X" : 10,
    "O" : -10,
    "tie" : 0
  }

export function minimax(board, depth, alpha, beta, isMaximizing){
  let haveWinner = calculateWinner(board);
  // 基本ベースケース
  if (haveWinner){
    if (haveWinner.winner === "X") return scores[haveWinner.winner] - depth;
    else return scores[haveWinner.winner] + depth;
  }
  else if (!board.includes(null)) return scores["tie"];

  let bestMove = null;
  let bestScore = isMaximizing ? -Infinity : Infinity;

  // 最大化ケース(AI)
  if (isMaximizing){
    for (let i = 0; i < board.length; i++){
      if (board[i] === null){
        board[i] = "X";
        // 再帰関数の結果である点数を格納
        let score = minimax(board, depth + 1, alpha, beta, false);
        board[i] = null;
        if (score > bestScore){
          bestScore = score;
          if (depth === 0) bestMove = i;
        }

        alpha = Math.max(bestScore, alpha);
        // alpha beta pruning
        if (beta <= alpha) break;
      }
    }
    // 最終ベースケースで最善手を返す(AI側のみ)
    if (depth === 0 && bestMove !== null) return bestMove;

  // 最小化ケース(ユーザー側の動きを予測)
  } else {
    for (let i = 0; i < board.length; i++){
      if (board[i] === null){
        board[i] = "O";
        let score = minimax(board, depth + 1, alpha, beta, true);
        board[i] = null;
        if (score < bestScore) bestScore = score;
        
        beta = Math.min(bestScore, beta);
        if (beta <= alpha) break;
      }
    }
  }
  // 再帰から戻ってきたときの中間地点の点数を返す
  return bestScore;
}
