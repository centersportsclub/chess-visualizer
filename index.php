<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Chess Visualizer</title>

    <!-- LOCAL CSS -->
    <link rel="stylesheet" href="assets/libs/chessboard.min.css">

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
        }
    </style>
</head>

<body>

    <h2 style="text-align:center;">Chess Visualizer</h2>

    <div id="board" style="width: 500px; margin: 20px auto;"></div>

    <!-- jQuery FIRST -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- then chessboard -->
    <script src="assets/libs/chessboard.min.js"></script>

<!-- then chess logic -->
    <script src="assets/libs/chess.min.js"></script>

    <!-- YOUR JS -->
    <script src="assets/js/board.js"></script>
    <script src="assets/js/main.js"></script>

</body>
</html>