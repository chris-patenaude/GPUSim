# CPUSim

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
    - [Minimum Viable Product (MVP)](#minimum-viable-product-mvp)
    - [Future Enhancements](#future-enhancements)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Accessibility](#accessibility)
- [Professional Coding Standards](#professional-coding-standards)
- [Testing](#testing)
- [Timeline](#timeline)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This web application aims to simulate the behavior and functionality of a computer CPU. The project seeks to visually represent various elements of a processor, such as the ALU, registers, and memory, to educate users on how a CPU operates.

### Acknowledgements
- The Vue CLI was used to generate the initial project structure.
- ChatGPT was used in the bootstrapping and troubleshooting of this application. 

## Features

### Minimum Viable Product (MVP)

1. **Processor Visualization**
    - Display basic components like the ALU, registers, and memory.
    - Visually represent data flow through the processor.

2. **Step-by-Step Execution**
    - Allow users to step through the operation of the CPU, seeing how data moves from one component to another.

3. **Instruction Set**
    - Support a small set of assembly language instructions for demonstration (e.g., ADD, SUB, LOAD, STORE).

### Future Enhancements

1. **Advanced Processor Models**
    - Implement more complex CPU models with additional features like pipelines, caches, etc.

2. **Performance Metrics**
    - Measure and display performance metrics such as clock cycles, MIPS, etc.

3. **Code Editor**
    - Allow users to input their own assembly code for execution.

4. **Save and Load Functionality**
    - Allow users to save their progress or load previous states.

## Technologies

- Front-end Framework: Vue.js
- UI Library: Bootstrap 5
- State Management: Vuex (if needed)
- Testing: Jest for unit tests, Cypress for end-to-end tests
- Version Control: Git

## Architecture

- Vue Components
    - Main App Component: Wrapper for the entire application.
    - CPU Visualization Component: Handles the rendering of the CPU elements.
    - Control Panel Component: Houses buttons for step-through and reset functionality.

- Vuex Store (If needed)
    - To manage the global state of the CPU: register values, memory values, etc.

- Service Layer
    - CPU Simulation Service: Handles the logic for simulating the CPU's behavior.

- Utility Functions
    - Various utility functions to support the simulation logic, data transformations, etc.

## Installation

// Installation steps will go here

## Usage

// Usage guidelines will go here

## Accessibility

All elements will be accessible, following ARIA guidelines.

## Professional Coding Standards

Code will adhere to ESLint rules and Vue's best practices. Components and functions will be properly documented using JSDoc.

## Testing

- Unit tests for individual components and utility functions.
- End-to-end tests to validate the overall functionality.

## Timeline

- Week 1-2: Project setup, including Vue and other necessary libraries.
- Week 3-4: Build the CPU Visualization component.
- Week 5-6: Implement the CPU Simulation Service and logic.
- Week 7: Build the Control Panel and link it to the simulation logic.
- Week 8: Implement the Instruction Set and User Manual.
- Week 9-10: Testing, debugging, and performance tuning.

## Contributing

// Contribution guidelines will go here

## License

// Licensing information will go here
