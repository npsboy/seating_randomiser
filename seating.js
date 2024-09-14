let positions = []
let students = [
    "Thathastu", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Aadhya", "Ishaan", "Ananya", "Aanya",
    "Ishaan", "Saanvi", "Karthik", "Meera", "Rohan", "Nisha", "Raj", "Anaya", "Amit", "Kavya",
    "Riya", "Ayesha", "Vikram", "Priya", "Ravi", "Sneha", "Neha", "Varun", "Shivani", 
  ];
let sub_list = []

function shuffle_array(array) {
    let number_list = []
    let shuffled_list = []
    let current_index = array.length
    console.log(array.length)
    let random_index = 0
    while (current_index>0) {
        random_index = Math.floor(Math.random()*array.length)
        current_index--
        [array[current_index], array[random_index]] = [array[random_index], array[current_index]]
    }
    
}
shuffle_array(students)
console.log("shuffled list = " + students)
for (let index = 0; index < (students.length+1); index++) {
    sub_list = []
    sub_list.push(students[index])
    if (index+1 < students.length) {
        sub_list.push(students[index+1])
    }
 
    positions.push(sub_list.slice())
    index = index +1
}
console.log(positions)


const benchesData = positions



// Example array of sub-arrays where each sub-array represents a bench


const classroom = document.getElementById('classroom');

function createBench(benchNumber, studentNames) {
    const benchGroup = document.createElement('div');
    benchGroup.classList.add('bench-group');

    const numStudents = studentNames.length;
    const bench = document.createElement('div');
    bench.classList.add('bench');
    bench.innerHTML = `<div class="bench-number">Bench ${benchNumber}</div>`;

    const studentsDiv = document.createElement('div');
    studentsDiv.classList.add('students');

    studentNames.forEach(name => {
        const studentDiv = createStudent(name);
        studentsDiv.appendChild(studentDiv);
    });

    benchGroup.appendChild(studentsDiv);
    benchGroup.appendChild(bench);

    return benchGroup;
}

function createStudent(name) {
    const studentDiv = document.createElement('div');
    studentDiv.classList.add('student');

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const bodyDiv = document.createElement('div');
    bodyDiv.classList.add('body');
    bodyDiv.textContent = name || 'Empty';

    studentDiv.appendChild(headDiv);
    studentDiv.appendChild(bodyDiv);

    return studentDiv;
}

function populateClassroom(benchesData) {
    classroom.innerHTML = ''; // Clear previous content

    let benchNumber = 1;
    benchesData.forEach(studentNames => {
        const bench = createBench(benchNumber++, studentNames);
        classroom.appendChild(bench);
    });

    // Adjust the grid layout based on the number of students per bench
    adjustGridLayout();
}

function adjustGridLayout() {
    const benches = document.querySelectorAll('.bench-group');
    let rows = 0; // Number of rows needed

    benches.forEach((bench, index) => {
        const numStudents = bench.querySelectorAll('.student').length;
        
        if (numStudents > 3) {
            // Ensure a maximum of 2 benches per horizontal row
            if (index % 2 === 0) {
                rows++;
            }
        } else {
            // Ensure a maximum of 3 benches per horizontal row
            if (index % 3 === 0) {
                rows++;
            }
        }
    });

    // Set grid columns to ensure a maximum of 3 benches per horizontal row
    classroom.style.gridTemplateColumns = `repeat(3, minmax(300px, 1fr))`;
    classroom.style.gridAutoRows = `minmax(100px, auto)`; // Adjust row height dynamically
}

// Populate the classroom with the provided benches data
populateClassroom(benchesData);