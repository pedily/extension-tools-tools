# extension-tools-tools

## Goals

### Project Initialization
- As a User, I want to get started writing my extension code with the least amount of delay
 - I don't want to be required to provide an icon file
 - If I have an icon, I don't want to format it manually (it should be auto-converted to the required format) 

### Friction Reduction
- As a User, I don't want to run multiple scripts to transpile and then zip my package
- As a User, I want a builtin script to "deploy my extension" to an environment so I don't have to manually upload it through the UI

### Tooling
- As a User, I want to have an `execute(descriptor, nodeConfig, { input, context, profile })` function that helps with testing
```
