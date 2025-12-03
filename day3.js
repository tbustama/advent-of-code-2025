fetch("https://adventofcode.com/2025/day/3/input", {
    headers: {
      Cookie:
        "session=53616c7465645f5fb720547eb14c2222738221b398b811f2fccd2cf4a01faa69216ea380dc7da60e7d72cd4d8c1ebeca79d9799b04ef790e5eeae5a3b99b42b5",
    },
  })
    .then((response) => response.text())
    .then((text) => {
        const batteries = text.split("\n").map(line => line.split(""));
        let totalPower = 0;
        const countPower = (battery) => {
            let idxPower = [-1, -1];
            for (let i = 0; i < battery.length - 1; i++) {
                if (battery[i] > idxPower[1]) {
                    idxPower[0] = i;
                    idxPower[1] = battery[i];
                }
            }
            let maxPower = 0;
            for (let i = idxPower[0] + 1; i < battery.length; i++) {
                curPowerStr = idxPower[1] + battery[i];
                curPower = parseInt(curPowerStr, 10);
                if (curPower > maxPower) {
                    maxPower = curPower;
                }
            }
            console.log(maxPower);
            return maxPower;
        }
        for (const battery of batteries) {
            totalPower += countPower(battery);
        }
        console.log(totalPower);
    });