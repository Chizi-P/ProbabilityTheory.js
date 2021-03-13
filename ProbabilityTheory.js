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
    // 求概率
    static P(event) {
        if (event.sampleSpace.length < 0) return -1; // 分母不可為0
        return event.length / event.sampleSpace.length;
    }
    // 條件概率 P(A | B)
    static conditionalProbability(A, B) {
        return this.P(A.intersection(B))
    }
    static bayesTheorem(A, B) {
        // return this.P(A[i].intersection(B)) / this.P(B);
        return (this.P(A[i]) * this.P(this.conditionalProbability(B, A[i]))) / new Array(j).reduce((e, k) => this.P(A[k]) * this.conditionalProbability(B, A[k]));
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
}


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
    probability() {
        return ProbabilityTheroy.P(this);
    }
}
Events.prototype.__proto__ = Array.prototype;


class SampleSpace {
    constructor(...samplePoint) {
        let sampleSpace = samplePoint;
        sampleSpace.__proto__ = this;
        return sampleSpace;
    }
    event(condition) {
        return new Events(this, condition);
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


class RandomVariable {
    constructor(sampleSpace, func = () => {}) {
        let randomVariable = [];
        sampleSpace.forEach(e => {
            let v = SamplePoint.differenceBetween()(e);
            randomVariable[v]
        });
        function func (n) {
            return n * 2;
        }
        func.__proto__ = this;
        return func;
    }
    
}

console.log(new RandomVariable())

class SamplePoint {
    constructor() {}
    // event
    static sumEqual(val) {
        return e => e.reduce?.((s, v) => s + v) == val;
    }

    // RandomVariable
    static differenceBetween() {

    }
}

let S = new SampleSpace([1, 1], [1, 2], [2, 1], [2, 2]);
let A = S.event(SamplePoint.sumEqual(3));

console.log(S, A, A.probability());