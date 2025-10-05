
<img width="100%" height="240" src="public/cassette-ljas-ui.svg" alt="@la-jarre-a-son/ui logo">

# @la-jarre-a-son/ui

[@LJAS/UI](https://github.com/la-jarre-a-son/ui) is a custom-made frontend interface library to easily build apps with the *Jar* design.

It is focused on extensibility, flexibility, accessibility and simplicity. It allows all projects in the *Jar* ecosystem to use exclusively generic components from this library, to help focusing on developing features instead of losing time maintaining external dependencies and assembling components with different code flavours.

## Themes

*@LJAS/UI* is theoretically able to implement multiple themes, but right now, only one is available.

The `jar` theme is designed to be subtly colorful, dark by default, and thoughtfully spaced so that every interactive element is large enough — about the size of an index finger — for comfortable use on touch screens.

*NOTE: Theming is still a work in progress*

## Storybook

See [@LJAS/UI - Storybook](https://la-jarre-a-son.github.io/ui).

## NPM usage

You can install this package through **Github Packages**, which requires to authenticate with the Github NPM registry. See [Github - Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)

Add this line to the `.npmrc`:
```
@la-jarre-a-son:registry=https://npm.pkg.github.com/
```

You can then install the distributed package:
```sh
npm install @la-jarre-a-son/ui
```

## CLI usage

Storybook:

```sh
npm start
```

Testing

```sh
npm test
```

Building

```sh
npm run build
```

## Contributing / License

*@LJAS/UI* is unfortunately not open to external contributions, and is not open to external use. You may use it for personal projects eventually.

See [LICENSE](./LICENSE)