fetch("https://adventofcode.com/2025/day/3/input", {
    headers: {
      Cookie:
        "session=53616c7465645f5fb720547eb14c2222738221b398b811f2fccd2cf4a01faa69216ea380dc7da60e7d72cd4d8c1ebeca79d9799b04ef790e5eeae5a3b99b42b5",
    },
  })
    .then((response) => response.text())
    .then((text) => {
        const batteries = text.split("\n")
            .filter(line => line.trim().length > 0)
            .map(line => line.split(""));
        let totalPower = 0;
        const countPower = (battery) => {
            const targetLength = 12;
            if (battery.length === 0) {
                return 0;
            }
            if (battery.length <= targetLength) {
                // If we have 12 or fewer digits, use all of them
                return parseInt(battery.join(""), 10);
            }
            
            // Use greedy approach: select 12 digits to maximize the number
            // This is equivalent to removing (length - 12) digits while maximizing the result
            const stack = [];
            const toRemove = battery.length - targetLength;
            let removed = 0;
            
            for (let i = 0; i < battery.length; i++) {
                // While we can still remove digits and current digit is larger than the last in stack
                while (removed < toRemove && stack.length > 0 && battery[i] > stack[stack.length - 1]) {
                    stack.pop();
                    removed++;
                }
                stack.push(battery[i]);
            }
            
            // If we still need to remove more digits (from the end), remove them
            while (stack.length > targetLength) {
                stack.pop();
            }
            
            return parseInt(stack.join(""), 10);
        }
        for (const battery of batteries) {
            totalPower += countPower(battery);
        }
        console.log(totalPower);
    });