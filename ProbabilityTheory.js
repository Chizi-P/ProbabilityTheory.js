/**
 * Create by chizi
 * 13/03/2021
 */


const notTypeofSet = new TypeError("Incoming parameter is not type of Set");
const undefinedParameterOfSuperset = new ReferenceError("Undefined a parameter of 'superset', can't compare with it");
const undefinedParameterOfSubset = new ReferenceError("Undefined a parameter of 'subset', can't compare with it");

class ProbabilityTheroy {
    constructor() {
    }
    // 求機率
    static P(event) {
        if (event.sampleSpace.length < 0) return -1; // 分母不可為0
        return event.length / event.sampleSpace.length;
    }
    // 條件機率 P(A | B)
    static conditionalProbability(B, A) {
        return this.P(B.intersection(A));
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
        A[0]?.sampleSpace.isPartion(...A);
        const PA = A.probability();
        const PiA = 1 - PA;
        const PBA = this.conditionalProbability(B, A);
        const PBiA = this.conditionalProbability(B, 1 - A);
        return PA * PBA / (PA * PBA + PiA * PBiA);
    }
    static factorial(n) {
        if (n == 0) return 1;
        n = BigInt(n);
        let result = n;
        while(--n) {
            result *= n;
        }
        return result;
    }
    static permutation(n, k) {
        return this.factorial(n) / this.factorial(n - k);
    }
    static combination(n, k) {
        return this.factorial(n) / (this.factorial(n - k) * this.factorial(k));
    }
    static probabilityMassFunction(randomVariable, x) {
        return randomVariable[x]?.probability();
    }
    static cumulativeDistributionFunction(randomVariable, x) {
        // discrete
        let result = 0;
        for (const xi of randomVariable.values) {
            result += randomVariable[xi].probability();
            if (xi >= x) break;
        }
        return result;
        // continuous
        if (typeof randomVariable == 'function') {

        }
    }
    static probabilityDensityFunction(fx) {
        
    }
    static mean(randomVariable) {
        return randomVariable.values.reduce((s, e) => {
            return Number(s + e * this.probabilityMassFunction(randomVariable, e));
        });
        // continuous
        // function of the random variable
        if (typeof randomVariable == 'function') {
            
        }
    }
    static medians(randomVariable) {
        return this.cumulativeDistributionFunction(randomVariable, 0.5);
    }
    static variance(randomVariable) {
        // ！
        this.mean((randomVariable - this.mean(randomVariable)**2))
    }
    static standardDeviation() {}
    static chebyshevsInequality() {}
    static quantile(percent) {}
    static upperQuantile() {}
    static lowerQuantile() {}
    static marginalProbabilityDistribution() {}
    static covariance(X, Y) {}
    static correlation(X, Y) {}
    static graph(xAxisValue, f) {
        let Y = xAxisValue.map(x => f(x));
        const h = 15;
        const toFixedNum = 2;
        const dx = 1 / h;
        for (let i = 0; i < h; i++) {
            process.stdout.write(`${(1 - i / h).toFixed(toFixedNum)} ┤░░`);
            for (let j = 0; j < xAxisValue.length; j++) {
                if (i >= h - Y[j] * h && i <= h - (Y[j] - dx) * h) {
                    console.log('y', Y[j])
                    process.stdout.write('██░░');
                } else {
                    process.stdout.write('░░░░');
                }
            }
            console.log()
        }
        process.stdout.write(`${(0).toFixed(toFixedNum)}   `);
        xAxisValue.forEach(e => {
            process.stdout.write(` ╵  `);
        });
        console.log()
        process.stdout.write('      ');
        xAxisValue.forEach(e => {
            process.stdout.write(`  ${e} `);
        });
        console.log()
    }
}


/** use
 * let set = [1, 2, 3, 4, 5, 6];
 * let samplePoint = new SamplePoint([set, set]);
 * let S = new SampleSpace(samplePoint); 
 */
class SamplePoint {
    constructor(set) {
        this.set = set;
        let l = set.reduce((s, e) => s * e.length, 1);
        let samplePoint = new Array(l)
        console.log(samplePoint)
        for (let i = 0; i < set.length; i++) {
            for (let j = 0; j < set[i].length; j++) {
            }
        }
        return samplePoint;
    }
    // event
    static sumEqual(val) {
        return e => e.reduce?.((s, v) => s + v) == val;
    }
    
    // RandomVariable
    static differenceBetween(e) {
        return e.reduce?.((s, v) => Math.abs(s - v));
    }
}

// console.log('r', new SamplePoint([[1, 2], [4, 5]]))

class SampleSpace {
    constructor(...samplePoint) {
        let sampleSpace = samplePoint;
        sampleSpace.__proto__ = this;
        return sampleSpace;
    }
    event(condition) {
        return new Events(this, condition);
    }
    randomVariable(condition = () => {}) {
        return new RandomVariable(this, condition);
    }
    isSame(event) {
        return this.length == event.length && this.every((e, i) => e === event[i]);
    }
    // 完全分割
    isPartion(...event) {
        for (let i = 0, l = event.length; i < l; i++) {
            for (let j = i + 1; j < l; j++) {
                if (!event[i].isDisjoint(event[j])) return false;
            }
        }
        return this.isSame(event.reduce((s, e) => s.union(e), new Events(event[0].sampleSpace)));
    }
}
SampleSpace.prototype.__proto__ = Array.prototype;


