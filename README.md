# get-option-tests

get-option-tests automatically creates Mocha tests for option objects.

## Installation

```shell
$ npm install get-option-tests
```

## Quick start

First you need to integrate get-option-tests into your application:

```javascript
const getOptionTests = require('get-option-tests');
```

Then you can use the `getOptionTests` function to automatically create Mocha tests from within your test suite. Supposed you have a function `add` to add two numbers:

```javascript
const add = function ({ left, right }) {
  return left + right;
};
```

To automatically create option tests, write your test suite as follows, and provide a fully specified options object as well as a function that calls the function under test:

```javascript
suite('add', () => {
  test('is a function.', async () => {
    assert.that(add).is.ofType('function');
  });

  getOptionTests({
    options: { left: 23, right: 42 },
    run (options) {
      add(options);
    }
  });

  test('...', async () => {
    // ...
  });
});
```

Now, `getOptionTests` will automatically create the following tests for you:

```javascript
test('throws an error if left is missing.', async () => {
  assert.that(() => {
    add({ right: 42 });
  }).is.throwing('Left is missing.');
});

test('throws an error if right is missing.', async () => {
  assert.that(() => {
    add({ left: 23 });
  }).is.throwing('Right is missing.');
});
```

This also works for nested options, and also for `async` functions.

### Excluding options

If, for some reason, you don't want to test specific parts of the options object, use the `excludes` property to tell for which properties no tests should be created.

E.g., if you would want to ignore the `right` property from the previous example, you could use the following code:

```javascript
getOptionTests({
  options: { left: 23, right: 42 },
  excludes: [ 'right' ]
  run (options) {
    add(options);
  }
});
```

For nested properties, use the `.` syntax. Additionally, the `*` character is supported as a wildcard for properties. For details see [flat-object-keys](https://www.npmjs.com/package/flat-object-keys).

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```

## License

The MIT License (MIT)
Copyright (c) 2019 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
