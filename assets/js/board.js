
console.log("BOARD JS LOADED");

window.board = null;
window.boardState = {};
window.analysisColor = "w";


window.onload = function () {

    initBoardState();
    initBoardUI();
    createColorSelector();
    runAnalysis();
};


// ================================
// COLOR SELECTOR
// ================================
function createColorSelector() {

    let container = document.createElement("div");

    container.style.textAlign = "center";
    container.style.margin = "10px";

    container.innerHTML = `
        <button onclick="setColor('w')">White</button>
        <button onclick="setColor('b')">Black</button>
    `;

    document.body.insertBefore(container, document.body.firstChild);
}

window.setColor = function(color) {
    window.analysisColor = color;
    runAnalysis();
};


// ================================
// BOARD INIT
// ================================
function initBoardUI() {

    window.board = Chessboard('board', {
        draggable: true,
        position: window.boardState,
        pieceTheme: 'assets/img/pieces/{piece}.png',

        onDrop: function (source, target) {

            let piece = window.boardState[source];

            if (!piece) return 'snapback';

            delete window.boardState[source];
            window.boardState[target] = piece;

            runAnalysis();
        }
    });
}


// ================================
// INITIAL POSITION
// ================================
function initBoardState() {

    let back = ["R","N","B","Q","K","B","N","R"];

    for (let i = 0; i < 8; i++) {
        window.boardState[String.fromCharCode(97+i) + "2"] = "wP";
        window.boardState[String.fromCharCode(97+i) + "7"] = "bP";
    }

    for (let i = 0; i < 8; i++) {
        window.boardState[String.fromCharCode(97+i) + "1"] = "w" + back[i];
        window.boardState[String.fromCharCode(97+i) + "8"] = "b" + back[i];
    }
}


// ================================
// ANALYSIS PIPELINE
// ================================
function runAnalysis() {

    let result = analyzePosition(window.boardState, window.analysisColor);

    console.log("RESULT:", result);

    renderHighlights(result);
}


// ================================
// VISUAL RENDERING (NEW)
// ================================
function renderHighlights(result) {

    clearHighlights();

    // 🔥 highlight controlled squares
    for (let sq in result.squareAttackMap) {

        let count = result.squareAttackMap[sq];

        let color = getColor(count);

        paintSquare(sq, color);
    }

    // ⚠️ hanging pieces (red border)
    result.hangingPieces.forEach(p => {
        paintSquare(p.square, "rgba(255,0,0,0.5)");
    });
}


// ================================
// COLOR LOGIC
// ================================
function getColor(count) {

    if (count >= 3) return "rgba(255,0,0,0.5)";
    if (count === 2) return "rgba(255,165,0,0.4)";
    if (count === 1) return "rgba(0,255,0,0.2)";

    return "";
}


// ================================
// PAINT SQUARE
// ================================
function paintSquare(square, color) {

    let el = document.querySelector(`[data-square="${square}"]`);

    if (el) {
        el.style.background = color;
    }
}


// ================================
// CLEAR BOARD
// ================================
function clearHighlights() {

    document.querySelectorAll(".square-55d63").forEach(el => {
        el.style.background = "";
    });
}