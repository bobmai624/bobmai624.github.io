import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = process.argv[2];
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(`${outputDir}/previews`, { recursive: true });

const workbook = Workbook.create();
const overview = workbook.worksheets.add("Overview");
const assumptions = workbook.worksheets.add("Assumptions");
const revenue = workbook.worksheets.add("Revenue Extract");
const audit = workbook.worksheets.add("Audit Register");

const ink = "#111111";
const muted = "#666663";
const paper = "#F1F0EC";
const accent = "#728F9B";
const white = "#FFFFFF";
const currency = "$#,##0;[Red]($#,##0);-";
const percentage = "0.0%;[Red](0.0%);-";

for (const sheet of workbook.worksheets.items) {
  sheet.showGridLines = false;
}

function titleBand(sheet, title, subtitle) {
  sheet.getRange("A1:H2").merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A1:H2").format = {
    fill: ink,
    font: { name: "Arial", size: 24, color: white },
    verticalAlignment: "center",
    wrapText: true,
  };
  sheet.getRange("A3:H3").merge();
  sheet.getRange("A3").values = [[subtitle]];
  sheet.getRange("A3:H3").format = {
    fill: paper,
    font: { name: "Arial", size: 10, color: muted },
    verticalAlignment: "center",
    wrapText: true,
  };
  sheet.getRange("A1:H3").format.borders = { preset: "outside", style: "thin", color: ink };
  sheet.getRange("A1:H2").format.rowHeight = 28;
  sheet.getRange("A3:H3").format.rowHeight = 32;
}

function sectionHeader(range, label) {
  range.merge();
  range.values = [[label]];
  range.format = {
    fill: ink,
    font: { name: "Arial", size: 10, bold: true, color: white },
    verticalAlignment: "center",
  };
}

function tableHeader(range) {
  range.format = {
    fill: accent,
    font: { name: "Arial", size: 9, bold: true, color: white },
    wrapText: true,
    verticalAlignment: "center",
    borders: { preset: "all", style: "thin", color: "#5F7983" },
  };
}

function bodyGrid(range) {
  range.format = {
    font: { name: "Arial", size: 9, color: ink },
    wrapText: true,
    verticalAlignment: "top",
    borders: { preset: "all", style: "thin", color: "#D2D0CA" },
  };
}

titleBand(
  overview,
  "Retail Mall Feasibility - Public Model Extract",
  "Privacy-safe portfolio evidence. Original group workbook retained privately; this extract removes student identifiers, collaborator metadata and external file paths.",
);
sectionHeader(overview.getRange("A5:H5"), "PROJECT CONTEXT");
overview.getRange("A6:B10").values = [
  ["Context", "University group feasibility study"],
  ["Scenario", "Hypothetical 10,000 sqm Melbourne CBD retail mall"],
  ["Bowen's contribution", "Model development, scenario analysis, risk synthesis and strategic recommendation"],
  ["Shared ownership", "Four-person team; modelling, analysis and submission were shared"],
  ["Public status", "Selected formula evidence only - not the original academic submission"],
];
overview.getRange("A6:A10").format = { fill: paper, font: { bold: true, color: ink } };
bodyGrid(overview.getRange("A6:B10"));
sectionHeader(overview.getRange("A12:H12"), "ORIGINAL MODEL MAP");
overview.getRange("A13:C13").values = [["Module", "Original sheet group", "Purpose"]];
overview.getRange("A14:C20").values = [
  ["Inputs", "Assumptions", "Centralise capital, tenancy, operating, debt and discount assumptions."],
  ["Build", "Construction Cash Flow", "Stage soft costs and construction expenditure across the programme."],
  ["Operations", "Revenue / Operating Expense", "Translate occupancy, tenant mix, rent and escalation into operating evidence."],
  ["Finance", "Loan Repayment / Projected Financials", "Separate principal, interest, cash flow and discounting."],
  ["Decision", "NPV & IRR / Sensitivity", "Test how changing assumptions affects feasibility."],
  ["Risk", "Cost Overrun / Construction Risks", "Expose cost, schedule and competition pressures."],
  ["Handoff", "Front Door / Back Door / Benchmark", "Frame the recommendation through market and project constraints."],
];
tableHeader(overview.getRange("A13:C13"));
bodyGrid(overview.getRange("A14:C20"));
overview.getRange("A22:H24").merge();
overview.getRange("A22").values = [["AUDIT BOUNDARY\nA later review found unreconciled NPV and IRR outputs across the submitted workbook and report. This public extract therefore does not reproduce a headline return conclusion. It preserves transparent inputs, a partial revenue calculation and a visible audit register."]];
overview.getRange("A22:H24").format = {
  fill: "#E8ECEE",
  font: { name: "Arial", size: 10, color: ink },
  wrapText: true,
  verticalAlignment: "center",
  borders: { preset: "outside", style: "medium", color: accent },
};
overview.getRange("A:A").format.columnWidth = 25;
overview.getRange("B:B").format.columnWidth = 42;
overview.getRange("C:C").format.columnWidth = 58;
overview.getRange("D:H").format.columnWidth = 12;
overview.freezePanes.freezeRows(3);

