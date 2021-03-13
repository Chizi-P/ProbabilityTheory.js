# ProbabilityTheory.js
 ProbabilityTheory.js



```javascript
let S = new SampleSpace(1, 2, 3, 4, 5, 6);
// ↪ SampleSpace(6) [ 1, 2, 3, 4, 5, 6 ]

let A = S.event(e => e % 2);
// ↪ Events(3) [ 1, 3, 5 ]

let p1 = ProbabilityTheory.P(A);
// ↪ 0.5

let p2 = A.probability();
// ↪ 0.5

// ProbabilityTheory.P(A) === A.probability() ↪ true
```

