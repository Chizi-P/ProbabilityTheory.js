# ProbabilityTheory.js
[Code](https://github.com/Chizi-P/ProbabilityTheory.js/blob/main/ProbabilityTheory.js)

### 如何使用：

`↪`：輸出

```javascript
let S = new SampleSpace(
    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
    [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
    [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6],
    [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6],
);

let X = S.randomVariable(SamplePoint.differenceBetween);

X.probabilityMassFunctionTable()
/** ↪
┌─────────┬─────────────────────┐
│ (index) │     probability     │
├─────────┼─────────────────────┤
│    0    │ 0.16666666666666666 │
│    1    │ 0.2777777777777778  │
│    2    │ 0.2222222222222222  │
│    3    │ 0.16666666666666666 │
│    4    │ 0.1111111111111111  │
│    5    │ 0.05555555555555555 │
└─────────┴─────────────────────┘
*/

X.cumulativeDistributionFunctionGraph()
/** ↪
1.00 ┤░░░░░░░░░░░░░░░░░░░░██░░
0.93 ┤░░░░░░░░░░░░░░░░██░░██░░
0.87 ┤░░░░░░░░░░░░░░░░██░░██░░
0.80 ┤░░░░░░░░░░░░██░░██░░██░░
0.73 ┤░░░░░░░░░░░░██░░██░░██░░
0.67 ┤░░░░░░░░██░░██░░██░░██░░
0.60 ┤░░░░░░░░██░░██░░██░░██░░
0.53 ┤░░░░░░░░██░░██░░██░░██░░
0.47 ┤░░░░░░░░██░░██░░██░░██░░
0.40 ┤░░░░██░░██░░██░░██░░██░░
0.33 ┤░░░░██░░██░░██░░██░░██░░
0.27 ┤░░░░██░░██░░██░░██░░██░░
0.20 ┤░░░░██░░██░░██░░██░░██░░
0.13 ┤██░░██░░██░░██░░██░░██░░
0.07 ┤██░░██░░██░░██░░██░░██░░
0.00   ╵   ╵   ╵   ╵   ╵   ╵  
       0   1   2   3   4   5  
*/

console.log('mean:',ProbabilityTheroy.mean(X))
// ↪ 1.9444444444444446
```



## ProbabilityTheroy

#### ProbabilityTheroy.P(\<Event>)

求得事件的概率。

#### ProbabilityTheroy.conditionalProbability(eventB, eventA)

求得 `P(eventB | eventA)` 的條件概率，在 `eventA` 發生後，發生 `eventB` 的概率。

#### 參數

​	`eventA, eventB` 

​		都屬於 `Events` 類別。

#### ProbabilityTheroy.posteriorProbability([\<Events>], \<Events>) （未完全實現）

求得事後概率。

`[\<Events>]` 必須完全分割樣本空間。

#### ProbabilityTheroy.factorial(n)

計算 `n` 的階乘，數學的 $n!$ 。

#### ProbabilityTheroy.permutation(n, k)

排列，數學的 $P^{n}_{k}$。

#### ProbabilityTheroy.combination(n, k)

組合，數學的 $C^{n}_{k}$。

#### ProbabilityTheroy.probabilityMassFunction(randomVariable, x)

概率密度函數，數學的 $P(randomVariable = x)$。

#### ProbabilityTheroy.cumulativeDistributionFunction(randomVariable, x)

累積分佈函數，數學的 $F(x) = P(randomVariable \leq x)$。

#### ProbabilityTheroy.probabilityDensityFunction(fx) （未實現）



#### ProbabilityTheroy.mean(randomVariable)

求得隨機變量的期望值。





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

根據條件創建一個隨機變量。

#### 參數

`condition`

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

#### \<Events>.intersection(\<Events>)

求該事件與另外一個事件的交集。

#### \<Events>.symmetricDifference(\<Events>)

求該事件與另外一個事件的對稱差集。

#### \<Events>.union(\<Events>)

求該事件與另外一個事件的聯集。

#### \<Events>.subtracting(\<Events>)

求該事件的集合減去另外一個事件的集合。

#### \<Events>.isSubset(\<Events>)

判斷該事件是否為另外一個事件的子集合。

#### \<Events>.isSuperset(\<Events>)

判斷該事件是否為另外一個事件的超集合。

#### \<Events>.isDisjoint(\<Events>)

判斷該事件是否與另外一個事件互斥。

#### \<Events>.probability()

求得該事件的概率。

#### 描述

​	該方法等價於 `ProbabilityTheroy.P(<Events>)`。



## SamplePoint

#### SamplePoint.sumEqual(value)

判斷樣本點的和是否等於 `value`。

#### 返回

​	`true` 等於 `value`，`false` 則否。

#### SamplePoint.differenceBetween

求得樣本點的差。



## RandomVariable

### Constructor

#### new RandomVariable(sampleSpace, function condition)

生成一個隨機變量。

#### 參數

​	`sampleSpace` 

​		屬於 `SampleSpace ` 類別。

​	`condition`

#### get \<RandomVariable>.values

獲得該隨機變量

#### \<RandomVariable>.table()

使用表格顯示該隨機變量。

#### \<RandomVariable>.probabilityMassFunction(x)

概率密度函數，數學的 $P(X=x)$。

#### 參數

​	`x` 

#### \<RandomVariable>.probabilityMassFunctionTable()

使用表格顯示該隨機變量所有數值通過概率密度函數的結果。

#### \<RandomVariable>.cumulativeDistributionFunction(x)

該隨機變量的累積分佈函數。

#### \<RandomVariable>.cumulativeDistributionFunctionGraph([w[, h]])

該隨機變量的累積分佈函數圖。