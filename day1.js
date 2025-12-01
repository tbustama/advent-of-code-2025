
const countDays = (text) => {
  const instructions = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  let position = 50; // Start at position 50
  let count = 0;

  for (const instruction of instructions) {
    // Parse instruction: L4, R48, etc.
    const direction = instruction[0];
    const amount = parseInt(instruction.slice(1));

    if (direction === "L") {
      position = (position - amount) % 100;
    } else if (direction === "R") {
      position = (position + amount) % 100;
    }

    // Handle negative modulo (wrap around)
    if (position < 0) {
      position += 100;
    }

    // Check if we landed exactly on zero
    if (position === 0) {
      count++;
    }
  }

  return count;
};
fetch("https://adventofcode.com/2025/day/1/input", {
  headers: {
    Cookie:
      "ru=53616c7465645f5f08a98cedef9dfaf59e2e6a8425578358ccf29f58aa7a468d; session=53616c7465645f5f6be8d0a5caa01b66dcf4c08a5f0288c00753eb0cc15b928b8456539681dfeaea7a3c9b4d5ae40ee167547f41e18fdac427d02e4798ec452c",
  },
})
  .then((response) => response.text())
  .then((text) => {
    console.log(countDays(text));
  });
