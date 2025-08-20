// Mock student data
const studentData = [
    { id: 1, name: "Lohit", grade: "A", score: 92, subject: "Mathematics", email: "lohit@gmail.com", attendance: "95%" },
    { id: 2, name: "Mani", grade: "B", score: 78, subject: "Science", email: "mani@gmail.com", attendance: "88%" },
    { id: 3, name: "Bhuvi", grade: "A", score: 95, subject: "Mathematics", email: "bhuvi@gmail.com", attendance: "98%" },
    { id: 4, name: "Yudesh", grade: "C", score: 68, subject: "English", email: "yudesh@gmail.com", attendance: "75%" },
    { id: 5, name: "Gowtham", grade: "B", score: 82, subject: "History", email: "gowtham@gmail.com", attendance: "90%" },
    { id: 6, name: "Yogesh", grade: "A", score: 90, subject: "Science", email: "yogesh@gmail.com", attendance: "92%" },
    { id: 7, name: "Hari", grade: "D", score: 58, subject: "Mathematics", email: "hari@gmail..com", attendance: "70%" },
    { id: 8, name: "Dhiya", grade: "B", score: 84, subject: "English", email: "dhiya@gmail.com", attendance: "85%" },
    { id: 9, name: "Ravi", grade: "A", score: 96, subject: "Science", email: "ravi@gmail.com", attendance: "99%" },
    { id: 10, name: "Gopal", grade: "C", score: 72, subject: "History", email: "gopal@gmail.com", attendance: "80%" },
    { id: 11, name: "Suriya", grade: "B", score: 79, subject: "Mathematics", email: "suriya@gmail.com", attendance: "87%" },
    { id: 12, name: "Manoj", grade: "A", score: 93, subject: "English", email: "manoj@gmail.com", attendance: "94%" }
];

// Sidebar Component
function Sidebar({ darkMode, toggleDarkMode }) {
    return `
        <div class="sidebar">
            <div class="logo">
                <img src="./Assets/school-bg.png" alt="school" />
            </div>
            <ul class="nav-links">
                <li><a href="#" class="active"><i class="fas fa-home"></i> <span>Dashboard</span></a></li>
                <li><a href="#"><i class="fas fa-user-graduate"></i> <span>Students</span></a></li>
                <li><a href="#"><i class="fas fa-chart-bar"></i> <span>Analytics</span></a></li>
                <li><a href="#"><i class="fas fa-book"></i> <span>Courses</span></a></li>
                <li><a href="#"><i class="fas fa-cog"></i> <span>Settings</span></a></li>
            </ul>
            <div class="theme-toggle">
                <button class="toggle-btn" onclick="app.toggleDarkMode()">
                    <i class="${darkMode ? 'fas fa-sun' : 'fas fa-moon'}"></i>
                    <span>${darkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>
            </div>
        </div>
    `;
}

// Header Component
function Header() {
    return `
        <div class="header">
            <h1>Student Performance Dashboard</h1>
            <div class="user-profile">
                <img src="./Assets/profile.jpeg" alt="User Profile" />
                <span>Admin</span>
            </div>
        </div>
    `;
}

// Dashboard Cards Component
function DashboardCards(students) {
    const averageScore = students.length 
        ? (students.reduce((sum, student) => sum + student.score, 0) / students.length).toFixed(1)
        : 0;
        
    return `
        <div class="dashboard-cards">
            <div class="card stat-card card-total">
                <div class="label">Total Students</div>
                <div class="value">${students.length}</div>
                <div class="icon"><i class="fas fa-users"></i></div>
            </div>
            <div class="card stat-card card-average">
                <div class="label">Average Score</div>
                <div class="value">${averageScore}</div>
                <div class="icon"><i class="fas fa-chart-line"></i></div>
            </div>
            <div class="card stat-card card-top">
                <div class="label">Top Performance</div>
                <div class="value">A</div>
                <div class="icon"><i class="fas fa-trophy"></i></div>
            </div>
        </div>
    `;
}

// Filters Component
function Filters(subjects, grades, subjectFilter, gradeFilter, searchQuery) {
    return `
        <div class="filters">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input 
                    type="text" 
                    placeholder="Search students..." 
                    value="${searchQuery}"
                    oninput="app.setSearchQuery(this.value)"
                />
            </div>
            <select 
                class="filter-select"
                value="${subjectFilter}"
                onchange="app.setSubjectFilter(this.value)"
            >
                <option value="all">All Subjects</option>
                ${subjects.map(subject => `
                    <option value="${subject}" ${subjectFilter === subject ? 'selected' : ''}>${subject}</option>
                `).join('')}
            </select>
            <select 
                class="filter-select"
                value="${gradeFilter}"
                onchange="app.setGradeFilter(this.value)"
            >
                <option value="all">All Grades</option>
                ${grades.map(grade => `
                    <option value="${grade}" ${gradeFilter === grade ? 'selected' : ''}>Grade ${grade}</option>
                `).join('')}
            </select>
        </div>
    `;
}

