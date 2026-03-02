import { MOCK_EMPLOYEES, MOCK_DEPARTMENTS, MOCK_ATTENDANCE } from './data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const USE_MOCK = localStorage.getItem('USE_MOCK_DATA') === 'true';

export async function fetchEmployees() {
    if (USE_MOCK) return MOCK_EMPLOYEES;
    const response = await fetch(`${API_BASE_URL}/employees/`);
    if (!response.ok) throw new Error('Failed to fetch employees');
    return response.json();
}

export async function fetchDepartments() {
    if (USE_MOCK) return MOCK_DEPARTMENTS;
    const response = await fetch(`${API_BASE_URL}/departments/`);
    if (!response.ok) throw new Error('Failed to fetch departments');
    return response.json();
}

export async function fetchEmployeeById(id) {
    if (USE_MOCK) return MOCK_EMPLOYEES.find(e => e.id === parseInt(id));
    const response = await fetch(`${API_BASE_URL}/employees/${id}`);
    if (!response.ok) throw new Error('Failed to fetch employee details');
    return response.json();
}

export async function fetchSummary() {
    if (USE_MOCK) {
        return {
            totalEmployees: MOCK_EMPLOYEES.length,
            totalDepartments: MOCK_DEPARTMENTS.length,
            presentToday: MOCK_EMPLOYEES.filter(e => e.status === 'present').length,
            onLeave: MOCK_EMPLOYEES.filter(e => e.status === 'leave').length
        };
    }
    const [employees, departments] = await Promise.all([
        fetchEmployees(),
        fetchDepartments()
    ]);
    return {
        totalEmployees: employees.length,
        totalDepartments: departments.length,
        presentToday: employees.filter(e => e.status === 'present').length,
        onLeave: employees.filter(e => e.status === 'leave').length
    };
}

export async function createEmployee(employeeData) {
    if (USE_MOCK) {
        const newEmp = { ...employeeData, id: MOCK_EMPLOYEES.length + 1, working_days: 0, total_days: 20 };
        MOCK_EMPLOYEES.push(newEmp);
        return newEmp;
    }
    const response = await fetch(`${API_BASE_URL}/employees/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create employee');
    }
    return response.json();
}

export async function deleteEmployee(id) {
    if (USE_MOCK) return { message: 'Employee deleted' };
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete employee');
    }
    return response.json();
}

export async function updateAttendance(employeeId, status, date) {
    if (USE_MOCK) {
        const targetDate = date || new Date().toISOString().split('T')[0];
        if (!MOCK_ATTENDANCE[targetDate]) {
            MOCK_ATTENDANCE[targetDate] = {};
        }
        MOCK_ATTENDANCE[targetDate][employeeId] = status;

        // Also update the employee's main status if it's "today"
        if (!date || date === new Date().toISOString().split('T')[0]) {
            const emp = MOCK_EMPLOYEES.find(e => e.id === parseInt(employeeId));
            if (emp) emp.status = status;
        }
        return { message: 'Attendance updated' };
    }
    const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/attendance`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, date }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update attendance');
    }
    return response.json();
}

/**
 * Fetches attendance status for all employees on a specific date
 */
export async function fetchAttendanceByDate(date) {
    if (USE_MOCK) {
        return MOCK_ATTENDANCE[date] || {};
    }
    const response = await fetch(`${API_BASE_URL}/attendance/?date=${date}`);
    if (!response.ok) throw new Error('Failed to fetch attendance for date');
    return response.json();
}
