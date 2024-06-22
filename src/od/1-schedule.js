const { PriorityQueue } = require("./utils");
/**
 * @param {*} n 工单数量
 * @param {*} wos 工单的 [SLA, 积分]
 * @returns 可以获得的最大积分
 */
function getResult(n, wos) {
  // 按照 SLA 截止时间升序
  wos.sort((a, b) => a[0] - b[0]);
  const pq = new PriorityQueue((a, b) => a - b);
  let curTime = 0;
  let ans = 0;
  for (const wo of wos) {
    const [endTime, score] = wo;
    if (endTime >= curTime + 1) {
      pq.offer(score);
      ans += score;
      curTime++;
    } else {
      if (pq.size()) {
        const minscore = pq.peek();
        if (score > minscore) {
          pq.poll();
          pq.offer(score);
          ans += score - minscore;
        }
      }
    }
  }
  return ans;
}

const lines = ["1 6", "1 7", "3 2", "3 1", "2 4", "2 5", "6 1"];
const wos = lines.map((line) => line.split(" ").map(Number));
console.log(getResult(1, wos));

function scheduleCourse(courses) {
  courses.sort((a, b) => a[1] - b[1]);
  const que = new PriorityQueue((a, b) => b - a);
  let t = 0;
  for (const [dura, ddl] of courses) {
    if (dura + t <= ddl) {
      que.offer(dura);
      t += dura;
    } else {
      if (que.size()) {
        const d = que.peek();
        if (d > dura) {
          que.poll();
          que.offer(dura);
          t += dura - d;
        }
      }
    }
  }
  return que.size();
}
