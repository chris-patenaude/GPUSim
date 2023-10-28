import CPU from "@/js/CPU"; // Adjust the import to your file structure
import Instruction from "@/js/Instruction"; // Adjust the import to your file structure

describe("CPU", () => {
  let cpu;

  beforeEach(() => {
    cpu = new CPU({
      memorySize: 256,
      registersCount: 8,
    });
    cpu.memory[0x01] = 0x05;
    cpu.memory[0x02] = 0x0a;
  });

  it("should initialize correctly", () => {
    expect(cpu.clockCycle).toBe(0);
    expect(cpu.memory.length).toBe(256);
    expect(cpu.program).toEqual([]);
    expect(cpu.registers.length).toBe(8);
    expect(cpu.currentInstructionIndex).toBe(0);
    expect(cpu.currentStage).toBe("Fetch");
  });

  it("should execute LOAD instruction correctly", () => {
    const program = [new Instruction(0x01, 0x01, 0x02)]; // LOAD Mem[0x02] into R1
    cpu.loadProgram(program);
    cpu.execute();
    expect(cpu.registers[0x01]).toBe(0x0a);
  });

  it("should execute STORE instruction correctly", () => {
    const program = [
      new Instruction(0x01, 0x01, 0x02), // LOAD Mem[0x02] into R1
      new Instruction(0x02, 0x01, 0x01), // STORE R1 into Mem[0x01]
    ];
    cpu.loadProgram(program);
    cpu.execute();
    cpu.execute();
    expect(cpu.memory[0x01]).toBe(0x0a);
  });

  it("should execute ADD instruction correctly", () => {
    const program = [
      new Instruction(0x01, 0x01, 0x01), // LOAD Mem[0x01] into R1
      new Instruction(0x01, 0x02, 0x02), // LOAD Mem[0x02] into R2
      new Instruction(0x03, 0x01, 0x02), // ADD R1 and R2 and store the result in R1
    ];
    cpu.loadProgram(program);
    cpu.execute();
    cpu.execute();
    cpu.execute();
    expect(cpu.registers[0x01]).toBe(0x0f);
  });

  it("should load a program correctly", () => {
    const program = [
      new Instruction(0x01, 0x01, 0x02),
      new Instruction(0x02, 0x01, 0x02),
    ];
    cpu.loadProgram(program);
    expect(cpu.program).toEqual(program);
  });

  it("should throw an error for a invalid program", () => {
    const program = [new Instruction(0x01, 0x01, 0x02), "invalid instruction"];
    expect(() => cpu.loadProgram(program)).toThrow("Invalid instruction");
  });

  it("should reset correctly", () => {
    cpu.clockCycle = 100;
    cpu.memory = [1, 2, 3];
    cpu.program = [1, 2, 3];
    cpu.registers = [1, 2, 3];
    cpu.currentInstructionIndex = 100;
    cpu.currentStage = "Execute";
    cpu.reset();
  });

  it("should step correctly", () => {
    const program = [
      new Instruction(0x01, 0x01, 0x02), // LOAD Mem[0x02] into R1
      new Instruction(0x02, 0x01, 0x02), // STORE R1 into Mem[0x01]
    ];
    cpu.loadProgram(program);
    cpu.step();
    expect(cpu.currentStage).toBe("Decode");
    cpu.step();
    expect(cpu.currentStage).toBe("Execute");
    cpu.step();
    expect(cpu.currentStage).toBe("Fetch");
    expect(cpu.clockCycle).toBe(3);
  });
});
