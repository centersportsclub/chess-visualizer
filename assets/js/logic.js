
function analyzePosition(boardState, focusColor) {

    let attacks = [];
    let defenses = [];
    let pieceThreats = {};
    let pieceBackups = {};
    let pieceControls = {};
    let squareAttackMap = {};
    let hangingPieces = [];

    for (let from in boardState) {

        let piece = boardState[from];

        // 🎯 filter by selected color
        if (piece[0] !== focusColor) continue;

        let moves = generateMoves(from, piece, boardState);

        pieceThreats[from] = [];
        pieceBackups[from] = [];
        pieceControls[from] = moves;

        let isAttacked = false;
        let isDefended = false;

        moves.forEach(to => {

            let target = boardState[to];

            squareAttackMap[to] = (squareAttackMap[to] || 0) + 1;

            if (target) {

                if (target[0] !== piece[0]) {
                    attacks.push({ from, to });
                    pieceThreats[from].push(to);
                    isAttacked = true;
                } else {
                    defenses.push({ from, to });
                    pieceBackups[from].push(to);
                    isDefended = true;
                }
            }
        });

        if (isAttacked && !isDefended) {
            hangingPieces.push({ square: from, piece });
        }
    }

    return {
        attacks,
        defenses,
        hangingPieces,
        pieceThreats,
        pieceBackups,
        pieceControls,
        squareAttackMap
    };
}


// ================================
// MOVE ENGINE (MUST EXIST ALWAYS)
// ================================
function generateMoves(square, piece, board) {

    let file = square.charCodeAt(0);
    let rank = parseInt(square[1]);

    let moves = [];

    const color = piece[0];
    const type = piece[1];

    // ---------------- PAWN ----------------
    if (type === "P") {

        let dir = color === "w" ? 1 : -1;

        let forward = String.fromCharCode(file) + (rank + dir);

        if (!board[forward]) {
            moves.push(forward);
        }

        let d1 = String.fromCharCode(file + 1) + (rank + dir);
        let d2 = String.fromCharCode(file - 1) + (rank + dir);

        if (board[d1]) moves.push(d1);
        if (board[d2]) moves.push(d2);
    }

    // ---------------- KNIGHT ----------------
    if (type === "N") {

        let jumps = [
            [1,2],[2,1],[2,-1],[1,-2],
            [-1,-2],[-2,-1],[-2,1],[-1,2]
        ];

        for (let [df, dr] of jumps) {

            let f = file + df;
            let r = rank + dr;

            if (f >= 97 && f <= 104 && r >= 1 && r <= 8) {
                moves.push(String.fromCharCode(f) + r);
            }
        }
    }

    // ---------------- SLIDING PIECES ----------------
    if (type === "R" || type === "B" || type === "Q") {

        let dirs = [];

        if (type === "R" || type === "Q")
            dirs.push([1,0],[-1,0],[0,1],[0,-1]);

        if (type === "B" || type === "Q")
            dirs.push([1,1],[1,-1],[-1,1],[-1,-1]);

        for (let [df, dr] of dirs) {
            moves.push(...rayMoves(file, rank, board, df, dr));
        }
    }

    // ---------------- KING ----------------
    if (type === "K") {

        for (let df = -1; df <= 1; df++) {
            for (let dr = -1; dr <= 1; dr++) {

                if (df === 0 && dr === 0) continue;

                let f = file + df;
                let r = rank + dr;

                if (f >= 97 && f <= 104 && r >= 1 && r <= 8) {
                    moves.push(String.fromCharCode(f) + r);
                }
            }
        }
    }

    return moves;
}


// ================================
// RAY MOVEMENT
// ================================
function rayMoves(file, rank, board, df, dr) {

    let moves = [];

    let f = file + df;
    let r = rank + dr;

    while (f >= 97 && f <= 104 && r >= 1 && r <= 8) {

        let sq = String.fromCharCode(f) + r;

        moves.push(sq);

        if (board[sq]) break;

        f += df;
        r += dr;
    }

    return moves;
}