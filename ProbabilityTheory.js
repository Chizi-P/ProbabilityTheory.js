/**
 * Create by chizi
 * 13/03/2021
 */


const notTypeofSet = new TypeError("Incoming parameter is not type of Set")
const undefinedParameterOfSuperset = new ReferenceError("Undefined a parameter of 'superset', can't compare with it")
const undefinedParameterOfSubset = new ReferenceError("Undefined a parameter of 'subset', can't compare with it")

class ProbabilityTheory {
    constructor() {
    }
    // 求機率
    static P(event) {
        if (event.sampleSpace.length < 0) return -1 // 分母不可為0
        return event.length / event.sampleSpace.length
    }
    // 條件機率 P(A | B)
    static conditionalProbability(B, A) {
        return this.P(B.intersection(A))
    }
    // 事後機率 Bayes' Theorem
    /**
     * 
     * @param {[Events]} A 
     * @param {Events} B 
     * @returns 
     */
    static posteriorProbability(A, B) {
        // ！
        if (Array.isArray(A) && !(A instanceof Events)) {
            if(A[0].sampleSpace.isPartion(...A)) {
                
            }
        }
        A[0]?.sampleSpace.isPartion(...A)
        const PA = A.probability()
        const PiA = 1 - PA
        const PBA = this.conditionalProbability(B, A)
        const PBiA = this.conditionalProbability(B, 1 - A)
        return PA * PBA / (PA * PBA + PiA * PBiA)
    }
    static factorial(n) {
        if (n == 0) return 1
        n = BigInt(n)
        let result = n
        while(--n) {
            result *= n
        }
        return result
    }
    static permutation(n, k) {
        return this.factorial(n) / this.factorial(n - k)
    }
    static combination(n, k) {
        return this.factorial(n) / (this.factorial(n - k) * this.factorial(k))
    }
    static probabilityMassFunction(randomVariable, x) {
        return randomVariable[x]?.probability()
    }
    static cumulativeDistributionFunction(randomVariable, x) {
        // discrete
        let result = 0
        for (const xi of randomVariable.values) {
            result += randomVariable[xi].probability()
            if (xi >= x) break
        }
        return result
        // continuous
        if (typeof randomVariable == 'function') {

        }
    }
    static probabilityDensityFunction(fx) {
        
    }
    static mean(randomVariable) {
        return randomVariable.values.reduce((s, e) => {
            return Number(s + e * this.probabilityMassFunction(randomVariable, e))
        })
        // continuous
        // function of the random variable
        if (typeof randomVariable == 'function') {
            
        }
    }
    static medians(randomVariable) {
        return this.cumulativeDistributionFunction(randomVariable, 0.5)
    }
    static variance(randomVariable) {
        // ！
        this.mean((randomVariable - this.mean(randomVariable)**2))
    }
    static standardDeviation(randomVariable) {
        randomVariable
    }
    static chebyshevsInequality() {}
    static quantile(percent) {}
    static upperQuantile() {}
    static lowerQuantile() {}
    static marginalProbabilityDistribution() {}
    static covariance(X, Y) {}
    static correlation(X, Y) {}
    static graph(xAxisValue, f) {
        let Y = xAxisValue.map(x => f(x))
        const h = 15
        const toFixedNum = 2
        const dx = 1 / h
        for (let i = 0; i < h; i++) {
            process.stdout.write(`${(1 - i / h).toFixed(toFixedNum)} ┤░░`)
            for (let j = 0; j < xAxisValue.length; j++) {
                if (i >= h - Y[j] * h && i <= h - (Y[j] - dx) * h) {
                    console.log('y', Y[j])
                    process.stdout.write('██░░')
                } else {
                    process.stdout.write('░░░░')
                }
            }
            console.log()
        }
        process.stdout.write(`${(0).toFixed(toFixedNum)}   `)
        xAxisValue.forEach(e => {
            process.stdout.write(` ╵  `)
        })
        console.log()
        process.stdout.write('      ')
        xAxisValue.forEach(e => {
            process.stdout.write(`  ${e} `)
        })
        console.log()
    }

    //！ 再看看，放在哪個class
    static summaryStatistics() {
        
    }
    static table = {
        normal: {

        },
        ChiSquared: [
            []
        ],
        t: [
            []
        ],
        F: [
            []
        ]
    }
}


/** use
 * let set = [1, 2, 3, 4, 5, 6]
 * let samplePoint = new SamplePoint([set, set])
 * let S = new SampleSpace(samplePoint) 
 */
