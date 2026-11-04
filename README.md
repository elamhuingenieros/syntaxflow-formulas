# syntaxflow-formulas

The trade formulas behind the free calculators at [syntaxflow.io](https://syntaxflow.io/), as plain JavaScript
functions with no dependencies: glass and mirror weight, the pull on a glass door's top hinge, board feet and timber
volume, steel weight per metre, bricks and mortar per m², roof pitch and countertop area.

Each function names its units in its arguments and links the calculator that shows the same working step by step.

```js
import { glassWeightKg, boardFeet, steelKgPerM, bricksPerM2, roofPitch } from "syntaxflow-formulas";

glassWeightKg(800, 1950, 8);        // 31.2 kg: an 8 mm shower door
boardFeet(1, 6, 8);                 // 4 board feet
steelKgPerM.roundTube(48.3, 3.2);   // 3.56 kg/m
bricksPerM2(0.19, 0.19, 0.01);      // 25 per m²
roofPitch(6, 12).degrees;           // 26.57°
```

| Function | What it gives | Calculator |
|---|---|---|
| `glassWeightKg(w, h, t)` | Glass weight, 2.5 kg/m² per mm | [Glass weight](https://syntaxflow.io/glass/weight/) |
| `mirrorWeightKg(shape, w, h, t, frame)` | Mirror weight, rectangle, round or oval, with a frame | [Mirror weight](https://syntaxflow.io/glass/mirror-weight/) |
| `topHingePull(W, b, d)` | Pull on the top hinge of a glass door | [Shower screen](https://syntaxflow.io/glass/shower-screen/) |
| `boardFeet(t, w, L)` | Board feet | [Board feet](https://syntaxflow.io/wood/board-feet/) |
| `cubicMetres(t, w, L)` | Timber volume in m³ | [Board feet and m³](https://syntaxflow.io/wood/board-feet/) |
| `steelKgPerM.*` | Bars, flats and tubes in kg/m | [Metal weight](https://syntaxflow.io/metal/weight/) |
| `rebarKgPerMRule(D)` | The D²/162 rule for rebar | [TMT bar weight chart](https://syntaxflow.io/metal/weight/tmt-bar-weight-chart/) |
| `bricksPerM2(L, H, j)`, `mortarM3PerM2(...)` | Bricks and mortar per m² | [Bricks per m²](https://syntaxflow.io/pt/envoltoria/quantos-tijolos-por-m2/) |
| `roofPitch(rise, run)` | Degrees, percent and x in 12 | [Roof pitch](https://syntaxflow.io/envelope/roof-pitch-calculator/) |
| `countertopAreaM2(pieces)` | Worktop area | [Countertop calculator](https://syntaxflow.io/envelope/countertop-calculator/) |

## What it is not

These are the formulas the trade uses to estimate and to order. They do not size glass for a load or check a
structure: for wind, barriers and anything that carries people, use the standard that applies, or an engineer.

## Tests

`npm test` (Node 18 or later). Every figure in the tests is also on the matching calculator page.

## Licence

MIT. Made by [SyntaxFlow](https://syntaxflow.io/), the international line of HU Ingenieros (Madrid, since 1976).
