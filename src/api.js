import { employees as initialEmployees, departments as initialDepartments } from './data/mockData';

// Persistence helpers
const STORAGE_KEYS = {
    EMPLOYEES: 'hrms_employees',
    DEPARTMENTS: 'hrms_departments'
};

const getStoredData = (key, initial) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
};

const saveStoredData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Initialize from storage or defaults
let employees = getStoredData(STORAGE_KEYS.EMPLOYEES, initialEmployees);
let departments = getStoredData(STORAGE_KEYS.DEPARTMENTS, initialDepartments);

export async function fetchEmployees() {
    return employees;
}

export async function fetchDepartments() {
    return departments;
}

export async function fetchEmployeeById(id) {
    const emp = employees.find(e => String(e.id) === String(id));
    if (!emp) throw new Error('Employee not found');
    return emp;
}

export async function fetchSummary() {
    return {
        totalEmployees: employees.length,
        totalDepartments: departments.length,
        presentToday: employees.filter(e => e.status === 'present').length,
        onLeave: employees.filter(e => e.status === 'leave').length
    };
}

export async function createEmployee(employeeData) {
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    const newEmp = {
        ...employeeData,
        id: newId,
        working_days: 0,
        leaves_taken: 0,
        total_days: 22, // Default
        avatar: employeeData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    };
    employees = [...employees, newEmp];
    saveStoredData(STORAGE_KEYS.EMPLOYEES, employees);
    return newEmp;
}

export async function updateAttendance(employeeId, status) {
    const empIndex = employees.findIndex(e => String(e.id) === String(employeeId));
    if (empIndex !== -1) {
        const emp = { ...employees[empIndex] };
        if (emp.status !== status) {
            if (status === 'present') {
                emp.working_days = (emp.working_days || 0) + 1;
                if (emp.leaves_taken > 0) emp.leaves_taken -= 1;
            } else if (status === 'leave') {
                emp.leaves_taken = (emp.leaves_taken || 0) + 1;
                if (emp.working_days > 0) emp.working_days -= 1;
            }
            emp.status = status;
            employees[empIndex] = emp;
            saveStoredData(STORAGE_KEYS.EMPLOYEES, employees);
        }
    }
    return { success: true };
}
