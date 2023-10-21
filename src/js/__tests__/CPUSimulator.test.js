import CPUSimulator from "@/js/CPUSimulator"; // Adjust the import to your file structure

describe("CPUSimulator", () => {
  let cpu;

  beforeEach(() => {
    cpu = new CPUSimulator({
      memorySize: 256,
      registerCount: 16,
    });
  });

  it("should initialize with default settings", () => {
    expect(cpu.memory.length).toBe(256);
    expect(cpu.registers.length).toBe(16);
    expect(cpu.programCounter).toBe(0);
    expect(cpu.running).toBe(false);
  });

  it("should execute LOAD instruction correctly", () => {
    const cycles = cpu.executeInstruction(
      CPUSimulator.INSTRUCTION_SET.LOAD.opcode,
      0,
      42
    );
    expect(cpu.registers[0]).toBe(42);
    expect(cycles).toBe(2);
  });

  it("should execute ADD instruction correctly", () => {
    cpu.registers[0] = 20;
    const cycles = cpu.executeInstruction(
      CPUSimulator.INSTRUCTION_SET.ADD.opcode,
      0,
      22
    );
    expect(cpu.registers[0]).toBe(42);
    expect(cycles).toBe(2);
  });

  it("should execute SUB instruction correctly", () => {
    cpu.registers[0] = 50;
    const cycles = cpu.executeInstruction(
      CPUSimulator.INSTRUCTION_SET.SUB.opcode,
      0,
      8
    );
    expect(cpu.registers[0]).toBe(42);
    expect(cycles).toBe(2);
  });

  it("should execute STORE instruction correctly", () => {
    cpu.registers[0] = 42;
    const cycles = cpu.executeInstruction(
      CPUSimulator.INSTRUCTION_SET.STORE.opcode,
      5,
      0
    );
    expect(cpu.memory[5]).toBe(42);
    expect(cycles).toBe(2);
  });

  it("should throw an error for invalid instruction", () => {
    expect(() => {
      cpu.executeInstruction(0xff, 0, 0);
    }).toThrow("Invalid instruction: 255");
  });

  it("should load a program into memory", () => {
    const program = new Uint8Array([0x01, 0x00, 0x2a, 0x02, 0x00, 0x02]);
    cpu.loadProgram(program);
    expect(cpu.memory.subarray(0, program.length)).toEqual(program);
  });

  it("should throw an error when program size exceeds memory", () => {
    const largeProgram = new Uint8Array(300);
    expect(() => {
      cpu.loadProgram(largeProgram);
    }).toThrow("Program is too large for memory");
  });

  it("should stop running when stop method is called", () => {
    // Opcode for LOAD is 0x01, for ADD is 0x02
    // LOAD 42 into register 0: [0x01, 0x00, 0x2A]
    // ADD 8 to register 0: [0x02, 0x00, 0x08]
    const program = new Uint8Array([0x01, 0x00, 0x2a, 0x02, 0x00, 0x08]);
    cpu.options.mode = CPUSimulator.MODES.STEP;
    cpu.loadProgram(program);
    cpu.run();
    expect(cpu.running).toBe(true);
    cpu.stop();
    expect(cpu.running).toBe(false);
  });

  // Add more tests as needed to cover the methods like fetchInstruction and run
});