class SamplePoint {
    constructor(set) {
        this.set = set
        let l = set.reduce((s, e) => s * e.length, 1)
        let samplePoint = new Array(l)
        console.log(samplePoint)
        for (let i = 0; i < set.length; i++) {
            for (let j = 0; j < set[i].length; j++) {
                
            }
        }
        return samplePoint
    }
    // 生成數據
    static set(...sets) {

        function combination(set1, set2) {
            let result = []
            for (let i = 0; i < set1.length; i++) {
                for (let j = 0; j < set2.length; j++) {
                    if (Array.isArray(set1[i])) {
                        result.push([...set1[i], set2[j]])
                    } else {
                        result.push([set1[i], set2[j]])
                    }
                }
            }
            return result
        }

        return sets.reduce((a, b) => {
            console.log(a)
            console.log(b)
            // a.map(e => {
            //     console.log('a', e)
            // })
            return combination(a.flat(), b)
        })

        // let points = sets[0]
        // for (let i = 1 i < sets.length i++) {
        //     points = combination(points, sets[i])
        // }
        // return points
    }
    static range(start, end, step = 1) {
        const l = (end - start) / step
        if (l % 1) throw ''

        let result = new Array(l)
        for (let i = 0, k = start; i <= l; i++, k += step) {
            result[i] = k
        }
        return result
    }
    static charRange(startChar, endChar) {
        return String.fromCharCode(...SamplePoint.range(startChar.charCodeAt(0), endChar.charCodeAt(0)))
    }
    // event
    static sumEqual(val) {
        return e => e.reduce?.((s, v) => s + v) == val
    }
    
    // RandomVariable
    static differenceBetween(e) {
        return e.reduce?.((s, v) => Math.abs(s - v))
    }
}

class SampleSpace {
    constructor(...samplePoint) {
        let sampleSpace = samplePoint
        sampleSpace.__proto__ = this
        return sampleSpace
    }
    event(condition) {
        return new Events(this, condition)
    }
    randomVariable(condition = () => {}) {
        return new RandomVariable(this, condition)
    }
    isSame(event) {
        return this.length == event.length && this.every((e, i) => e === event[i])
    }
    // 完全分割
    isPartion(...event) {
        for (let i = 0, l = event.lengt; i < l; i++) {
            for (let j = i + 1; j < l; j++) {
                if (!event[i].isDisjoint(event[j])) return false
            }
        }
        return this.isSame(event.reduce((s, e) => s.union(e), new Events(event[0].sampleSpace)))
    }
}
SampleSpace.prototype.__proto__ = Array.prototype


class Events {
    constructor(sampleSpace, param = []) {
        let event
        if (typeof param == 'function') {
            event = sampleSpace.filter(param)
        } else if (Array.isArray(param)) {
            event = param
        }
        this.sampleSpace = sampleSpace
        event.__proto__ = this
        return event
    }
    // 交集 //
    intersection(event = new Events()) {
        if (!(event instanceof Events)) throw notTypeofSet
        let intersection = new Set()
        let A = new Set(this)
        for (const element of event) {
            if (A.has(element)) {
                intersection.add(element)
            }
        }
        return new Events(this.sampleSpace, [...intersection])
    }
    // 對稱差集 //
    symmetricDifference(event = new Events()) {
        if (!(event instanceof Events)) throw notTypeofSet
        // 聯集減去交集
        return this.union(event).subtracting(this.intersection(event))
    }
    // 聯集 //
    union(event = new Events()) {
        if (!(event instanceof Events)) throw notTypeofSet
        return new Events(this.sampleSpace, [...new Set([...this, ...event])].sort((a ,b) => a - b))
    }
    // 減去 //
    subtracting(event = new Events()) {
        if (!(event instanceof Events)) throw notTypeofSet
        let subtracting = new Set(this)
        for (const element of event) {
            subtracting.delete(element)
        }
        return new Events(this.sampleSpace, [...subtracting])
    }
    // 前者是否後者的子集 //
    isSubset(event) {
        if (event == undefined) throw undefinedParameterOfSuperset
        if (!(event instanceof Events)) throw notTypeofSet
        let superset = new Set(event)
        for (const element of this) {
            if (!superset.has(element)) {
                return false
            }
        }
        return true
    }
    // 前者是否後者的超集 //
    isSuperset(event) {
        if (event == undefined) throw undefinedParameterOfSubset
        if (!(event instanceof Events))  throw notTypeofSet
        let A = new Set(this)
        for (const element of event) {
            if (!A.has(element)) {
                return false
            }
        }
        return true
    }
    // 是否為互斥 //
    isDisjoint(event = new Events()) {
        if (!(event instanceof Events)) throw notTypeofSet
        let A = new Set(this)
        let otherSet = new Set(event)
        // 優化：減少檢查次數
        const isLoopThis = A.size <= otherSet.size
        const loopSet = isLoopThis ? A : otherSet
        const checkSet = isLoopThis ? otherSet : A
        for (const element of loopSet) {
            if (checkSet.has(element)) {
                return false
            }
        }
        return true
    }
    // 是否為獨立 //
    isIndependent(event) {
        return this.intersection(event).probability() == this.probability() * event.probability()
    }
    probability() {
        return ProbabilityTheory.P(this)
    }
}
Events.prototype.__proto__ = Array.prototype


