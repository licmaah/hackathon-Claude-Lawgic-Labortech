import assert from "node:assert/strict";
import { test } from "node:test";
import { multa, plazoHabil } from "../src/lib/reglas.ts";

test("cinco días hábiles desde una visita del jueves 24 de septiembre de 2026", () => {
  assert.equal(plazoHabil("2026-09-24", 5), "2026-10-01");
});

test("descuenta el 16 de septiembre", () => {
  assert.equal(plazoHabil("2026-09-15", 1), "2026-09-17");
});

test("descuenta el tercer lunes de noviembre", () => {
  assert.equal(plazoHabil("2026-11-13", 1), "2026-11-17");
});

test("cruza fin de año sin contar el 25 de diciembre ni el 1 de enero", () => {
  assert.equal(plazoHabil("2026-12-24", 5), "2027-01-04");
});

test("multa por trabajador afectado", () => {
  assert.deepEqual(multa(50, 5000, 10, 117.31, false), { min: 58655, max: 5865500 });
});

test("la reincidencia duplica", () => {
  assert.deepEqual(multa(50, 250, 1, 100, true), { min: 10000, max: 50000 });
});
