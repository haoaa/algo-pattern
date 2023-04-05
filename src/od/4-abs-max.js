const arr = [-1, -3, 7, 5, 11, 15].sort((a, b) => a - b); // 升序排序
let cursor = 0;
while (arr[cursor] < 0) {
  cursor++;
}
let len = arr.length;
if (cursor === 0) {
  // 全正数，0
  return console.log(`${arr[0]} ${arr[1]} ${arr[0] + arr[1]}`);
} else if (cursor === arr.length - 1) {
  // 全负数，0
  return console.log(
    `${arr[len - 2]} ${arr[len - 1]} ${Math.abs(arr[len - 1] + arr[len - 2])}`
  );
} else {
  // 内边界两个正数之和
  let positive = arr[cursor] + arr[cursor + 1];
  // 内边界两个负数之和绝对值
  let negative = Math.abs(arr[cursor - 2] + arr[cursor - 1]);
  let result;
  if (negative < positive) {
    result = [negative, `${arr[cursor - 2]} ${arr[cursor - 1]} ${negative}`];
  } else {
    result = [positive, `${arr[cursor]} ${arr[cursor + 1]} ${positive}`];
  }
  // 负数值范围
  for (let i = 0; i < cursor; i++) {
    // 正数值范围
    for (let j = cursor; j < arr.length; j++) {
      let sumAbs = Math.abs(arr[i] + arr[j]);
      if (sumAbs < result[0]) {
        result = [sumAbs, `${arr[i]} ${arr[j]} ${sumAbs}`];
      }
    }
  }
  return console.log(result[1]);
}
