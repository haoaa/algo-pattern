const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const lines = [];
let n, l;
rl.on("line", (line) => {
  lines.push(line);
  if (lines.length === 1) {
    [n, l] = lines[0].split(" ").map(Number);
  }
  if (n && lines.length === n + 1) {
    const numbers = lines.slice(1).map((line) => Number(line));
    console.log(getResult(n, l, numbers));
    lines.length = 0;
  }
});
function getResult(n, l, numbers) {
  const sorted_numbers = numbers.slice().sort((a, b) => a - b);
  let minAvg = sorted_numbers.at(0);
  let maxAvg = sorted_numbers.at(-1);
  const diff = maxAvg / Math.pow(10, 10);
  const ans = [];
  while (maxAvg - minAvg >= diff) {
    let midAvg = (minAvg + maxAvg) / 2;
    if (check(n, l, numbers, midAvg, ans)) {
      minAvg = midAvg;
    } else {
      maxAvg = midAvg;
    }
  }
  return ans.join(" ");
}
function check(n, l, numbers, avg, ans) {
  let fact = 1;
  for (let i = 0; i < l; i++) {
    fact *= numbers[i] / avg;
  }
  if (fact >= 1) {
    ans[0] = 0;
    ans[1] = l;
    return true;
  }
  let pre_fact = 1;
  let min_pre_fact = Infinity;
  let min_pre_fact_end = 0;
  for (let i = l; i < n; i++) {
    fact *= numbers[i] / avg;
    pre_fact *= numbers[i - l] / avg;
    if (pre_fact < min_pre_fact) {
      min_pre_fact = pre_fact;
      min_pre_fact_end = i - l;
    }
    if (fact / min_pre_fact >= 1) {
      ans[0] = min_pre_fact_end + 1;
      ans[1] = i - min_pre_fact_end;
      return true;
    }
  }
  return false;
}
