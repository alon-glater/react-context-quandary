# React Context Quandary

Made to answer the question: does a React Context update cause a render in all its child components?

## Run the project

To run the project, simply run:

- `npm install`
- `npm run dev`

## What this showcases

In the project is a context provider which holds a simple counter and two functions that update the counter.

Nested within the context provider are two sibling components: a `Counter`, which displays the counter value,
and a `RenderCounter`, which simply keeps track of how many times it had been rendered.

You can see that when you update the counter via the buttons provided, the `RenderCounter` does not change (it can also be seen in the console,
as each component logs in the console every time it is rendered).

~~It goes to prove that updates in a React Context only cause the consumers to re-render, while leaving the rest of the provider's children untouched.~~

This does not happen automatically, like was initially surmised, but rather what happened was as such:
When the (component wrapping the) context provider holds some state and its children consume said state, whenever the state changes React forces all children to re-render -- not only the consumers.

In order to ensure that only the consumers were re-rendered, a pub/sub pattern needed to be employed, where each subscriber (consumer) held its own state, thereby ensuring that only _it_ re-renders when the state changes.

They all pass their `setState` function to the publisher (provider) so that whenever any one of them changes the contextual state (counter), the publisher publishes the updated state using the `setState` function for all subscribers.
