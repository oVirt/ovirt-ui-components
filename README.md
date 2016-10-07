# oVirt UI Components
[![Build Status](https://travis-ci.org/matobet/ovirt-ui-components.svg?branch=master)](https://travis-ci.org/matobet/ovirt-ui-components)

Reusable components for UIs related to the [oVirt](http://ovirt.org) project.

## Usage

`npm install ovirt-ui-components`

```javascript
import { MyComponent } from 'ovirt-ui-components'

ReactDOM.render(
  <MyComponent prop1={foo} prop2={bar} />,
  document.getElementById('my-root')
)
```

## Development

To facilitate rapid development with instant feedback a *showcase* application for development
is provided in the `/showcase` directory.

`npm start` will run a `webpack-dev-server` with live reloading of
all components that serves this showcase application.

## Build

To get production build run `npm run build`. This will produce the file `ovirt-ui-components.js` containing *all*
oVirt UI Components. This file is a non-minified UMD module intended to be used in a target **host** application.

## Host Applications

The goal of this repository is to aggregate a wide range of useful components from small "dumb" components
to a large and complex dialog-style components. Due to this there are several restrictions on the context
in which these components can be used.

TODO: document host app requirements

## Samples

The `samples` directory contains various sample **host** applications created using
[create-react-app](https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html).

To run a specific sample host app just run
```bash
cd dummy-host   # or other sample
npm install
npm start
```

Please note that if you change some components and want to see this change reflected in a sample host application
you will need to re-run the production build `npm run build` in the root project and then
```bash
npm rm ovirt-ui-components
npm install ../..
```
inside the given sample host directory.