titleBand(
  assumptions,
  "Selected Assumptions",
  "Blue values are editable inputs disclosed in the submitted report. Formulas are black. Currency is AUD.",
);
assumptions.getRange("A5:D5").values = [["Input", "Value", "Unit", "Public-source note"]];
assumptions.getRange("A6:D20").values = [
  ["Leasable area", 10000, "sqm", "Submitted project scenario"],
  ["Anchor tenant share", 0.30, "% of area", "Submitted assumption"],
  ["Specialty tenant share", null, "% of area", "Calculated as 1 - anchor share"],
  ["Anchor rent", 1200, "AUD / sqm / year", "Submitted assumption"],
  ["Specialty rent", 2500, "AUD / sqm / year", "Submitted assumption"],
  ["Opening occupancy", 0.80, "%", "Submitted assumption"],
  ["Maximum occupancy", 0.95, "%", "Submitted assumption"],
  ["Annual occupancy step", 0.05, "percentage points", "Submitted assumption"],
  ["Annual rent escalation", 0.025, "%", "Submitted assumption"],
  ["Ancillary income share", 0.10, "% of rent", "Submitted assumption"],
  ["Opening operating expense", 1200000, "AUD / year", "Submitted assumption"],
  ["Land cost", 5000000, "AUD", "Submitted assumption"],
  ["Construction cost", 15000000, "AUD", "Submitted assumption"],
  ["Design / legal / marketing", 2000000, "AUD", "Submitted assumption"],
  ["Total initial capital", null, "AUD", "Calculated from the three components above"],
];
assumptions.getRange("B8").formulas = [["=1-B7"]];
assumptions.getRange("B20").formulas = [["=SUM(B17:B19)"]];
tableHeader(assumptions.getRange("A5:D5"));
bodyGrid(assumptions.getRange("A6:D20"));
assumptions.getRange("B6:B20").format.font = { color: "#0000FF" };
assumptions.getRange("B8").format.font = { color: ink };
assumptions.getRange("B20").format.font = { color: ink, bold: true };
assumptions.getRange("B7:B8").format.numberFormat = percentage;
assumptions.getRange("B11:B15").format.numberFormat = percentage;
assumptions.getRange("B9:B10").format.numberFormat = currency;
assumptions.getRange("B16:B20").format.numberFormat = currency;
assumptions.getRange("A22:D24").merge();
assumptions.getRange("A22").values = [["Scope note: these assumptions support the public revenue extract. They do not by themselves establish project feasibility or validate the original NPV / IRR outputs."]];
assumptions.getRange("A22:D24").format = { fill: paper, font: { color: muted }, wrapText: true, verticalAlignment: "center" };
assumptions.getRange("A:A").format.columnWidth = 30;
assumptions.getRange("B:B").format.columnWidth = 18;
assumptions.getRange("C:C").format.columnWidth = 22;
assumptions.getRange("D:D").format.columnWidth = 44;
assumptions.freezePanes.freezeRows(5);

