
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
    const oldPosition = position;

    if (direction === "L") {
      // Count how many times we visit position 0
      // When moving left from position p by amount a, we visit positions: p, p-1, ..., p-a (mod 100)
      // We visit 0 when p - k ≡ 0 (mod 100) for some k in [0, a]
      // This means p - k = 100m, so k = p - 100m
      // We need 0 ≤ p - 100m ≤ a, which means p - a ≤ 100m ≤ p
      // Since p < 100, m can be 0 or negative. For m = 0: k = p, which requires p ≤ a
      // For m = -1: k = p + 100, which requires p + 100 ≤ a
      // So we visit 0 when k = p, p+100, p+200, ... up to the largest ≤ a
      // Number of visits = floor((a - p) / 100) + 1 if a >= p, else 0
      // But if we start at 0 (p=0), we're already there, so we only count additional visits
      if (oldPosition === 0) {
        // Starting at 0, we only count visits beyond the starting position
        // We visit 0 again when k = 100, 200, ... up to the largest ≤ a
        count += Math.floor(amount / 100);
      } else if (amount >= oldPosition) {
        count += Math.floor((amount - oldPosition) / 100) + 1;
      }
      position = (position - amount) % 100;
      // Handle negative modulo (wrap around)
      if (position < 0) {
        position += 100;
      }
    } else if (direction === "R") {
      // Count how many times we visit position 0
      // When moving right from position p by amount a, we visit positions: p, p+1, ..., p+a (mod 100)
      // We visit 0 when p + k ≡ 0 (mod 100), i.e., p + k = 100m for some m
      // So k = 100m - p, and we need 0 ≤ 100m - p ≤ a
      // This means p ≤ 100m ≤ p + a
      // Since p < 100, m starts at 1 (if p > 0) or 0 (if p = 0)
      // m goes up to floor((p+a)/100)
      // If p > 0: count = floor((p+a)/100)
      // If p = 0: we start at 0, so we only count additional visits at 100, 200, ...
      const totalPosition = oldPosition + amount;
      if (oldPosition === 0) {
        // Starting at 0, we only count visits beyond the starting position
        count += Math.floor(totalPosition / 100);
      } else {
        count += Math.floor(totalPosition / 100);
      }
      position = totalPosition % 100;
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