class Events {
    constructor(sampleSpace, param = []) {
        let event;
        if (typeof param == 'function') {
            event = sampleSpace.filter(param);
        } else if (Array.isArray(param)) {
            event = param;
        }
        this.sampleSpace = sampleSpace;
        event.__proto__ = this;
        return event;
    }
    // 交集 //
    intersection(event = new Events()) {
        if (!(event instanceof Events)) throw notTypeofSet;
        let intersection = new Set();
        let A = new Set(this);
        for (const element of event) {
            if (A.has(element)) {
                intersection.add(element);
            }
        }
        return new Events(this.sampleSpace, [...intersection]);
    }
    // 對稱差集 //
    symmetricDifference(event = new Events()) {
        if (!(event instanceof Events)) throw notTypeofSet;
        // 聯集減去交集
        return this.union(event).subtracting(this.intersection(event));
    }
    // 聯集 //
    union(event = new Events()) {
        if (!(event instanceof Events)) throw notTypeofSet;
        return new Events(this.sampleSpace, [...new Set([...this, ...event])].sort((a ,b) => a - b));
    }
    // 減去 //
    subtracting(event = new Events()) {
        if (!(event instanceof Events)) throw notTypeofSet;
        let subtracting = new Set(this);
        for (const element of event) {
            subtracting.delete(element);
        }
        return new Events(this.sampleSpace, [...subtracting]);
    }
    // 前者是否後者的子集 //
    isSubset(event) {
        if (event == undefined) throw undefinedParameterOfSuperset;
        if (!(event instanceof Events)) throw notTypeofSet;
        let superset = new Set(event);
        for (const element of this) {
            if (!superset.has(element)) {
                return false;
            }
        }
        return true;
    }
    // 前者是否後者的超集 //
    isSuperset(event) {
        if (event == undefined) throw undefinedParameterOfSubset;
        if (!(event instanceof Events))  throw notTypeofSet;
        let A = new Set(this);
        for (const element of event) {
            if (!A.has(element)) {
                return false;
            }
        }
        return true;
    }
    // 是否為互斥 //
    isDisjoint(event = new Events()) {
        if (!(event instanceof Events)) throw notTypeofSet;
        let A = new Set(this);
        let otherSet = new Set(event);
        // 優化：減少檢查次數
        const isLoopThis = A.size <= otherSet.size;
        const loopSet = isLoopThis ? A : otherSet;
        const checkSet = isLoopThis ? otherSet : A;
        for (const element of loopSet) {
            if (checkSet.has(element)) {
                return false;
            }
        }
        return true;
    }
    // 是否為獨立 //
    isIndependent(event) {
        return this.intersection(event).probability() == this.probability() * event.probability()
    }
    probability() {
        return ProbabilityTheroy.P(this);
    }
}
Events.prototype.__proto__ = Array.prototype;


class RandomVariable {
    constructor(sampleSpace, condition = () => {}) {
        let randomVariable = {};
        randomVariable.__proto__ = this;
        sampleSpace.forEach(e => {
            let v = condition(e);
            randomVariable[v] ?? (randomVariable[v] = new Events(sampleSpace));
            randomVariable[v].push(e);
        });
        return randomVariable;
    }
    get values() {
        return Object.keys(this);
    }
    table() {
        console.table(this);
    }
    probabilityMassFunction(x) {
        return ProbabilityTheroy.probabilityMassFunction(this, x);
    }
    probabilityMassFunctionTable(digits) {
        let table = {};
        for (const e in this) {
            const p = this.probabilityMassFunction(e);
            table[e] = {probability : digits === undefined ? p : Number(p.toFixed(digits))};
        }
        console.table(table);
    }
    cumulativeDistributionFunction(x) {
        return ProbabilityTheroy.cumulativeDistributionFunction(this, x);
    }
    cumulativeDistributionFunctionGraph(w, h) {
        w = w ?? Math.max(...this.values) + 1;
        h = h ?? 15;
        const toFixedNum = 2;
        for (let i = 0; i < h; i++) {
            process.stdout.write(`${(1 - i / h).toFixed(toFixedNum)} ┤░░`);
            for (let j = 0; j < w; j++) {
                if (i >= h - this.cumulativeDistributionFunction(j) * h) {
                    process.stdout.write('██░░');
                } else {
                    process.stdout.write('░░░░');
                }
            }
            console.log()
        }
        process.stdout.write(`${(0).toFixed(toFixedNum)}   `);
        this.values.forEach(e => {
            process.stdout.write(` ╵  `);
        });
        console.log()
        process.stdout.write('      ');
        this.values.forEach(e => {
            process.stdout.write(`  ${e} `);
        });
        console.log()
    }
}
RandomVariable.prototype.__proto__ = Array.prototype;

class DiscreteProbabilityDistributions {
    constructor() {}
    static Binomial() {}
    static BinomialN() {}
    static Geometric() {}
    static NegativeBinomial() {}
    static Hypergeometric() {}
    static Poisson() {}
    static Multinomial() {}
    static Uniform() {}
    static Exponential() {}
    static Gamma() {}
    static ChiSquared() {}
    static Weibull() {}
    static Beta() {}
}


// let S = new SampleSpace(
//     [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
//     [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
//     [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
//     [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
//     [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6],
//     [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6],
// );

// let X = S.randomVariable(SamplePoint.differenceBetween);
// X.probabilityMassFunctionTable()
// X.cumulativeDistributionFunctionGraph()
// console.log('mean:',ProbabilityTheroy.mean(X))

// ProbabilityTheroy.graph([0, 1, 2, 3, 4, 5, 6, 7, 8], x => {
//     return X.cumulativeDistributionFunction(x)
// })