import isPassing, {computeAverage} from './gradesystem.js';

const enrollees = [
    { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
    { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
    { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
    { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
    { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

const getenrollees = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 1000);
    });
};

const generateReport = async () => {
    try {
        const data = await getenrollees();

        const processedenrollees = data.map((enrollee) => {
            const {name, prelim, midterm, final} = enrollee;
            const average = computeAverage(prelim, midterm, final);
            const status = isPassing(average) ? "Passed" : "Probation";
            return {name, average, status};
        });

        
        const passedenrollees = processedenrollees.filter((enrollee) => enrollee.status === "Passed");
        const probationenrollees = processedenrollees.filter((enrollee) => enrollee.status === "Probation");

        const totalsum = processedenrollees.reduce((sum, enrollee) => sum + enrollee.average, 0);
        
        
        const classaverage = Number((totalsum / processedenrollees.length).toFixed(2));

        console.log("IT313 Enrollees Report");
        
        
        processedenrollees.forEach(({name, average, status}) => {
            console.log(`Name: ${name}, Average: ${average}, Status: ${status}`);
        });

        
        console.log(`Class Average: ${classaverage}`);
        console.log(`Total Passed: ${passedenrollees.length}`);
        console.log(`Total Probation: ${probationenrollees.length}`);
    } catch (error) {
        console.error("Error generating the report:", error);
    }
};

generateReport();