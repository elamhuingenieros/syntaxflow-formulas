// node --test — every figure here is also on the matching page of syntaxflow.io.
import test from "node:test";
import assert from "node:assert/strict";
import * as F from "./formulas.js";

const near = (a, b, d = 1e-9) => assert.ok(Math.abs(a - b) <= d, `${a} ≈ ${b}`);

test("glass and mirrors", () => {
  near(F.glassWeightKg(800, 1950, 8), 31.2);
  near(F.mirrorWeightKg("rect", 600, 900, 4), 5.4);
  near(F.mirrorWeightKg("round", 800, 800, 4), 5.0265, 1e-4);
  near(F.mirrorWeightKg("round", 800, 800, 4, 1.5), 5.0265 + 1.5 * Math.PI * 0.8, 1e-4);
  near(F.mirrorWeightKg("oval", 800, 800, 4), F.mirrorWeightKg("round", 800, 800, 4), 1e-9);
  near(F.topHingePull(31.2, 800, 1350), 9.2444, 1e-4);
});

test("timber", () => {
  near(F.boardFeet(1, 6, 8), 4);
  near(F.cubicMetres(24, 140, 4), 0.01344);
  near(1 / F.cubicMetres(24, 140, 4), 74.4, 0.05);
});

test("steel", () => {
  near(F.steelKgPerM.roundBar(12), 0.8878, 1e-4);
  near(F.rebarKgPerMRule(12), 0.8889, 1e-4);
  near(F.steelKgPerM.flatBar(40, 5), 1.57);
  near(F.steelKgPerM.roundTube(48.3, 3.2), 3.5591, 1e-4);   // tables: 3.56 kg/m
});

test("masonry", () => {
  near(F.bricksPerM2(0.19, 0.19), 25);
  near(F.mortarM3PerM2(0.09, 25, 0.19, 0.19) * 1000, 8.775, 1e-9);
  near(F.bricksPerM2(0.39, 0.19), 12.5);
});

test("roofs and worktops", () => {
  const p = F.roofPitch(6, 12);
  near(p.degrees, 26.565, 1e-3); near(p.percent, 50); near(p.inTwelve, 6);
  near(F.countertopAreaM2([[3000, 620], [1800, 620], [900, 620]]), 3.534);
});
