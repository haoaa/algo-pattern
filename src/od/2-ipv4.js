ipv4;
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (line) => {
  const [p1, p2, p3, p4] = line.split("#").map(Number);
  if (
    p1 >= 1 &&
    p1 <= 255 &&
    p2 >= 0 &&
    p2 <= 255 &&
    p3 >= 0 &&
    p3 <= 255 &&
    p4 >= 0 &&
    p4 <= 255
  ) {
    let res = [p1, p2, p3, p4]
      .map((p) => {
        let x = p.toString(16);
        return x.length === 2 ? x : "0" + x;
      })
      .join("");
    console.log(parseInt(res, 16));
  } else {
    console.log("invalid IP");
  }
});