// Student Table Component
function StudentTable(students, sortConfig, handleRowClick) {
    const getClassNamesFor = (name) => {
        if (!sortConfig) return;
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return `<i class="fas fa-arrow-${sortConfig.direction === 'ascending' ? 'up' : 'down'}"></i>`;
        }
        return '';
    };

    return `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th onclick="app.handleSort('name')" class="${getClassNamesFor('name')}">
                            Name ${getSortIcon('name')}
                        </th>
                        <th onclick="app.handleSort('subject')" class="${getClassNamesFor('subject')}">
                            Subject ${getSortIcon('subject')}
                        </th>
                        <th onclick="app.handleSort('score')" class="${getClassNamesFor('score')}">
                            Score ${getSortIcon('score')}
                        </th>
                        <th onclick="app.handleSort('grade')" class="${getClassNamesFor('grade')}">
                            Grade ${getSortIcon('grade')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${students.length > 0 ? students.map(student => `
                        <tr key="${student.id}" onclick="app.handleRowClick(${JSON.stringify(student).replace(/"/g, '&quot;')})">
                            <td>${student.name}</td>
                            <td>${student.subject}</td>
                            <td>${student.score}</td>
                            <td>
                                <span class="grade grade-${student.grade}">
                                    ${student.grade}
                                </span>
                            </td>
                        </tr>
                    `).join('') : `
                        <tr>
                            <td colSpan="4" style="text-align: center;">No students found matching your criteria.</td>
                        </tr>
                    `}
                </tbody>
            </table>
        </div>
    `;
}

// Score Chart Component
function ScoreChart() {
    return `
        <div class="chart-container">
            <h3 class="chart-title">Average Scores by Subject</h3>
            <canvas id="scoreChart"></canvas>
        </div>
    `;
}

