---
title: Testing class-style Vue.js components with Mocha and TypeScript
author: Brady
permalink: /test-vuejs-with-mocha-typescript/
---

While working on my [Koa / Vue.js SPA Template](https://www.geekytidbits.com/koa-vue-template/), I had a bit of trouble testing my [class-style](https://github.com/vuejs/vue-class-component) Vue.js components with Mocha. I eventually figured it out but there were quite a few moving pieces and it felt messy. So, I worked to simplify the process and eventually came up with a pattern I am quite happy with. I extracted the pattern into a standalone repository called [vuejs-test-mocha-typescript-example](https://github.com/bradymholt/vuejs-test-mocha-typescript-example).

The [Unit Testing guide](https://vuejs.org/v2/guide/unit-testing.html) for Vue.js does an excellent job explaining how to test components but if you are utilitizing vue-class-component decorators to use class-style components, testing does require a slightly different setup. Additionally, if you use single file components you need to run the components through webpack before testing with Mocha. And, if you want to run the tests from Node rather than a browser (via something like Karma), you need to mock the DOM for Vue.

This pattern uses [jsdom](https://github.com/tmpvar/jsdom) to mock the browser DOM from within the Node environment and then [mocha-webpack](https://github.com/zinserjan/mocha-webpack) to run the Vue single file components through webpack _on-the-fly_ during a test run.

In the repository, there is an example unit test for the `HelloWorld` component, defined as:

```js
describe("HelloWorld", () => {
  // Inspect the component instance on mount
  it("correctly sets the foobar value when created", () => {
    let foobar = "fooboo";
    const ctor = Vue.extend(HelloWorld);
    const vm: any = new ctor({ propsData: { foobar } }).$mount();

    assert.equal(vm.foobar, foobar);
    assert.include(vm.$el.textContent, `value specified of ${foobar}`);
  });
});
```

Running `npm test` will run the test suite and print the results.

I am happy with this setup and will be using it for my Vue.js projects going forward.

The example code repository is located here: [https://github.com/bradymholt/vuejs-test-mocha-typescript-example](https://github.com/bradymholt/vuejs-test-mocha-typescript-example).
