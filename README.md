# advancedNetwork
 Advanced network layout based on package react-graph-vis and original library vis.js

## Differences of this development from the original react-graph-vis package:

1. An additional layout has been created, on which the title and control buttons are located.
2. The control buttons (increase the height of the network, reduce the height of the network, rotate the network, redraw the network) are created using the material-UI package.
3. The output of information about the selected network node and its dependencies is organized.
4. The options for the base vis.js library are described as detailed as possible (with comments).
5. The height of the network layout adaptively depends on the number of nodes in the network.
6. A method has been written for determining similar connections in the network (connections with the same values ​​of "from" and "to") - they are summarized into one connection, and their names are separated by commas.
7. The nodes and communications of the network are designed as friendly as possible.
8. Many minor issues that prevented the easy use of the vis.js library and the react-graph-vis package were fixed.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
