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
