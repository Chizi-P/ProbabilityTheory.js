# ProbabilityTheory.js
 ProbabilityTheory.js



#### How to Use

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



```javascript
let S = new SampleSpace([1, 1], [1, 2], [2, 1], [2, 2]);
// ↪ SampleSpace(6) [ [ 1, 1 ], [ 1, 2 ], [ 2, 1 ], [ 2, 2 ] ]

let A = S.event(SamplePoint.sumEqual(3));
// ↪ Events(2) [ [ 1, 2 ], [ 2, 1 ] ]

let p = A.probability();
// ↪ 0.5
```

