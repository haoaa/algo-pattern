/* JavaScript Node ACM 模式 控制台输入获取 */
let lines = ['z','b','1'];
const cache = {};
console.log(sortURL(lines, cache));
 lines = ['a','a',2];
console.log(sortURL(lines, cache));

 lines = [3];
 console.log(sortURL(lines, cache));

function sortURL(lines, cache) {
  let n = parseInt(lines.pop());
  lines.forEach((url) => {
    cache[url] ? cache[url]++ : (cache[url] = 1);
  });
  let arr = [];
  for (let key in cache) {
    arr.push({
      count: cache[key],
      url: key,
    });
  }
  return arr
    .sort((a, b) => {
      let res = b.count - a.count;
      return res === 0 ? (a.url > b.url ? 1 : -1) : res;
    })
    .slice(0, n)
    .map((ele) => ele.url)
    .join(",");
}
