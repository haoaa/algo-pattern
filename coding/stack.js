// let m ={
//   '(': 1,
//   ')': -1,
//   '{': 2,
//   '}': -2,
//   '[': 3,
//   ']': -3
// }
// function isValid( s ) {
//   const s =[]
//   for (let i = 0; i < s.length; i++) {
//     const a = s[i];
//     if (!s.length) {
//       s.push(a)
//     } else {
//       if((m[s[s.length-1]]+m[a])===0) {
//         s.pop()
//       }else {
//         s.push(a)
//       }
//     }

//   }
//   return !s.length
// }

// function maxInWindows(num, size) {
//   const q = [],
//     res = [];
//   for (let i = 0, j = num.length; i < i; i++) {
//     const n = num[i];
//     while (q.length && num[q[q.length - 1]] < n) {
//       q.pop();
//     }
//     q.push(i);
//     if (q[0] + size <= i) {
//       q.shift();
//     }
//     if (i >= size - 1) {
//       res.push(num[q[0]]);
//     }
//   }
//   return res;
// }

// function partition(arr, l, r) {
//   let p = arr[r]
//   while (l<r) {
//     while(l<r && arr[l]<=p)l++
//     arr[r]=arr[l]
//     while(l<r && arr[r]>=p)r--
//     arr[l]=arr[r]
//   }
//   return l
// }
// function partition(arr, l, r) {
//   const p = arr[r];
//   let i = l;
//   const swap = (arr, a, b) => {
//     if (a !== b) {
//       let t = arr[a];
//       arr[a] = arr[b];
//       arr[b] = t;
//     }
//   };
//   for (let j = l; j < r; j++) {
//     if (arr[j] < p) {
//       swap(arr, j, i++);
//     }
//   }
//   swap(arr, i, r);
//   return i;
// }

// /**
//  *
//  * @param a int整型一维数组
//  * @param n int整型
//  * @param K int整型
//  * @return int整型
//  */
// function findKth(arr, n, k) {
//   if (k === 0 || k > n) {
//     return [];
//   }
//   let l = 0,
//     r = n - 1;
//   while (l <= r) {
//     const p = partition(arr, l, r);
//     if (p === n - k) {
//       return arr[p];
//     } else if (p < n - k) {
//       l = p + 1;
//     } else {
//       r = p - 1;
//     }
//   }
//   return [];
// }
// module.exports = {
//   findKth: findKth,
// };

// function heap(array) {
//   //这里元素的索引是从0开始的,所以最后一个非叶子结点array.length/2 - 1
//   for (let i = array.length / 2 - 1; i >= 0; i--) {
//     adjustHeap(array, i, array.length); //调整堆
//   }
//   return array

//   function adjustHeap(array, i, length) {
//     // 先把当前元素取出来，因为当前元素可能要一直移动
//     let temp = array[i];
//     for (let k = 2 * i + 1; k < length; k = 2 * k + 1) {
//       //2*i+1为左子树i的左子树(因为i是从0开始的),2*k+1为k的左子树
//       // 让k先指向子节点中最大的节点
//       if (k + 1 < length && array[k] < array[k + 1]) {
//         //如果有右子树,并且右子树大于左子树
//         k++;
//       }
//       //如果发现结点(左右子结点)大于根结点，则进行值的交换
//       if (array[k] > temp) {
//         // 如果子节点更换了，那么，以子节点为根的子树会受到影响,所以，循环对子节点所在的树继续进行判断
//         array[i]= array[k]
//         i = k;
//       } else {
//         //不用交换，直接终止循环
//         break;
//       }
//     }
//     array[i]=temp
//   }
// }

// console.log(heap([6, 8,1,2,9,5,12,0,4,3]))

// function calc(s, start) {
//   let stack = [];
//   let num = 0;
//   let op = "+";
//   let i = start;
//   for (; i < s.length; i++) {
//     if (s[i] >= "0" && s[i] <= "9") {
//       num += num * 10 + s[i] * 1;
//       if (i !== s.length - 1) {
//         continue;
//       }
//     }
//     if (s[i] === "(") {
//       let [res, idx] = calc(s, i + 1);
//       num = res;
//       i = idx;
//       if (i !== s.length - 1) {
//         continue;
//       }
//     }
//     switch (op) {
//       case "+":
//         stack.push(num);
//         break;
//       case "-":
//         stack.push(-num);
//         break;

