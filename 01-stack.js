const Stack = (() => {

    const priv = new WeakMap();
    const _ = instance => priv.get(instance);

    return class Stack {
        constructor() {
            const privateMembers = {
                count: 0,
                storage: {}
            };
            priv.set(this, privateMembers);
        }

        // Adds a value(s) onto the end of the stack
        push(...value) {
            value.forEach(val => {
                _(this).storage[_(this).count] = val;
                _(this).count++;
            });

            // Returns stack instance
            return this;
        }

        // Removes and returns the vaue at the end of the stack
        pop() {
            if (_(this).count === 0) {
                return undefined;
            }

            _(this).count--;
            const result = _(this).storage[_(this).count];
            delete _(this).storage[_(this).count];
            return result;
        }

        get size() {
            return _(this).count;
        }

        // Returns the value at the end of the stack
        peek() {
            return _(this).storage[_(this).count - 1];
        }
    };
})();


// Example
const stack = new Stack();
stack.push('A');
stack.push('B');
console.log(stack.size);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.peek());

stack.push('C').push('D');
stack.push('E', 'F');
console.log(stack.size);
console.log(stack.peek());
console.log(stack.pop());