// Student Modal Component
function StudentModal(student, closeModal) {
    if (!student) return '';

    return `
        <div class="modal-overlay" onclick="app.closeModal()">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>Student Details</h2>
                    <button class="close-btn" onclick="app.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="student-details">
                        <div class="detail-item">
                            <label>Name</label>
                            <span>${student.name}</span>
                        </div>
                        <div class="detail-item">
                            <label>Email</label>
                            <span>${student.email}</span>
                        </div>
                        <div class="detail-item">
                            <label>Subject</label>
                            <span>${student.subject}</span>
                        </div>
                        <div class="detail-item">
                            <label>Score</label>
                            <span>${student.score}/100</span>
                        </div>
                        <div class="detail-item">
                            <label>Grade</label>
                            <span class="grade grade-${student.grade}">
                                ${student.grade}
                            </span>
                        </div>
                        <div class="detail-item">
                            <label>Attendance</label>
                            <span>${student.attendance}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Main App
const app = {
    students: studentData,
    filteredStudents: studentData,
    sortConfig: { key: null, direction: 'ascending' },
    subjectFilter: 'all',
    gradeFilter: 'all',
    searchQuery: '',
    darkMode: false,
    selectedStudent: null,
    showModal: false,
    scoreChart: null,

    init() {
        this.loadPreferences();
        this.render();
        this.initChart();
        this.attachEventListeners();
    },

    loadPreferences() {
        this.darkMode = localStorage.getItem('darkMode') === 'true';
        this.subjectFilter = localStorage.getItem('subjectFilter') || 'all';
        this.gradeFilter = localStorage.getItem('gradeFilter') || 'all';
        this.searchQuery = localStorage.getItem('searchQuery') || '';
        
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
        }
    },

    savePreferences() {
        localStorage.setItem('darkMode', this.darkMode);
        localStorage.setItem('subjectFilter', this.subjectFilter);
        localStorage.setItem('gradeFilter', this.gradeFilter);
        localStorage.setItem('searchQuery', this.searchQuery);
    },

    filterAndSortStudents() {
        let result = [...this.students];
        
        // Apply search filter
        if (this.searchQuery) {
            result = result.filter(student => 
                student.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
        
        // Apply subject filter
        if (this.subjectFilter !== 'all') {
            result = result.filter(student => student.subject === this.subjectFilter);
        }
        
        // Apply grade filter
        if (this.gradeFilter !== 'all') {
            result = result.filter(student => student.grade === this.gradeFilter);
        }
        
        // Apply sorting
        if (this.sortConfig.key) {
            result.sort((a, b) => {
                if (a[this.sortConfig.key] < b[this.sortConfig.key]) {
                    return this.sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[this.sortConfig.key] > b[this.sortConfig.key]) {
                    return this.sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        
        this.filteredStudents = result;
        this.savePreferences();
    },

    handleSort(key) {
        let direction = 'ascending';
        if (this.sortConfig.key === key && this.sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        this.sortConfig = { key, direction };
        this.filterAndSortStudents();
        this.render();
    },

    setSubjectFilter(value) {
        this.subjectFilter = value;
        this.filterAndSortStudents();
        this.render();
    },

    setGradeFilter(value) {
        this.gradeFilter = value;
        this.filterAndSortStudents();
        this.render();
    },

    setSearchQuery(value) {
        this.searchQuery = value;
        this.filterAndSortStudents();
        this.render();
    },

    handleRowClick(student) {
        this.selectedStudent = student;
        this.showModal = true;
        this.render();
    },

    closeModal() {
        this.showModal = false;
        this.render();
    },

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        this.savePreferences();
        this.render();
        this.updateChart();
    },

    getUniqueSubjects() {
        return [...new Set(this.students.map(student => student.subject))];
    },

    getUniqueGrades() {
        return [...new Set(this.students.map(student => student.grade))].sort();
    },

    initChart() {
        const ctx = document.getElementById('scoreChart');
        if (ctx) {
            // Calculate average scores per subject
            const subjectAverages = {};
            this.students.forEach(student => {
                if (!subjectAverages[student.subject]) {
                    subjectAverages[student.subject] = { total: 0, count: 0 };
                }
                subjectAverages[student.subject].total += student.score;
                subjectAverages[student.subject].count += 1;
            });

            const chartData = {
                labels: Object.keys(subjectAverages),
                datasets: [
                    {
                        label: 'Average Score',
                        data: Object.values(subjectAverages).map(subject => (subject.total / subject.count).toFixed(1)),
                        backgroundColor: [
                            'rgba(67, 97, 238, 0.7)',
                            'rgba(76, 201, 240, 0.7)',
                            'rgba(72, 149, 239, 0.7)',
                            'rgba(63, 55, 201, 0.7)'
                        ],
                        borderColor: [
                            'rgba(67, 97, 238, 1)',
                            'rgba(76, 201, 240, 1)',
                            'rgba(72, 149, 239, 1)',
                            'rgba(63, 55, 201, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            };

            const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 50,
                        max: 100,
                        ticks: {
                            color: this.darkMode ? '#e1e1e1' : '#333'
                        },
                        grid: {
                            color: this.darkMode ? '#2d2d2d' : '#e1e5eb'
                        }
                    },
                    x: {
                        ticks: {
                            color: this.darkMode ? '#e1e1e1' : '#333'
                        },
                        grid: {
                            color: this.darkMode ? '#2d2d2d' : '#e1e5eb'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: this.darkMode ? '#e1e1e1' : '#333'
                        }
                    }
                }
            };

            this.scoreChart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });
        }
    },

    updateChart() {
        if (this.scoreChart) {
            this.scoreChart.destroy();
        }
        this.initChart();
    },

    render() {
        const root = document.getElementById('root');
        if (!root) return;

        this.filterAndSortStudents();
        
        const subjects = this.getUniqueSubjects();
        const grades = this.getUniqueGrades();

        root.innerHTML = `
            <div class="app">
                ${Sidebar({ darkMode: this.darkMode, toggleDarkMode: this.toggleDarkMode })}
                <div class="main-content">
                    ${Header()}
                    ${DashboardCards(this.filteredStudents)}
                    ${Filters(subjects, grades, this.subjectFilter, this.gradeFilter, this.searchQuery)}
                    ${StudentTable(this.filteredStudents, this.sortConfig, this.handleRowClick)}
                    ${ScoreChart()}
                    ${this.showModal ? StudentModal(this.selectedStudent, this.closeModal) : ''}
                </div>
            </div>
        `;

        // Reinitialize chart after render
        if (!this.scoreChart) {
            setTimeout(() => this.initChart(), 100);
        } else {
            this.updateChart();
        }
    },

    attachEventListeners() {
        // Handle click outside modal to close it
        document.addEventListener('click', (e) => {
            if (this.showModal && e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });

        // Handle escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (this.showModal && e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});