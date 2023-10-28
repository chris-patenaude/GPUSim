import Instruction from "./Instruction";
export default class CPU {
  static INSTRUCTION_SET = {
    LOAD: 0x01,
    STORE: 0x02,
    ADD: 0x03,
    SUB: 0x04,
    HALT: 0xff,
  };
  constructor({ program, memorySize, registersCount }) {
    if (isNaN(memorySize) || memorySize < 0) {
      throw new Error("Invalid memory size");
    }
    if (isNaN(registersCount) || registersCount < 0) {
      throw new Error("Invalid registers count");
    }
    program = program || [];
    CPU.validateProgram(program);
    this.clockCycle = 0;
    this.memory = new Array(memorySize);
    this.program = program;
    this.registers = new Array(registersCount);
    this.currentInstructionIndex = 0;
    this.currentStage = "Fetch";
  }

  // Method to advance to the next clock cycle
  step() {
    switch (this.currentStage) {
      case "Fetch":
        this.currentStage = "Decode";
        break;
      case "Decode":
        this.currentStage = "Execute";
        break;
      case "Execute":
        this.execute();
        this.currentStage = "Fetch";
        break;
    }
    this.clockCycle++;
  }

  loadProgram(program) {
    CPU.validateProgram(program);
    this.program = program;
    this.currentInstructionIndex = 0;
  }

  reset() {
    this.clockCycle = 0;
    this.memory = new Array(this.memory.length);
    this.registers = new Array(this.registers.length);
    this.currentInstructionIndex = 0;
    this.currentStage = "Fetch";
  }

  static validateProgram(program) {
    // Check that the program is an array
    if (!Array.isArray(program)) {
      throw new Error("Invalid program");
    }
    // Check that each instruction is valid
    program.forEach((instruction) => {
      if (!(instruction instanceof Instruction)) {
        throw new Error("Invalid instruction");
      }
    });
  }

  execute() {
    // Simulate executing the current instruction
    const instruction = this.program[this.currentInstructionIndex];
    switch (instruction.opcode) {
      case CPU.INSTRUCTION_SET.LOAD:
        this.registers[instruction.operand1] =
          this.memory[instruction.operand2];
        break;
      case CPU.INSTRUCTION_SET.STORE:
        this.memory[instruction.operand2] =
          this.registers[instruction.operand1];
        break;
      case CPU.INSTRUCTION_SET.ADD:
        this.registers[instruction.operand1] +=
          this.registers[instruction.operand2];
        break;
      case CPU.INSTRUCTION_SET.SUB:
        this.registers[instruction.operand1] -=
          this.registers[instruction.operand2];
        break;
      case CPU.INSTRUCTION_SET.HALT:
        this.currentInstructionIndex = this.program.length;
        break;
      default:
        throw new Error(`Invalid opcode: ${instruction.opcode}`);
    }
    this.currentInstructionIndex++;
  }
}
