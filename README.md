# SIFIS
SIFIS (Simple Interface For Isolated System) is a versatile class for controlled data manipulation and action execution

The `Interface` class provides a versatile interface for manipulating data and executing actions in a controlled environment. It allows users to perform actions like variable assignment, function invocation, and printing variable values. The class is designed to be flexible, making use of dependency injection to enable custom data storage mechanisms.

## Table of Contents

1. [Introduction](#introduction)
2. [Constructor](#constructor)
3. [Methods](#methods)
   - [performAction](#performaction)
   - [performActions](#performactions)
   - [evaluateContent](#evaluatecontent)
   - [assignToIdentifier](#assigntoidentifier)
   - [getIdentfier](#getidentfier)
   - [invokeFunction](#invokefunction)
   - [printVariable](#printvariable)
4. [Usage Examples](#usage-examples)

## Introduction

The `Interface` class is designed to simplify the process of managing and interacting with data within a controlled environment. It provides methods for executing various actions, such as assigning values to variables, invoking functions, and printing variable contents. The class supports dependency injection for custom data storage mechanisms.
Certainly! The `Interface` class acts as a bridge or coupling point between different user interfaces (UIs) and the core system [[Engine Classes Development]]. It serves as an intermediary that allows actions to be executed from different UIs while providing a level of baseline security.

### Role as a Coupling:

1. **Abstraction Layer:** The `Interface` class abstracts the underlying complexity of the core system. UIs don't need to directly interact with the internal mechanisms of the system; they communicate with the `Interface` class, which translates UI requests into system actions.

2. **UI Agnostic:** The `Interface` class doesn't depend on the specifics of any particular UI. It accepts actions in a standardized format, making it suitable for various UI types such as web interfaces, command-line interfaces (CLIs), or even future UI enhancements.

3. **Standardized Communication:** UIs communicate with the `Interface` class using the defined action format. This ensures a consistent way of interacting with the core system regardless of the UI being used.

### Handling Actions from Different UIs:

1. **Action Formatting:** UIs construct action objects according to the specified format (e.g., `action`, `identifier`, `content`, etc.) when interacting with the `Interface`.

2. **Action Execution:** The `Interface` class processes incoming actions using its defined methods (`performAction`, `performActions`, etc.). This allows different UIs to execute actions uniformly.

### Providing Baseline Security:

1. **Encapsulation:** UIs interact with the `Interface` class, which encapsulates and controls access to the core system's functionality. This encapsulation limits direct exposure of internal mechanisms, adding a layer of security.

2. **Controlled Execution:** The `Interface` class validates and processes actions before executing them. This control prevents unauthorized or unintended actions from being performed.

3. **Data Sanitization:** The class evaluates action content and parameters to ensure they're appropriate for the operation. This helps prevent injection attacks or unintended data manipulation.

4. **Limited Direct Access:** By using the `Interface` class as the only access point to the system's core functionality, you reduce the potential attack surface. Unauthorized entities can't directly manipulate the core system.

5. **Error Handling:** The `Interface` class can handle errors gracefully, preventing crashes or data corruption. It ensures a more stable and secure user experience.

### UI Interface Example:

Consider a web application and a CLI that both need to interact with the core system:

1. **Web Interface:**

   - The web interface constructs action objects according to the defined format and sends them to the server.
   - The server, which hosts the `Interface` class, processes the actions, executes them securely, and returns the results to the web interface.
   - The web interface doesn't need to understand the intricacies of the system; it relies on the `Interface` for safe execution.

2. **Command-Line Interface (CLI):**

   - The CLI constructs action objects and passes them to the local `Interface` instance.
   - The `Interface` instance validates and executes the actions, ensuring secure and controlled interaction.
   - Users of the CLI can perform actions on the system without directly interacting with its core components.

In both cases, the `Interface` class acts as a secure and standardized bridge between different UIs and the core system. It handles different UI requirements while maintaining a controlled and secure interaction model.

Remember that while the `Interface` class provides baseline security, other layers of security, such as user authentication and authorization, may be necessary depending on your system's requirements.


## Constructor

### `constructor(dataStorage?: object)`

- Initializes an instance of the `Interface` class.
- Optionally takes a `dataStorage` object to serve as the data storage mechanism. If not provided, an empty object is used as the default data storage.

## Methods

### `performAction(action: object): void`

Executes a single action based on the provided action object.

- `action` (object): The action object containing information about the action to perform.

### `performActions(actionsArray: object[]): void`

Executes a series of actions.

- `actionsArray` (array of objects): An array of action objects to perform.

### `evaluateContent(content: object): any`

Evaluates the content of an action to determine its value.

- `content` (object): The content object to evaluate.

### `assignToIdentifier(identifierArray: string[], value: any): void`

Assigns a value to the specified identifier.

- `identifierArray` (array of strings): An array of identifier parts representing the target variable.
- `value` (any): The value to assign to the identifier.

### `getIdentfier(identifierArray: string[]): any`

Retrieves the value associated with a given identifier.

- `identifierArray` (array of strings): An array of identifier parts representing the target variable.

### `invokeFunction(identifierArray: string[], parameterArray: any[]): void`

Invokes a function identified by the provided identifier.

- `identifierArray` (array of strings): An array of identifier parts representing the target function.
- `parameterArray` (array of any): An array of parameters to pass to the function.

### `printVariable(varIdentifier: string): void`

Prints the value of a variable.

- `varIdentifier` (string): The identifier of the variable to print.

## Usage Examples

To use SIFIS in your project, follow these steps:

1. Clone the SIFIS repository.
2. Include the Interface class in your project.
3. Instantiate the Interface class and provide a data storage mechanism if needed.
4. Begin interacting with the isolated system through the performAction, performActions, and other methods.

### Creating and Assigning a Variable

```javascript
const dataStorage = {};
const interfaceInstance = new Interface(dataStorage);

const assignCommand = {
  action: 'ASSIGN',
  identifier: ['count'],
  content: 10
};

interfaceInstance.performAction(assignCommand);
console.log(dataStorage.count); // Output: 10
```

### Creating an Object and Assigning to a Variable

```javascript
const dataStorage = {};
const interfaceInstance = new Interface(dataStorage);

const assignObjectCommand = {
  action: 'ASSIGN',
  identifier: ['person'],
  content: {
    action: 'NEW',
    objectClass: 'Person',
    parameters: ['John', 30]
  }
};

interfaceInstance.performAction(assignObjectCommand);
console.log(dataStorage.person); // Output: { name: 'John', age: 30 }
```

### Calling a Function

```javascript
const dataStorage = {
  printMessage: message => console.log(message)
};
const interfaceInstance = new Interface(dataStorage);

const callCommand = {
  action: 'CALL',
  identifier: ['printMessage'],
  parameters: ['Hello, World!']
};

interfaceInstance.performAction(callCommand); // Output: Hello, World!
```

### Assigning Value of One Variable to Another Variable

```javascript
const dataStorage = {
  var1: 42
};
const interfaceInstance = new Interface(dataStorage);

const assignVarCommand = {
  action: 'ASSIGN',
  identifier: ['var2'],
  content: {
    identifier: ['var1']
  }
};

interfaceInstance.performAction(assignVarCommand);
console.log(dataStorage.var2); // Output: 42
```

### Printing Variable Value

```javascript
const dataStorage = {
  myVar: { name: 'Alice', age: 25 }
};
const interfaceInstance = new Interface(dataStorage);

const printCommand = {
  action: 'PRINT',
  identifier: ['myVar']
};

interfaceInstance.performAction(printCommand); // Output: {"name":"Alice","age":25}
```

