import getStatus, { computeAverage, EnrollmentStatus } from "./gradesystem.js";

interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

interface EligibilityReport {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string;
}

const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

// Simulated registrar API
function getEnrollees(): Promise<Enrollee[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(enrollees), 1000);
  });
}

// Generic function
function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string
): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const key = keyFn(item);
    (groups[key] ||= []).push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

// Union type + narrowing
function describeBatchId(batchId: string | number): string {
  if (typeof batchId === "string") {
    return batchId.toUpperCase();
  }
  return `BATCH-${batchId.toFixed(0).padStart(4, "0")}`;
}

async function main(): Promise<void> {
  try {
    let batchId: string | number = Math.random() > 0.5 ? "b-2026a" : 1042;
    console.log(`Batch ID: ${describeBatchId(batchId)}`);

    const data = await getEnrollees();

    const reports: EligibilityReport[] = data.map((e) => {
      const average = computeAverage(e.prelim, e.midterm, e.final);
      const status = getStatus(average);
      const report: EligibilityReport = { name: e.name, average, status };
      if (status === EnrollmentStatus.Probation) {
        report.remarks = "Needs consultation";
      }
      return report;
    });

    console.log("=== IT313 Enrollment Eligibility Report (TypeScript) ===");
    for (const r of reports) {
      const remarks = r.remarks ? ` - ${r.remarks}` : "";
      console.log(
        `${r.name.padEnd(12)} - Average: ${r.average.toFixed(2)} - ${r.status}${remarks}`
      );
    }

    const classAverage =
      reports.reduce((sum, r) => sum + r.average, 0) / reports.length;
    console.log(`Class Average: ${classAverage.toFixed(2)}`);

    const grouped = groupBy(reports, (r) => r.status);
    const passing = grouped[EnrollmentStatus.Passing]?.length ?? 0;
    console.log(`Passing: ${passing} / ${reports.length}`);
  } catch (error) {
    console.error("Failed to connect to registrar API:", error);
  }
}

main();