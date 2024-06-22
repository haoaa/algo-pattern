function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
}

// function isValidBST(root) {
//   if (!root) {
//     return true;
//   }
//   const nl = [], vl=[]
//   let p = root // 子问题根节点
//   while (p || nl.length) {
//     while (p) {
//       nl.push(p)
//       p=p.left
//     }
//     let np = nl.pop() // 中序访问
//     vl.push(np.val)
//     if (np.right) {
//       p=np.right
//     }
//   }
//   for (let i = 1; i < vl.length; i++) {
//     if (vl[i-1]>=vl[i]) {
//       return false
//     }
//   }
//   return true
// }

// let pre = -Infinity;
// function isValidBST(root) {
//   if (!root) {
//     return true;
//   }
//   if (isValidBST(root.left)) {
//     if (pre < root.val) {
//       pre = root.val;
//       return isValidBST(root.right);
//     }
//   }
//   return false;
// }

// function isCompleteTree(root) {
//   // write code here
//   const nl = [root];
//   let end = false;
//   while (nl.length) {
//     let n = nl.shift();
//     if (!n) {
//       end = true;
//     } else {
//       if (end) return false;
//       nl.push(n.left, n.right);
//     }
//   }
//   return true;
// }

// let ttl=0
// function dfs(root , idx) {
//   if (!root) {
//     return 0
//   }
//   ttl = idx
//   return idx + dfs(root.left, idx*2) + dfs(root.right, idx*2+1)
// }

// function isCompleteTree(root) {
//   return dfs(root, 1) === ttl
// }

// function depth(root) {
//   if (!root) {
//     return 0;
//   }
//   const l = depth(root.left);
//   if (l === -1) return -1;
//   const r = depth(root.right);
//   if (r === -1) return -1;
//   if (Math.abs(l - r) > 1) {
//     return -1;
//   }
//   return Math.max(l, r) + 1;
// }

// function isBalanced(r) {
//   return depth(r) !== -1;
// }

// function path(root,n) {
//   const p=[]
//   while (root) {
//     p.push(root.val)
//     if (root.val ===n) {
//       break
//     }
//     root =root.val>n ?root.left:root.right
//   }
//   return p
// }

// function lowestCommonAncestor( root ,  p ,  q ) {
//   const p1=path(root,p)
//   const p2=path(root,q)
//   let last =''
//   while (p1.length&&p2.length) {
//     let s1 =p1.shift()
//     let s2 =p2.shift()
//     if (s1===s2) {
//       last=s1
//     }
//   }
//   return last
// }


// function lowestCommonAncestor( root ,  o1 ,  o2 ) {
//   if (!root || root.val===o1||root.val===o2) {
//     return root?root.val:null
//   }
//   const l= lowestCommonAncestor(root.left,o1,o2)
//   const r= lowestCommonAncestor(root.right,o1,o2)
//   if (!l) {
//     return r
//   }
//   if (!r) {
//     return l
//   }
//   return root.val
// }


// function reConstructBinaryTree(pre, vin) {
//   if (!pre.length) {
//     return null;
//   }
//   const root = new TreeNode(pre[0]);
//   const idx = vin.indexOf(pre[0]);
//   root.left = reConstructBinaryTree(pre.slice(1, idx + 1), vin.slice(0, idx));
//   root.right = reConstructBinaryTree(pre.slice(idx + 1), vin.slice(idx + 1));
//   return root;
// }

// function Serialize(pRoot) {
//   if (!pRoot) {
//     return "#";
//   }
//   let res = "";
//   res += pRoot.val + ",";
//   res += Serialize(pRoot.left);
//   res += Serialize(pRoot.right);
//   return res;
// }
// let cur = 0;
// function Deserialize(s) {
//   if (s[cur] === "#") {
//     cur += 1;
//     return null;
//   }
//   const end = s.indexOf(",", cur);
//   const root = new TreeNode(s.slice(cur, end));
//   cur = end + 1;
//   root.left = Deserialize(s);
//   root.right = Deserialize(s);
//   return root;
// }
