// syntaxflow-formulas — the trade formulas behind the calculators at https://syntaxflow.io, as plain functions.
// Glass, mirrors, timber, steel, masonry and roofs. No dependencies. Every unit is in the name of the argument.
// MIT licence. Each function says which calculator on syntaxflow.io shows the same working.

/** Glass weight in kg: 2.5 kg per m² for every mm of thickness (float glass, 2500 kg/m³, EN 572-1).
 *  https://syntaxflow.io/glass/weight/ */
export function glassWeightKg(widthMm, heightMm, thicknessMm, densityKgM3 = 2500) {
  return (widthMm / 1000) * (heightMm / 1000) * (thicknessMm / 1000) * densityKgM3;
}

/** Mirror weight in kg: glass by shape plus a frame weighed per metre of perimeter.
 *  shape: "rect" | "round" | "oval" (round: widthMm is the diameter). https://syntaxflow.io/glass/mirror-weight/ */
export function mirrorWeightKg(shape, widthMm, heightMm, thicknessMm, frameKgPerM = 0) {
  const w = widthMm / 1000, h = heightMm / 1000;
  const area = shape === "round" ? Math.PI * w * w / 4 : shape === "oval" ? Math.PI * w * h / 4 : w * h;
  let perimeter;
  if (shape === "round") perimeter = Math.PI * w;
  else if (shape === "oval") { const a = w / 2, b = h / 2; perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b))); }   // Ramanujan
  else perimeter = 2 * (w + h);
  return area * thicknessMm * 2.5 + frameKgPerM * perimeter;
}

/** Pull on the top hinge of a glass door, in the same unit as the weight: F = W · b / (2 · d),
 *  with b the door width and d the distance between the top and bottom hinges. https://syntaxflow.io/glass/shower-screen/ */
export function topHingePull(weight, doorWidthMm, hingeSpacingMm) {
  return weight * doorWidthMm / (2 * hingeSpacingMm);
}

/** Board feet: thickness (in) × width (in) × length (ft) / 12. https://syntaxflow.io/wood/board-feet/ */
export function boardFeet(thicknessIn, widthIn, lengthFt, quantity = 1) {
  return thicknessIn * widthIn * lengthFt / 12 * quantity;
}

/** Timber volume in m³: thickness (mm) × width (mm) × length (m) / 1 000 000. */
export function cubicMetres(thicknessMm, widthMm, lengthM, quantity = 1) {
  return thicknessMm * widthMm * lengthM / 1e6 * quantity;
}

/** Steel weight per metre (kg/m), steel at 7850 kg/m³. https://syntaxflow.io/metal/weight/ */
export const steelKgPerM = {
  roundBar: (diameterMm) => Math.PI / 4 * diameterMm * diameterMm * 7850 / 1e6,
  squareBar: (sideMm) => sideMm * sideMm * 7850 / 1e6,
  flatBar: (widthMm, thicknessMm) => widthMm * thicknessMm * 7850 / 1e6,
  roundTube: (outsideMm, wallMm) => Math.PI * (outsideMm - wallMm) * wallMm * 7850 / 1e6,
  squareTube: (sideMm, wallMm) => 4 * (sideMm - wallMm) * wallMm * 7850 / 1e6,   // sharp corners: a little over the real tube
};

/** The site rule of thumb for reinforcing bar in kg/m: D² / 162 (D in mm); exact is π/4 · D² · 7850 / 10⁶.
 *  https://syntaxflow.io/metal/weight/tmt-bar-weight-chart/ */
export function rebarKgPerMRule(diameterMm) { return diameterMm * diameterMm / 162; }

/** Bricks or blocks per m² of wall: 1 / ((length + joint) × (height + joint)), the face you see, in metres.
 *  https://syntaxflow.io/pt/envoltoria/quantos-tijolos-por-m2/ */
export function bricksPerM2(lengthM, heightM, jointM = 0.01) {
  return 1 / ((lengthM + jointM) * (heightM + jointM));
}
/** Bedding mortar in m³ per m² of wall: the wall volume that is not brick. */
export function mortarM3PerM2(wallThicknessM, perM2, lengthM, heightM) {
  return wallThicknessM * (1 - perM2 * lengthM * heightM);
}

/** Roof pitch from rise and run (same unit): degrees, percent and the «x in 12» used in the US.
 *  https://syntaxflow.io/envelope/roof-pitch-calculator/ */
export function roofPitch(rise, run) {
  const ratio = rise / run;
  return { degrees: Math.atan(ratio) * 180 / Math.PI, percent: ratio * 100, inTwelve: ratio * 12 };
}

/** Area of straight countertop runs in m², each [lengthMm, depthMm]. https://syntaxflow.io/envelope/countertop-calculator/ */
export function countertopAreaM2(pieces) {
  return pieces.reduce((a, [l, d]) => a + l * d / 1e6, 0);
}
