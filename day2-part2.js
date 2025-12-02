fetch("https://adventofcode.com/2025/day/2/input", {
    headers: {
      Cookie:
        "session=53616c7465645f5fb720547eb14c2222738221b398b811f2fccd2cf4a01faa69216ea380dc7da60e7d72cd4d8c1ebeca79d9799b04ef790e5eeae5a3b99b42b5",
    },
  })
    .then((response) => response.text())
    .then((text) => {
      const ranges = text
        .trim()
        .split(",")
        .map((line) =>
          line
            .trim()
            .split("-")
            .map((part) => parseInt(part, 10))
        );
      const isInvalid = (n) => {
        const s = String(n);
        // Check if the number can be divided into equal parts repeated at least twice
        // Try all possible repetition counts from 2 up to the string length
        for (let repetitions = 2; repetitions <= s.length; repetitions++) {
          if (s.length % repetitions !== 0) continue;
          const partLen = s.length / repetitions;
          const firstPart = s.slice(0, partLen);
          // Check if all parts are identical to the first part
          let allMatch = true;
          for (let i = 1; i < repetitions; i++) {
            const part = s.slice(i * partLen, (i + 1) * partLen);
            if (part !== firstPart) {
              allMatch = false;
              break;
            }
          }
          if (allMatch) return true;
        }
        return false;
      };

      let invalidCount = 0;
      console.log(ranges);
      for (const [start, end] of ranges) {
        for (let value = start; value <= end; value++) {
          if (isInvalid(value)) {
            invalidCount += value;
          }
        }
      }

      console.log("Total invalid inputs:", invalidCount);
    });