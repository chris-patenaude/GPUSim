/**
 * Simulates a basic CPU's execution of a program, supporting a limited set of instructions for demonstration purposes.
 * @class CPUSimulator
 * @param {Object} options - Options for the CPU simulator
 * @param {number} options.memorySize - The size of the memory in bytes
 * @param {number} options.registerCount - The number of registers
 * @param {Object} options.instructionSet - The instruction set for the CPU
 * @param {Object} options.instructionSet.LOAD - The LOAD instruction
 * @param {number} options.instructionSet.LOAD.opcode - The opcode for the LOAD instruction
 * @param {Object} options.instructionSet.ADD - The ADD instruction
 * @param {number} options.instructionSet.ADD.opcode - The opcode for the ADD instruction
 * @param {Object} options.instructionSet.SUB - The SUB instruction
 * @param {number} options.instructionSet.SUB.opcode - The opcode for the SUB instruction
 * @param {Object} options.instructionSet.STORE - The STORE instruction
 * @param {number} options.instructionSet.STORE.opcode - The opcode for the STORE instruction
 */

export default class CPUSimulator {
  static INSTRUCTION_SET = {
    // Load a value into a register
    LOAD: {
      opcode: 0x01,
      cycles: 2,
    },
    // Add a value to a register
    ADD: {
      opcode: 0x02,
      cycles: 2,
    },
    // Subtract a value from a register
    SUB: {
      opcode: 0x03,
      cycles: 2,
    },
    // Multiply a register by a value
    STORE: {
      opcode: 0x04,
      cycles: 2,
    },
  };
  static MODES = {
    NORMAL: "normal", // Run the program normally
    STEP: "step", // Step through the program one instruction at a time
  };

  DEFAULT_MEMORY_SIZE = 256;
  DEFAULT_REGISTER_COUNT = 16;
  OPTION_DEFAULTS = {
    memorySize: this.DEFAULT_MEMORY_SIZE,
    registerCount: this.DEFAULT_REGISTER_COUNT,
    mode: CPUSimulator.MODES.NORMAL,
  };

  running = false;
  programCounter = 0;
  programEnd = 0;
  pause = false;

  constructor(options) {
    const { memorySize, registerCount, instructionSet, mode } = options;
    this.options = {
      ...this.OPTION_DEFAULTS,
      memorySize,
      registerCount,
      instructionSet,
      mode,
    };
    this.reset();
  }

  /**
   * Reset the CPU to its initial state
   */
  reset() {
    // Default options
    this.memory = new Uint8Array(this.options.memorySize);
    this.registers = new Uint8Array(this.options.registerCount);
    this.programCounter = 0;
    this.pause = false;
    this.running = false;
  }

  /**
   *  Execute an instruction
   * @param instruction
   * @param operand1
   * @param operand2
   * @returns {number} - The number of cycles required to execute the instruction
   */
  executeInstruction(instruction, operand1, operand2) {
    let cycleCount = 1;
    switch (instruction) {
      case CPUSimulator.INSTRUCTION_SET.LOAD.opcode:
        this.registers[operand1] = operand2;
        cycleCount = CPUSimulator.INSTRUCTION_SET.LOAD.cycles;
        break;
      case CPUSimulator.INSTRUCTION_SET.ADD.opcode:
        this.registers[operand1] += operand2;
        cycleCount = CPUSimulator.INSTRUCTION_SET.ADD.cycles;
        break;
      case CPUSimulator.INSTRUCTION_SET.SUB.opcode:
        this.registers[operand1] -= operand2;
        cycleCount = CPUSimulator.INSTRUCTION_SET.SUB.cycles;
        break;
      case CPUSimulator.INSTRUCTION_SET.STORE.opcode:
        this.memory[operand1] = this.registers[operand2];
        cycleCount = CPUSimulator.INSTRUCTION_SET.STORE.cycles;
        break;
      default:
        throw new Error(`Invalid instruction: ${instruction}`);
    }
    return cycleCount;
  }

  /**
   * Run the CPU
   */
  run() {
    if (this.memory.length === 0) {
      throw new Error("No program loaded");
    }
    this.running = true;
    while (this.running && !this.pause) {
      if (this.programCounter >= this.programEnd) this.stop();
      this.step();
      if (this.options.mode === CPUSimulator.MODES.STEP) this.pauseExecution();
    }
  }

  /**
   * Pause the CPU
   */
  pauseExecution() {
    this.pause = true;
  }

  /**
   * Fetch the next instruction from memory
   * @returns {{operand1: *, operand2: *, instruction: *, cycleCount: number}}
   */
  fetchInstruction() {
    const cycleCount = 1;
    const instruction = this.memory[this.programCounter];
    const operand1 = this.memory[this.programCounter + 1];
    const operand2 = this.memory[this.programCounter + 2];
    return { instruction, operand1, operand2, cycleCount };
  }

  /**
   * Stop the CPU
   */
  stop() {
    this.running = false;
  }

  /**
   * Load a program into memory
   * @param program
   * @param {Uint8Array} program - The program to load into memory
   * @returns {void}
   */
  loadProgram(program) {
    if (program.length > this.memory.length) {
      throw new Error("Program is too large for memory");
    }
    this.programEnd = program.length;
    this.memory.set(program);
  }

  /**
   * Execute the next instruction
   */
  step() {
    const { instruction, operand1, operand2, cycleCount } =
      this.fetchInstruction();
    const instructionCycleCount = this.executeInstruction(
      instruction,
      operand1,
      operand2
    );
    this.programCounter += cycleCount + instructionCycleCount;
  }
}
