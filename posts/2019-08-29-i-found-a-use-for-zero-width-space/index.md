---
title: "I found a use for a zero-width space"
---

![Zero-width space](zero-width.png#block#center)

You know about [zero-width spaces](https://en.wikipedia.org/wiki/Zero-width_space) right?  It's an invisible character that seems not so useful at first glace.
Most of my experience with them has been negative because they usually show up in a random file I'm parsing and it is the cause of a bizarre bug. Or, it's been the cause of a copy/paste search that yields no results even though there are matches sitting in front of my eyes.

Well, despite my apathy for them, I actually found a good use for them.

I've recently been building out [xertz](https://github.com/bradymholt/xertz), a static site generator written in TypeScript.  It's being used to build this here site.  Something that had been bugging me was the indentation of the rendered HTML.  I use Handlebar.js templates and include raw HTML which has been converted from Markdown.  My templates looks something like the following, where `{{ content_html }}` is the raw HTML bit:


```html
<body>
  {{> header }}
  {{> sidebar }}
  <article class="post">
    {{{ content_html }}}
  </article>
  {{> footer }}
</body>
```

The problem is, newlines in `{{ content_html }}` do not get indented so the actual output looks something like this:

```html
<body>
  <header>My Site</header>
  <aside>Sidebar here</aside>
  <article class="post">
    <p>Lorem ipsum dolor sit amet, usu an justo deterruisset. Est ad discere nominati,
erroribus dissentias mei ne, appetere qualisque eloquentiam sea et.</p><img alt="An image" src="my-image.jpg"/><p>Lorem ipsum
dolor sit amet, usu an justo deterruisset. Est ad discere nominati</p>
  </article>
  <footer>My footer</footer>
</body>
```

That's a simple example.  In practice it's much worse.  Yes, this has no effect on the actual layout and rendering of the webpage
but I'm a developer and care about the source and what it looks like.

I tried to create a Handlebars helper called "indent" so I could indent each newline.  I called it like this:

```html
...
<article class="post">
  {{{ indent content_html 2 }}}
</article>
...
```

The helper is pretty simple.  It just replaces newlines (\n) with a newline followed by a number of spaces:

```javascript
function indent(input: string, width: number) {
  const intendation = input.replace(/\n/g, "\n" + new Array(width).join(" "));
  return input.replace(/\n/g, match => match.replace(/\n/, `\n${intendation}`)
}
```

That worked pretty well untill my `<pre>` code blocks started looking like this:

```
const my_var;
    const another_var;
```

The HTML looked like this:

```html
<body>
  <header>My Site</header>
  <aside>Sidebar here</aside>
  <article class="post">
    <p>Below is a code block</p><pre>const my_var;
    const another_var;</pre><p>Lorem ipsum dolor sit amet, usu an justo deterruisset. Est ad discere nominati,
    dissentias mei ne</p>
  </article>
  <footer>My footer</footer>
</body>
```

Uh oh, I'm getting indentation in my code blocks.  Yes, since my code blocks are using `<pre>` any spaces inside of them will be rendered as is. `<pre>` means "preformatted" after all.

So then I thought I needed _hint_ to signal to the **indent** helper to skip indentation in these `<pre>` tags.

Adding hints in the `<pre>` tags seemed feasible because I use [Prism](https://prismjs.com/) with [Marked](https://github.com/markedjs/marked) to convert Markdown code blocks like:

    ```javascript
    const my_var = "Hello";
    ```

into `<pre>` blocks.  It's quite easy to modify the output of these tags because you provide a function that returns something like this:

```javascript
return `<pre class="${className}"><code class="${className}">${code}</code></pre>`;
```

Easy to modify, yes.  I thought, "can I add some character(s) to end of `<pre>` tags lines that my indent helper could skip?"  But since I'm using Regex to add the indentation in my **indent** helper, I can only use a single character to be able to include a negated character (e.g. **[^!]**) in my RegEx without having to do a negative look-behind (Javascript doesn't support these anyway).

Ok, so, I just need Prism to add a single character that will not be visible to the end of lines that are inside of `<pre>` blocks.  Then my **indent** helper can ignore these.  How do I do this?

Zero-width spaces, of course!

Now, my code formatting function preceeds newlines in my code blocks with a zero-width space.  It looks like this:

```javascript
const codeWithNewlineHints = code.replace(
  /\n/g,
  // Prepend each newline with a zero-width space character so we can signal to any upstream formatting to leave the formatted code alone.
  "\u200b\n"
);

return `<pre class="${className}"><code class="${className}">${codeWithNewlineHints}</code></pre>`;
```

In my **indent** helper, I simply ignore lines containing these characters preceding a newline.

```javascript
const intendation = input.replace(/\n/g, "\n" + new Array(width).join(" "));
return input.replace(/\n/g, match => match.replace(/[^\u200b]\n/, `\n${intendation}`)
```

See that RegEx there?  `/[^\u200b]\n/` means only match newlines if they are _not_ preceded by a zero-width character (\u200b).  So, with this, indentation will only be added to lines not preceeded by these characters.

I've gained a newfound respect zero-width spaces.
