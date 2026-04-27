console.log("MAIN JS LOADED");

window.onload = function () {
    console.log("APP STARTING...");

    // GLOBAL GAME STATE (single source of truth)
    window.game = new Chess();

    // INIT BOARD
    window.board = createBoard(onPositionChange);

    // FIRST ANALYSIS
    runAnalysis(window.game.fen());
};


// WHEN BOARD CHANGES
function onPositionChange(fen) {
    runAnalysis(fen);
}


// CENTRAL ANALYSIS PIPELINE
function runAnalysis(fen) {

    console.log("FEN:", fen);

    let result = analyzePosition(fen);

    console.log("Attacks:", result.attacks);
    console.log("Defenses:", result.defenses);

    // Later: arrows.js will visualize here
}