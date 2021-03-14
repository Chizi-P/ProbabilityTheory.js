# ProbabilityTheory.js
[Code](https://github.com/Chizi-P/ProbabilityTheory.js/blob/main/ProbabilityTheory.js)

### 如何使用：

`↪`：輸出

```javascript
let S = new SampleSpace([1, 1], [1, 2], [2, 1], [2, 2]);
// ↪ SampleSpace(6) [ [ 1, 1 ], [ 1, 2 ], [ 2, 1 ], [ 2, 2 ] ]

let A = S.event(SamplePoint.sumEqual(3));
// ↪ Events(2) [ [ 1, 2 ], [ 2, 1 ] ]

let p = A.probability();
// ↪ 0.5
```



## SampleSpace

### Constructor

#### new SampleSpace([value1[, value2[, ...]]])

生成一個樣本空間。

#### 參數

​	`value1, value2, ...`

​		類型為 `Number` 或 `Array`。



### Instance methods

#### \<SampleSpace>.event(function condition(samplePoint))

根據條件創建一個事件 。

#### 參數

`condition`

- 遍歷樣本空間 `SampleSpace` 中每個樣本點 `samplePoint` 的函數，返回 `true` 讓遍歷中的樣本點成為新事件的樣本點，`false` 則返回，該參數：

	- `samplePoint` 

		當前處理中的樣本點。

#### 返回

​	一個包含符合該條件的樣本點的 `Events` 類別的物品。

#### 描述

​	該方法等價於 `new Event(<SampleSpace>, condition)`。



#### \<SampleSpace>.randomVariable(function condition(samplePoint)|SamplePoint)

根據條件創建一個隨機變數。

#### 參數

`condition`：

#### 返回

​		一個樣本點映射到條件結果的 `RandomVariable` 類別的物品。

#### 描述

​	該方法等價於 `new RandomVariable(<SampleSpace>, condition)`。



#### \<SampleSpace>.isSame(\<Array>|\<Events>)

判斷該樣本空間的所有樣本點是否與參數一致。

#### 返回

​	`true` 一致，`false` 則否。



#### \<SampleSpace>.isPartion([\<Events>[, \<Events>[, ...]]])

判斷該樣本空間是否能被傳入的所有 `Events` 完全分割。

#### 返回

​	`true` 完全分割，`false` 則否。



## Events

### Constructor

#### new Events(\<SampleSpace>, [\<Array>|function condition])

生成一個事件。

#### 參數

​	`condition`

#### \<Events>.intersection(event)

#### \<Events>.symmetricDifference(event)

#### \<Events>.union

#### \<Events>.subtracting

#### \<Events>.isSubset(event)

#### \<Events>.isSuperset

#### \<Events>.isDisjoint

#### \<Events>.probability



## SamplePoint

#### SamplePoint.sumEqual

#### SamplePoint.differenceBetween



## RandomVariable

### Constructor

#### get \<RandomVariable>.values

#### \<RandomVariable>.table

#### \<RandomVariable>.probabilityMassFunction

#### \<RandomVariable>.probabilityMassFunctionTable



## ProbabilityTheroy

### Constructor

#### ProbabilityTheroy.P

#### ProbabilityTheroy.conditionalProbability

#### ProbabilityTheroy.bayesTheorem

#### ProbabilityTheroy.factorial

#### ProbabilityTheroy.permutation

#### ProbabilityTheroy.combination

#### ProbabilityTheroy.probabilityMassFunction

