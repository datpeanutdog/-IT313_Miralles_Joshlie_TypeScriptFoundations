IT313 Enrollment Eligibility Checker (TypeScript)

Problem
Computes each enrollee's average of prelim, midterm, and final, then marks them PASSING (75 or above) or PROBATION. This is a TypeScript rewrite of the Lab 2 JavaScript program so type bugs are caught before they reach a student record.

Project Structure
- gradesystem.ts: exports the EnrollmentStatus enum, computeAverage(), and the default getStatus().
- index.ts: main script with the interfaces, generic groupBy(), simulated registrar API, and report output.
- tsconfig.json: TypeScript config with "strict": true.

TypeScript Concepts Used
- Interfaces: Enrollee and EligibilityReport define the data shapes.
- Optional property: remarks?: string is set only for PROBATION enrollees.
- Enum: EnrollmentStatus replaces raw strings, so typos become compile errors.
- Union type: batchId: string | number, narrowed with typeof before use.
- Generics: groupBy<T>() groups reports by status for any array type.
- Promises and async/await: getEnrollees() simulates an API call, wrapped in try...catch.
- ES Modules: import/export between gradesystem.ts and index.ts.

Array Methods
- .map() builds the EligibilityReport array.
- .reduce() computes the class average.

To Run
- Install dependencies: npm install
- Check types (no output means no errors): npx tsc --noEmit
- Run the program: npx ts-node index.ts
