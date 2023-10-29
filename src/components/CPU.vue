<!--
CPU Architecture
To implement this in hardware, you would typically have the following components:

Program Counter (PC): Holds the index of the next instruction to fetch.
Instruction Register (IR): Temporarily stores the fetched instruction.
Control Unit: Decodes the instruction and sets the control signals.
ALU (Arithmetic Logic Unit): Performs arithmetic and logic operations.
Register File: An array of registers, similar to your this.registers array.
Memory Unit: Your simulated this.memory would be represented here.
Clock: To synchronize the operations, just like your this.clockCycle.

Data path:
Fetch:
PC -> Memory Address
Memory Data -> IR
PC Increment
Decode:
IR Opcode -> Control Unit
Control Signals set
Execute:
Register File and ALU get inputs based on Control Unit
ALU performs the operation
Result stored back into Register File or Memory
Control Signals
These signals would be set by the Control Unit based on the Opcode.

LOAD:
Enable Memory Read
Write to Register File
STORE:
Enable Memory Write
ADD:
Enable ALU Add operation
Write to Register File
SUB:
Enable ALU Subtract operation
Write to Register File
HALT:
Stop Clock or set a termination flag
Visualization
Given your expertise in UI/UX and Data Visualization, you could create a compelling UI to visualize this CPU architecture. A real-time graphical representation could show:

The flow of data between components
The state of the Register File and Memory Unit
Control signals changing in real-time
-->

<template>
  <div ref="container"></div>
</template>

<script>
import Konva from "konva";

export default {
  name: "CPUArchitectureView",
  mounted() {
    this.initKonva();
  },
  methods: {
    initKonva() {
      const stage = new Konva.Stage({
        container: this.$refs.container,
        width: 800,
        height: 600,
      });

      const layer = new Konva.Layer();
      stage.add(layer);

      // Program Counter
      const programCounter = new Konva.Rect({
        x: 20,
        y: 20,
        width: 100,
        height: 50,
        fill: "blue",
        stroke: "black",
        strokeWidth: 2,
      });
      programCounter.on("mouseover", function () {
        this.fill("lightblue");
        layer.draw();
      });
      programCounter.on("mouseout", function () {
        this.fill("blue");
        layer.draw();
      });
      layer.add(programCounter);

      // Instruction Register
      const instructionRegister = new Konva.Rect({
        x: 150,
        y: 20,
        width: 100,
        height: 50,
        fill: "green",
        stroke: "black",
        strokeWidth: 2,
      });
      instructionRegister.on("mouseover", function () {
        this.fill("lightgreen");
        layer.draw();
      });
      instructionRegister.on("mouseout", function () {
        this.fill("green");
        layer.draw();
      });
      layer.add(instructionRegister);

      // Data Path
      const dataPath = new Konva.Line({
        points: [120, 45, 150, 45],
        stroke: "red",
        strokeWidth: 3,
      });
      layer.add(dataPath);

      // Draw the initial view
      layer.draw();
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