//       case "*":
//         const left = st.pop();
//         stack.push(left * num);
//         break;
//     }
//     if (s[i] === ")") {
//       break;
//     } else {
//       op = s[i];
//     }
//   }
//   let sum = 0;
//   while (stack.length) {
//     sum += stack.pop();
//   }
//   return [sum, i];
// }
// function solve(s) {
//   let [res] = calc(s, 0)
//   return res
// // }

// function solve(s) {
//   const prec = {
//     "-": 1,
//     "+": 1,
//     "*": 2,
//     "/": 2,
//   };
//   s = String(s).replace(/ /g, "");
//   const len = s.length;
//   const num = [0];
//   const ops = [];
//   for (let i = 0; i < s.length; i++) {
//     const c = s[i];
//     if (c === "(") {
//       ops.push(c);
//     } else if (c === ")") {
//       while (ops.length) {
//         if (ops[ops.length - 1] !== "(") {
//           calc(num, ops);
//         } else {
//           ops.pop();
//           break;
//         }
//       }
//     } else {
//       if (c >= "0" && c <= "9") {
//         let u = 0,
//           j = i;
//         while (j < n && s[j] >= "0" && s[j] <= "9") {
//           u = u * 10 + s[j++] * 1;
//         }
//         num.push(u);
//         i = j - 1;
//       } else {
//         while (ops.length && ops[ops.length - 1] !== "(") {
//           if (prec[ops[ops.length - 1]] >= prec[c]) {
//             calc(num, ops);
//           } else {
//             break;
//           }
//         }
//         ops.push(c);
//       }
//     }
//   }
//   while (ops.length && ops[ops.length - 1] !== "(") {
//     calc(num, ops);
//   }
//   return num[num.length - 1];
// }

// function calc(num, ops) {
//   if (!num.length || num.length < 2) {
//     return;
//   }
//   if (!ops.length) {
//     return;
//   }
//   let b = num.pop(),
//     a = num.pop();
//   let op = ops.pop();
//   let res = 0;
//   if (op === "+") {
//     res = a + b;
//   } else if (op == "-") res = a - b;
//   else if (op == "*") res = a * b;
//   nums.addLast(res);
// }

// function MoreThanHalfNum_Solution(numbers)
// {
//     let candidate = numbers[0]
//     let count =1
//     for (let i = 1; i < numbers.length; i++) {
//       if (numbers[i]!==candidate) {
//         count--
//       } else {
//         count++
//       }
//       if (count===0) {
//         candidate=numbers[i+1]
//         count=1
//       }
//     }
//     return candidate
// }

// function FindNumsAppearOnce(array) {
//   let n = array.length;
//   let s = 0; // a^b
//   let k = 1;
//   for (let i = 0; i < n; i++) {
//     s ^= array[i];
//   }
//   while ((k & s) === 0) {
//     k = k << 1;
//   }
//   let a = 0,
//     b = 0;
//   for (let i = 0; i < n; i++) {
//     if ((k & array[i]) === 0) {
//       a ^= array[i];
//     } else {
//       b ^= array[i];
//     }
//   }
//   return a > b ? [b, a] : [a, b];
// }

// function minNumberDisappeared(nums) {
//   let n = nums.length;
//   for (let i = 0; i < n; i++) {
//     if (nums[i] <= 0) {
//       nums[i] = n + 1;
//     }
//   }
//   for (let i = 0; i < n; i++) {
//     const j = Math.abs(nums[i]);
//     if (j <= n) {
//       nums[j - 1] = nums[j - 1] < 0 ? nums[j - 1] : -1 * nums[j - 1];
//     }
//   }
//   for (let i = 0; i < n; i++) {
//     if (nums[i] > 0) {
//       return i + 1;
//     }
//   }
//   return n + 1;
// }

// function threeSum(num) {
//   const res = [];
//   const n = num.length;
//   if (num.length < 3) {
//     return res;
//   }
//   num.sort((a, b) => a - b);
//   for (let i = 0; i < n - 2; i++) {
//     // dedupe
//     if (i !== 0 && num[i] === num[i - 1]) {
//       continue;
//     }
//     let l = i + 1,
//       r = n - 1,
//       target = -num[i];
//     while (l < r) {
//       if (num[l] + num[r] === target) {
//         res.push([num[i], num[l], num[r]]);
//         while (l + 1 < r && num[l] === num[l + 1]) {
//           l++; // dedupe
//         }
//         while (l < r - 1 && num[r] === num[r - 1]) {
//           r--; // dedupe
//         }
//         l++;
//         r--;
//       } else if (num[l] + num[r] > target) {
//         r--;
//       } else {
//         l++;
//       }
//     }
//   }
//   return res;
// }