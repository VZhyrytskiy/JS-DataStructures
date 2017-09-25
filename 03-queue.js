const Queue = (() => {

    const priv = new WeakMap();
    const _ = instance => priv.get(instance);

    return class Queue {
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
            _(this).collection.push(element);
            return this;
        }

        // Gets and Removes an element from the queue
        dequeue() {
            return _(this).collection.shift();
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
const q = new Queue();
q.enqueue(1);
q.enqueue(2).enqueue(3);
q.enqueue(4);
q.print();
q.dequeue();
console.log(q.front());
q.print();
console.log(q.size);