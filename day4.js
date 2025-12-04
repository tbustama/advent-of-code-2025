fetch("https://adventofcode.com/2025/day/4/input", {
    headers: {
      Cookie:
        "session=53616c7465645f5fb720547eb14c2222738221b398b811f2fccd2cf4a01faa69216ea380dc7da60e7d72cd4d8c1ebeca79d9799b04ef790e5eeae5a3b99b42b5",
    },
  })
    .then((response) => response.text())
    .then((text) => {
      const lines = text.split("\n").map(line => line.split(""));
      let count = 0;
      const countAdjacent = (i, j) => {
        let adjacentCount = 0
        // make sure the amount of adjacent cells (up to 8 (top left, top, top right, right, bottom right, bottom, bottom left, left)) that have @ symbol are less than 4
        // check top left cell
        if (i > 0 && j > 0 && lines[i - 1][j - 1] == "@") {
            adjacentCount += 1
        }
        // check top cell
        if (i > 0 && lines[i - 1][j] == "@") {
            adjacentCount += 1
        }
        // check top right cell
        if (i > 0 && j < lines[i - 1].length - 1 && lines[i - 1][j + 1] == "@") {
            adjacentCount += 1
        }
        // check right cell
        if (j < lines[i].length - 1 && lines[i][j + 1] == "@") {
            adjacentCount += 1
        }
        // check bottom right cell
        if (i < lines.length - 1 && j < lines[i + 1].length - 1 && lines[i + 1][j + 1] == "@") {
            adjacentCount += 1
        }
        // check bottom cell
        if (i < lines.length - 1 && lines[i + 1][j] == "@") {
            adjacentCount += 1
        }
        // check bottom left cell
        if (i < lines.length - 1 && j > 0 && lines[i + 1][j - 1] == "@") {
            adjacentCount += 1
        }
        // check left cell
        if (j > 0 && lines[i][j - 1] == "@") {
            adjacentCount += 1
        }
        return adjacentCount < 4
      }
      for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
          if (lines[i][j] === "@" && countAdjacent(i, j)) {
            count += 1
          }
        }
      }
      console.log(count);
    });