class RandomVariable {
    constructor(sampleSpace, condition = () => {}) {
        let randomVariable = {}
        randomVariable.__proto__ = this
        sampleSpace.forEach(e => {
            let v = condition(e)
            randomVariable[v] ?? (randomVariable[v] = new Events(sampleSpace))
            randomVariable[v].push(e)
        })
        return randomVariable
    }
    get values() {
        return Object.keys(this)
    }
    table() {
        console.table(this)
    }
    probabilityMassFunction(x) {
        return ProbabilityTheory.probabilityMassFunction(this, x)
    }
    probabilityMassFunctionTable(digits) {
        let table = {}
        for (const e in this) {
            const p = this.probabilityMassFunction(e)
            table[e] = {probability : digits === undefined ? p : Number(p.toFixed(digits))}
        }
        console.table(table)
    }
    cumulativeDistributionFunction(x) {
        return ProbabilityTheory.cumulativeDistributionFunction(this, x)
    }
    cumulativeDistributionFunctionGraph(w, h) {
        w = w ?? Math.max(...this.values) + 1
        h = h ?? 15
        const toFixedNum = 2
        for (let i = 0; i < h; i++) {
            process.stdout.write(`${(1 - i / h).toFixed(toFixedNum)} ┤░░`)
            for (let j = 0; j < w; j++) {
                if (i >= h - this.cumulativeDistributionFunction(j) * h) {
                    process.stdout.write('██░░')
                } else {
                    process.stdout.write('░░░░')
                }
            }
            console.log()
        }
        process.stdout.write(`${(0).toFixed(toFixedNum)}   `)
        this.values.forEach(e => {
            process.stdout.write(` ╵  `)
        })
        console.log()
        process.stdout.write('      ')
        this.values.forEach(e => {
            process.stdout.write(`  ${e} `)
        })
        console.log()
    }
}
RandomVariable.prototype.__proto__ = Array.prototype

/**
 * 離散機率分佈
 */
class DiscreteProbabilityDistributions {
    constructor() {}
    // 二項式
    static Binomial(p) {
        return {
            P : (x) => x ? 1 - p : p,
            E : p,
            Var : p * (p - 1)
        }
    }
    // n次二項式
    static BinomialN(p, n) {
        return {
            P : (x) => ProbabilityTheory.combination(n, x) * p ** x * (1 - p) ** (n - x),
            E : n * p,
            Var : n * p * (1 - p)
        }
    }
    // 幾何
    static Geometric() {}
    // 負二項式
    static NegativeBinomial() {}
    // 超幾何
    static Hypergeometric() {}
    // 柏松
    static Poisson() {}
    // 多項式
    static Multinomial() {}
    // 均勻
    static Uniform() {}
    // 指數
    static Exponential() {}
    // 伽馬
    static Gamma() {}
    // 卡方
    static ChiSquared() {}
    // 韋伯
    static Weibull() {}
    // 貝塔
    static Beta() {}
    // 正態
    static Normal() {

    }
}


class Graph {
    constructor() {
        this.type = 'barChart'
        this.sampleSpace
    }
    static barChart(sample) {
        
    }
    static paretoChart() {

    }
    static categorical() {
        
    }
    static pieCharts() {

    }
    static histograms() {

    }
    static boxplots() {

    }
}


class analysisOfVariance {
    constructor() {
        this.x = [[]] // <Matrix>
        this.y = [[]] // <Matrix>
        H0
        HA
    }
    // !!
    means(i) {
        return this.x[i].reduce((a, b) => a + b, 0) / this.x[i].length
    }
    // !!
    SST() {
        return this.x.reduce((a, b) => {
            return a[i]?.reduce((c, d) => {
                (c - this.means(i)) ** 2
            }, 0)
        }, 0)
    }
    SSTr() {
        
    }
    SSE() {

    }
    MSTr() {
        return this.SSTr() / (k - 1)
    }
    MSE() {
        return this.SSE / (nT - k)
    }
    F() {
        return this.MSTr() / this.MSE()
    }
    ANOVA() {
        const table = {
            
        }
        console.table(table)
    }
}


let S = new SampleSpace(
    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
    [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
    [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6],
    [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6],
)

let X = S.randomVariable(SamplePoint.differenceBetween)
X.probabilityMassFunctionTable()
X.cumulativeDistributionFunctionGraph()
console.log('mean:',ProbabilityTheory.mean(X))

// ProbabilityTheory.graph([0, 1, 2, 3, 4, 5, 6, 7, 8], x => {
//     return X.cumulativeDistributionFunction(x)
// })

// let sample = new SampleSpace(SamplePoint.set([1, 2, 3], [1, 2, 3, 4], ['A', 'B'], ['C', 'D']))
// console.log(sample)