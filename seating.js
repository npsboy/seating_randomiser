let positions = [];
let students = [
    "Aarav", "Aditya", "Amogh", "Anshruta", "Arham", "Arnav", "Arpita", "Ashmita", 
    "Atharva", "Bhavisha", "B.Vamsi", "B.Varnika", "Dhruv", "Dhruti", "Gautham", 
    "Iniya", "Jagrith", "Kenisha", "L.Vinod", "Moksha", "Pratham", "Reya", "Samarth", 
    "Sanjana", "Smera", "Tanishka", "Tushar", "Vanshika", "Varsha"
];
let og_students_list = students

let sub_list = [];

function isEven(num) {
    return Number.isInteger(num/2)
}


async function edit() {
    const response = await fetch("page_1.html");  // Wait for the fetch to complete
  
    // Step 2: Convert the response to text
    const data = await response.text();  // Wait for the text conversion
  
    // Step 3: Inject the content into the page
    document.getElementById('page_code').innerHTML = data;  // Update the content
    document.body.style.backgroundImage = "url('school_background.png')";
    load_example_values()
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
    for (let index = 0; index < og_students_list.length; index++) {
        example_value= example_value + og_students_list[index]
        if (index!=og_students_list.length-1) {
            example_value = example_value + "\n"
        }
        
    }
    document.getElementById("student_names").value = example_value
}

loadPage_1()

function create_arrangement() {
    students = document.getElementById("student_names").value.split("\n")
    students = students.filter(name => name !== "");
    og_students_list= students.slice()
    loadPage_2()
}

let your_name = "Tushar" //edit this
let your_name_lower_case = your_name.toLowerCase()

let friend_name = "Aditya"
let friend_name_lower_case = friend_name.toLowerCase()

function fix_case(array) {
    if (array.includes(your_name_lower_case)) {
        //array.indexof("tushar") = "Tushar" 
        array[array.indexOf(your_name_lower_case)] = your_name 
    }
    if (array.includes(friend_name_lower_case)) {
        array[array.indexOf(friend_name_lower_case)] = friend_name
    }
}
function assign_positions() {
    students = og_students_list.slice()
    console.log("shuffled list = " + students);
    fix_case(students)
    let extra_push_list = []
    if (students.includes(your_name)&&students.includes(friend_name)) {
        extra_push_list = [your_name,friend_name]
        students.splice(students.indexOf(friend_name),1)
        students.splice(students.indexOf(your_name),1)
    }
    let random_number_1 = Math.floor(Math.random() *students.length)
    let students_length = students.length
    for (let index = 0; index < students_length/2; index++) {
        sub_list = [];
        random_number_1 = Math.floor(Math.random() *students.length)
        sub_list.push(students[random_number_1]);
        students.splice(random_number_1,1)

        if (students.length != 0) {
            random_number_1 = Math.floor(Math.random() *students.length)
            sub_list.push(students[random_number_1]);
            students.splice(random_number_1,1)
        }

        positions.push(sub_list.slice());
    }
    if (extra_push_list.length != 0){
        positions.splice((Math.floor(Math.random() *positions.length)), 0, extra_push_list)
    }
  
    console.log(positions);
}

function assign_benches() {
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

async function loadPage_2() {

    // Step 1: Fetch the page
    const response = await fetch("page_2.html");  // Wait for the fetch to complete
  
    // Step 2: Convert the response to text
    const data = await response.text();  // Wait for the text conversion
  
    // Step 3: Inject the content into the page
    document.getElementById('page_code').innerHTML = data;  // Update the content
    document.body.style.backgroundImage = ""; // Clear the background image
    document.body.style.backgroundColor = "bisque";
    document.getElementById("classroom").innerHTML = ""
    positions = []
    

    //all other code is below
    assign_positions()
    assign_benches()
    
}

//loadPage_2();
