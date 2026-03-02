export const MOCK_DEPARTMENTS = [
    { id: 1, name: 'Design', icon: '🎨', color: '#6366f1', description: 'Product and visual design team' },
    { id: 2, name: 'Engineering', icon: '💻', color: '#10b981', description: 'Software development and infrastructure' },
    { id: 3, name: 'Marketing', icon: '📢', color: '#f59e0b', description: 'Growth and communications' },
    { id: 4, name: 'HR', icon: '🤝', color: '#ec4899', description: 'People and culture' },
];

export const MOCK_EMPLOYEES = [
    { id: 1, emp_id: 'EMP001', name: 'Alex Rivera', role: 'Senior Designer', department_id: 1, email: 'alex@company.com', avatar: 'AR', working_days: 18, total_days: 20, status: 'present' },
    { id: 2, emp_id: 'EMP002', name: 'Sarah Chen', role: 'Frontend Lead', department_id: 2, email: 'sarah@company.com', avatar: 'SC', working_days: 20, total_days: 20, status: 'present' },
    { id: 3, emp_id: 'EMP003', name: 'Jordan Smyth', role: 'Product Manager', department_id: 3, email: 'jordan@company.com', avatar: 'JS', working_days: 15, total_days: 20, status: 'leave' },
    { id: 4, emp_id: 'EMP004', name: 'Taylor Otwell', role: 'Backend Dev', department_id: 2, email: 'taylor@company.com', avatar: 'TO', working_days: 19, total_days: 20, status: 'present' },
    { id: 5, emp_id: 'EMP005', name: 'Morgan Freeman', role: 'HR Director', department_id: 4, email: 'morgan@company.com', avatar: 'MF', working_days: 12, total_days: 20, status: 'leave' },
    { id: 6, emp_id: 'EMP006', name: 'Casey Wilson', role: 'UX Researcher', department_id: 1, email: 'casey@company.com', avatar: 'CW', working_days: 17, total_days: 20, status: 'present' },
    { id: 7, emp_id: 'EMP007', name: 'Jamie Lannister', role: 'DevOps Engineeer', department_id: 2, email: 'jamie@company.com', avatar: 'JL', working_days: 14, total_days: 20, status: 'present' },
    { id: 8, emp_id: 'EMP008', name: 'Sam Tarley', role: 'Data Analyst', department_id: 2, email: 'sam@company.com', avatar: 'ST', working_days: 18, total_days: 20, status: 'present' },
    { id: 9, emp_id: 'EMP009', name: 'Arya Stark', role: 'QA Engineer', department_id: 2, email: 'arya@company.com', avatar: 'AS', working_days: 16, total_days: 20, status: 'present' },
    { id: 10, emp_id: 'EMP010', name: 'Jon Snow', role: 'Security Specialist', department_id: 2, email: 'jon@company.com', avatar: 'JS', working_days: 19, total_days: 20, status: 'present' },
];

// Map of date (YYYY-MM-DD) to map of employeeId to status
export let MOCK_ATTENDANCE = {
    '2026-03-03': {
        1: 'present', 2: 'present', 3: 'leave', 4: 'present', 5: 'leave', 6: 'present', 7: 'present', 8: 'present', 9: 'present', 10: 'present'
    },
    '2026-03-02': {
        1: 'present', 2: 'present', 3: 'present', 4: 'present', 5: 'present', 6: 'leave', 7: 'present', 8: 'leave', 9: 'present', 10: 'present'
    }
};
