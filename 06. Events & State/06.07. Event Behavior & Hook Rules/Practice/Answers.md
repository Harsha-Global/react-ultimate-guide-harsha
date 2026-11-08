# Explained answers

## 1. B

A mutates an input; C creates a second value that can diverge. B lets the owner apply the rule and supply consistent new props.

Revisit: the Callbacks & Lifting State lecture.

## 2. C

A can identify a different item after filtering or reordering; B changes identity every render. C identifies the same item across list changes.

Revisit: the Lists & Keys lecture.

## 3. A

B calls the function while evaluating JSX; C is a string, not a function. A passes the function.

Revisit: the Event Handlers lecture.

## 4. A

Both expressions use the value from that same render and request2. B would fit two +1 updater functions; C is not the described behavior.

Revisit: the Functional State Updates lecture.

## 5. B

A duplicates information and adds synchronization work; C mutates an input and does not model a total. B expresses the dependency directly.

Revisit: the Inputs & Derived Values lecture.

## 6. B

A concerns propagation through handlers. C conflates two mechanisms. B prevents the event default when supported; it does not itself stop bubbling.

Revisit: the Event Behavior & Hook Rules lecture.
