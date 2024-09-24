let positions = [];
let students = [
    "Thathastu", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Aadhya", "Ishaan", "Ananya", "Aanya",
    "Ishaan", "Saanvi", "Karthik", "Meera", "Rohan", "Nisha", "Raj", "Anaya", "Amit", "Kavya",
    "Riya", "Ayesha", "Vikram", "Priya", "Ravi", "Sneha", "Neha", "Varun", "Shivani", 
];

let sub_list = [];

function shuffle_array(array) {
    let current_index = array.length;
    let random_index = 0;

    while (current_index > 0) {
        random_index = Math.floor(Math.random() * current_index);
        current_index--;
        [array[current_index], array[random_index]] = [array[random_index], array[current_index]];
    }
}



async function loadPage_1() {
    // Step 1: Fetch the page
    const response = await fetch("page_1.html");  // Wait for the fetch to complete
  
    // Step 2: Convert the response to text
    const data = await response.text();  // Wait for the text conversion
  
    // Step 3: Inject the content into the page
    document.getElementById('page_code').innerHTML = data;  // Update the content
    document.body.style.backgroundImage = "url('school_background.png')";
}


function load_example_values() {
    let example_value = ""
    for (let index = 0; index < students.length; index++) {
        example_value= example_value + students[index] + "\n"
        
    }
    document.getElementById("student_names").value = example_value
}

loadPage_1()

async function loadPage_2() {

    students = document.getElementById("student_names").value.split("\n")

    // Step 1: Fetch the page
    const response = await fetch("page_2.html");  // Wait for the fetch to complete
  
    // Step 2: Convert the response to text
    const data = await response.text();  // Wait for the text conversion
  
    // Step 3: Inject the content into the page
    document.getElementById('page_code').innerHTML = data;  // Update the content
    document.body.style.backgroundImage = ""; // Clear the background image
    document.body.style.backgroundColor = "bisque";

    

    //all other code is below

    shuffle_array(students);
    console.log("shuffled list = " + students);
  
    for (let index = 0; index < students.length; index += 2) {
        sub_list = [];
        sub_list.push(students[index]);
        if (index + 1 < students.length) {
            sub_list.push(students[index + 1]);
        }
        positions.push(sub_list.slice());
    }
  
    console.log(positions);
  
    const benchesData = positions;

    const classroom = document.getElementById('classroom');

    function createBench(benchNumber, studentNames) {
        const benchGroup = document.createElement('div');
        benchGroup.classList.add('bench-group');

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

        adjustGridLayout();
    }

    function adjustGridLayout() {
        const benches = document.querySelectorAll('.bench-group');

        classroom.style.gridTemplateColumns = `repeat(3, minmax(300px, 1fr))`;
        classroom.style.gridAutoRows = `minmax(100px, auto)`; // Adjust row height dynamically
    }

    // Populate the classroom with the provided benches data
    populateClassroom(benchesData);
}

//loadPage_2();
