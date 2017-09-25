const PriorityQueue = (() => {

    const priv = new WeakMap();
    const _ = instance => priv.get(instance);

    return class PriorityQueue {
        constructor() {
            const privateMembers = {
                collection: []
            };
            priv.set(this, privateMembers);
        }

        // Prints queue to the console
        print() {
            console.log(_(this).collection);
            return this;
        }

        // Adds an element to the queue
        enqueue(element) {
            if (this.isEmpty()) {
                _(this).collection.push(element);
            } else {
                let added = false;
                for (let i = 0, l = _(this).collection.length; i < l; i++) {
                    // checking peiorities
                    if (element[1] < _(this).collection[i][1]) {
                        _(this).collection.splice(i, 0, element);
                        added = true;
                        break;
                    }
                }

                if (!added) {
                    _(this).collection.push(element);
                }
            }

            return this;
        }

        // Gets and Removes an element from the queue
        dequeue() {
            const value = _(this).collection.shift();
            return value[0];
        }

        // Gets the first element from the queue without removing it
        front() {
            return _(this).collection[0];
        }

        // Checks whether the queue is empty
        isEmpty() {
            return _(this).collection.length === 0;
        }

        // Returns the number of elements in the queue
        get size() {
            return _(this).collection.length;
        }
    }
})();

// Example
const pq = new PriorityQueue();
pq.enqueue(['Anna', 2]);
pq.enqueue(['Boris', 3]).enqueue(['Carina', 1]);
pq.enqueue(['Danylo', 4]);
pq.print();
pq.dequeue();
console.log(pq.front());
pq.print();
console.log(pq.size);