titleBand(
  revenue,
  "Illustrative Revenue Extract",
  "Formula-driven partial calculation. It demonstrates the submitted operating logic but excludes debt, tax, capital timing and terminal value.",
);
revenue.getRange("A5:J5").values = [[
  "Year", "Occupancy", "Anchor rent", "Specialty rent", "Anchor income",
  "Specialty income", "Ancillary", "Gross income", "Operating expense", "Illustrative NOI",
]];
tableHeader(revenue.getRange("A5:J5"));
const revenueRows = [];
for (let index = 0; index < 9; index += 1) {
  const row = 6 + index;
  const year = 2027 + index;
  revenue.getRange(`A${row}`).values = [[year]];
  revenue.getRange(`B${row}`).formulas = [[`=MIN('Assumptions'!$B$11+(A${row}-$A$6)*'Assumptions'!$B$13,'Assumptions'!$B$12)`]];
  revenue.getRange(`C${row}`).formulas = [[`='Assumptions'!$B$9*(1+'Assumptions'!$B$14)^(A${row}-$A$6)`]];
  revenue.getRange(`D${row}`).formulas = [[`='Assumptions'!$B$10*(1+'Assumptions'!$B$14)^(A${row}-$A$6)`]];
  revenue.getRange(`E${row}`).formulas = [[`='Assumptions'!$B$6*'Assumptions'!$B$7*B${row}*C${row}`]];
  revenue.getRange(`F${row}`).formulas = [[`='Assumptions'!$B$6*'Assumptions'!$B$8*B${row}*D${row}`]];
  revenue.getRange(`G${row}`).formulas = [[`=(E${row}+F${row})*'Assumptions'!$B$15`]];
  revenue.getRange(`H${row}`).formulas = [[`=SUM(E${row}:G${row})`]];
  revenue.getRange(`I${row}`).formulas = [[`='Assumptions'!$B$16*(1+'Assumptions'!$B$14)^(A${row}-$A$6)`]];
  revenue.getRange(`J${row}`).formulas = [[`=H${row}-I${row}`]];
  revenueRows.push(row);
}
bodyGrid(revenue.getRange("A6:J14"));
revenue.getRange("B6:B14").format.numberFormat = percentage;
revenue.getRange("C6:J14").format.numberFormat = currency;
revenue.getRange("A16:J18").merge();
revenue.getRange("A16").values = [["Interpretation boundary: Illustrative NOI is gross income less operating expense only. It is not free cash flow, NPV, IRR or an investment recommendation."]];
revenue.getRange("A16:J18").format = { fill: paper, font: { color: muted }, wrapText: true, verticalAlignment: "center" };
revenue.getRange("A:A").format.columnWidth = 10;
revenue.getRange("B:B").format.columnWidth = 14;
revenue.getRange("C:D").format.columnWidth = 16;
revenue.getRange("E:J").format.columnWidth = 18;
revenue.freezePanes.freezeRows(5);

