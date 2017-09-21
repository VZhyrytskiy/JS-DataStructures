const VSet = (() => {

    const priv = new WeakMap();
    const _ = instance => priv.get(instance);

    return class VSet {
        constructor() {
            const privateMembers = {
                // collection will hold the set
                collection: []
            };
            priv.set(this, privateMembers);
        }

        // Checks for the presence of an element and returns true or false
        has(element) {
            return _(this).collection.indexOf(element) !== -1;
        }

        // Returns all the values in the set
        get values() {
            return _(this).collection;
        }

        // Returns the size of the set
        get size() {
            return _(this).collection.length;
        }

        // Adds an element to the set
        add(element) {
            if (!this.has(element)) {
                _(this).collection.push(element);
                return true;
            }
            return false;
        }

        // Removes an element from the set
        remove(element) {
            if (this.has(element)) {
                const index = _(this).collection.indexOf(element);
                _(this).collection.splice(index, 1);
                return true;
            }
            return false;
        }

        // Returns the union of two sets
        union(otherSet) {
            const unionSet = new VSet(),
                  firstSet = this.values,
                  secondSet = otherSet.values;

            firstSet.forEach(element => unionSet.add(element));
            secondSet.forEach(element => unionSet.add(element));

            return unionSet;
        }

        // Returns the intersection of two sets as a new set
        intersection(otherSet) {
            const intersectionSet = new VSet(),
                  firstSet = this.values;

            firstSet.forEach(element => {
                if (otherSet.has(element)) {
                    intersectionSet.add(element);
                }
            });

            return intersectionSet;
        }

        // Returns the difference of two sets as a new set
        difference(otherSet) {
            const differenceSet = new VSet(),
                  firstSet = this.values;

            firstSet.forEach(element => {
                if (!otherSet.has(element)) {
                    differenceSet.add(element);
                }
            });

            return differenceSet;
        }

        // Tests if the set is a subset of a different set
        isSubsetOf(otherSet) {
            const firstSet = this.values;
            return firstSet.every(element => otherSet.has(element));
        }
    };
})();

// Example
const setA = new VSet();
const setB = new VSet();
setA.add('A');
setB.add('A');
setB.add('B');
setB.add('C');
setB.add('D');
console.log(setA.intersection(setB).values);
console.log(setB.difference(setA).values);
console.log(setA.isSubsetOf(setB));
console.log(setB.size);