# Manage NodeJS Enviroment Variables - Simple & Secure

#### wrapper around most popular `dotenv` package with additional security layer & centralized management of environment variables.

TODO:

- Create account on [app.envvaults.com](https://app.envvaults.com)

Add Ons:

- Install VS Code extension [Env Vaults](https://marketplace.visualstudio.com/items?itemName=omkarbhede.envvaults)

## Why to Use ?

- with **Just Two Enviroment** variables `EV_AID` & `EV_KEY` you can access all required env variables.
- **No need to Store** any env variables in your codebase or CI/CD pipeline.
- access from **Web or VS Code extension**.

## Installation

You can install this package via npm:

```bash
npm install envvaults
```

## Usage

```javascript
const envvaults = require("envvaults");

await envvaults.load();
```

### `envvaults.load()`

The `load` function fetches environment variables from the Env Vaults API and loads them into your Node.js environment using the `dotenv` package.

Requires:

1. `process.env.EV_AID` => account ID can be found in Settings on [app.envvaults.com](https://app.envvaults.com)
2. `process.env.EV_KEY` => this is secret key of vault

### Example:

```javascript
//starting point of your application
const envvaults = require("envvaults-npm-package");

async function main() {
  try {
    await envvaults.load();

    const express = require("express");
    const mongoose = require("mongoose");
    // Your application logic here
  } catch (error) {
    console.error(error);
  }
}

main();
```

## Configuration

### Environment Variables

To configure this package, you need to set the following environment variables in your `.env` file:

- `EV_AID`: Your Env Vaults Account ID.
- `EV_KEY`: Your Env Vaults API Key.

## Error Handling

- If AID or KEY is missing in the `.env` file, a warning message is logged.
- If there is an error during the HTTPS request or the response does not contain the expected data, an error message is logged.

## License

This package is licensed under the MIT License.
