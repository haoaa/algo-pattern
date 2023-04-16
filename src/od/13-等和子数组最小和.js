const arr = "4 3 2 3 5 2 1".split(" ").map(Number);
console.log(getResult(arr, arr.length));

function getResult(arr, m) {
  const sum = arr.sort((a, b) => b - a).reduce((p, c) => p + c);
  while (m) {
    if (canPartitionMSubsets([...arr], sum, m)) return sum / m;
    m--;
  }
  return sum;
}
function canPartitionMSubsets(arr, sum, m) {
  if (sum % m !== 0) return false;
  const subSum = sum / m;
  if (subSum < arr[0]) return false;
  while (arr[0] === subSum) {
    arr.shift();
    m--;
  }
  const buckets = new Array(m).fill(0);
  return partition(arr, 0, buckets, subSum);
}
function partition(arr, index, buckets, subSum) {
  if (index === arr.length) return true;
  const select = arr[index];
  for (let i = 0; i < buckets.length; i++) {
    if (i > 0 && buckets[i] === buckets[i - 1]) continue;
    if (select + buckets[i] <= subSum) {
      buckets[i] += select;
      if (partition(arr, index + 1, buckets, subSum)) return true;
      buckets[i] -= select;
    }
  }
  return false;
}