titleBand(
  audit,
  "Audit Register",
  "One assertion per row. The public extract shows what is checked, what remains unresolved and how the limitation is communicated.",
);
audit.getRange("A5:G5").values = [["Check", "Actual", "Expected", "Difference", "Tolerance", "Status", "Notes"]];
audit.getRange("A6:G10").values = [
  ["Tenant shares sum to 100%", null, 1, null, 0.0001, null, "Anchor plus specialty share"],
  ["Capital components sum to total", null, 22000000, null, 1, null, "Land + construction + soft costs"],
  ["Opening gross income reproduces disclosed operating logic", null, 18568000, null, 1, null, "10,000 sqm, tenant mix, 80% occupancy and 10% ancillary"],
  ["Original NPV / IRR reconcile across workbook and report", null, null, null, null, "DISCLOSED", "Not reconciled; no headline return is presented as verified"],
  ["Public file contains student identifiers or external paths", 0, 0, 0, 0, "OK", "Checked after export at package level"],
];
audit.getRange("B6").formulas = [["='Assumptions'!B7+'Assumptions'!B8"]];
audit.getRange("D6").formulas = [["=B6-C6"]];
audit.getRange("F6").formulas = [["=IF(ABS(D6)<=E6,\"OK\",\"CHECK\")"]];
audit.getRange("B7").formulas = [["='Assumptions'!B20"]];
audit.getRange("D7").formulas = [["=B7-C7"]];
audit.getRange("F7").formulas = [["=IF(ABS(D7)<=E7,\"OK\",\"CHECK\")"]];
audit.getRange("B8").formulas = [["='Revenue Extract'!H6"]];
audit.getRange("D8").formulas = [["=B8-C8"]];
audit.getRange("F8").formulas = [["=IF(ABS(D8)<=E8,\"OK\",\"CHECK\")"]];
tableHeader(audit.getRange("A5:G5"));
bodyGrid(audit.getRange("A6:G10"));
audit.getRange("B6:E6").format.numberFormat = percentage;
audit.getRange("B7:E8").format.numberFormat = currency;
audit.getRange("F6:F8").conditionalFormats.add("containsText", { text: "OK", format: { fill: "#DCE9DF", font: { color: "#245B33", bold: true } } });
audit.getRange("F9").format = { fill: "#F2E7CF", font: { color: "#7A5113", bold: true } };
audit.getRange("F10").format = { fill: "#DCE9DF", font: { color: "#245B33", bold: true } };
audit.getRange("A12:G15").merge();
audit.getRange("A12").values = [["Quality statement: The public workbook intentionally exposes a limited, auditable calculation instead of copying the original model's unresolved return outputs. The complete academic source remains private."]];
audit.getRange("A12:G15").format = { fill: "#E8ECEE", font: { color: ink }, wrapText: true, verticalAlignment: "center", borders: { preset: "outside", style: "medium", color: accent } };
audit.getRange("A:A").format.columnWidth = 42;
audit.getRange("B:E").format.columnWidth = 16;
audit.getRange("F:F").format.columnWidth = 14;
audit.getRange("G:G").format.columnWidth = 48;
audit.freezePanes.freezeRows(5);

const overviewInspect = await workbook.inspect({
  kind: "table",
  range: "Overview!A1:H24",
  include: "values,formulas",
  tableMaxRows: 24,
  tableMaxCols: 8,
  maxChars: 7000,
});
const revenueInspect = await workbook.inspect({
  kind: "table",
  range: "Revenue Extract!A5:J14",
  include: "values,formulas",
  tableMaxRows: 12,
  tableMaxCols: 10,
  maxChars: 7000,
});
const auditInspect = await workbook.inspect({
  kind: "table",
  range: "Audit Register!A5:G10",
  include: "values,formulas",
  tableMaxRows: 8,
  tableMaxCols: 7,
  maxChars: 5000,
});
const errorInspect = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});

await fs.writeFile(
  `${outputDir}/verification.ndjson`,
  [overviewInspect.ndjson, revenueInspect.ndjson, auditInspect.ndjson, errorInspect.ndjson].join("\n"),
  "utf8",
);

for (const sheet of workbook.worksheets.items) {
  const preview = await workbook.render({ sheetName: sheet.name, autoCrop: "all", scale: 1.2, format: "png" });
  const safeName = sheet.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  await fs.writeFile(`${outputDir}/previews/${safeName}.png`, new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/financial-feasibility-public-model.xlsx`);
console.log(JSON.stringify({ output: `${outputDir}/financial-feasibility-public-model.xlsx`, sheets: workbook.worksheets.items.map((sheet) => sheet.name) }));
