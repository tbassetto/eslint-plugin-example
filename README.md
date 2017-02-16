# eslint-plugin-example

Examples of custom rules used in my ESLint talks.

## Talks

* [BartJS](https://www.meetup.com/BartJS/events/236822901/) ([slides](https://cl.ly/1X3E2A3x3A3z)
* [Framsia](https://www.meetup.com/framsia/events/234173976/) ([slides](https://cl.ly/443J2D1G0h19)

## Test and development

It uses the same structure and same conventions as the official ESLint repository.

```
npm i
npm run lint
npm test
```

## Rules

### `prefer-q-resolve`

> disallow the use of `$q.when()`

Good example to see how to deprecate a method. The advanced version handles

### `no-jquery`

> prevent the usage of jQuery

Over-engineered rule. It comes with a simple, advanced and smarter version. But all are over the top, the real way to block jQuery is to **not have it* as a `global` to start with…

### `ng-inject`

> enforce the presence of AngularJS dependency injection annotations

Useful if you use [ng-annotate](https://github.com/olov/ng-annotate). **This rule is far from handling all use-cases**, I still advice **against** using it.

and a few more…
