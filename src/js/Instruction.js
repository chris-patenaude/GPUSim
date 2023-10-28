export default class Instruction {
  constructor(opcode, operand1, operand2) {
    Instruction.validate({
      opcode,
      operand1,
      operand2,
    });
    this.opcode = opcode; // e.g., 0x01 for LOAD, 0x02 for ADD, etc.
    this.operand1 = operand1; // e.g., immediate value for LOAD, register index for ADD, etc.
    this.operand2 = operand2; // e.g., register index for LOAD, register index for ADD, etc. (optional)
  }

  // Validate the instruction
  static validate(instruction) {
    // Check that the opcode is a valid number
    if (
      typeof instruction.opcode !== "number" ||
      instruction.opcode < 1 ||
      instruction.opcode > 255
    ) {
      throw new Error(`Invalid opcode: ${instruction.opcode}`);
    }
    // Check that the operands are valid numbers
    if (
      typeof instruction.operand1 !== "number" ||
      instruction.operand1 < 0 ||
      instruction.operand1 > 255
    ) {
      throw new Error(`Invalid operand1: ${instruction.operand1}`);
    }
    if (
      typeof instruction.operand2 !== "number" ||
      instruction.operand2 < 0 ||
      instruction.operand2 > 255
    ) {
      throw new Error(`Invalid operand2: ${instruction.operand2}`);
    }
  }
}
