
//get elements by id from index.html
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const currentMonthYear = document.getElementById('currentMonthYear');
const calendarGrid = document.getElementById('calendarGrid');
const contentDate = document.getElementById('contentDate')


//accessing current date, changed later based on prev or next button clicked, for generating dynaic calendar
let currentDate = new Date();

//accessing current date, used later for comparing to check whether the day is current date
let constantCurrentDate = new Date();


//function to dynamically generate calendar for the month that user wants to view by passing parameters for month and year
function generateCalendar(year, month){

    //getting first and last day's date for the month and year passed in the function parameter
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    //passing the string for month and year to the HTML div element, currentMonthYear
    currentMonthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

    //Each time function is called (for accessing different month calendar),
    //this will clear the calendar to generate the calendar for that new month value passed in func parameter.
    calendarGrid.innerHTML = "";

    //-----DAYS(SUN - SAT) HEADING-----

    //creating loop to create cells for days of the week sun-sat
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    for(let day=0; day<days.length; day++) {
        //creating div for making cells for month
        const monthCell = document.createElement('div');
        //assigning class 'calendar-month-cell'
        monthCell.classList.add('calendar-month-cell');
        //inserting day value(sat-sun) from variable 'days'
        monthCell.textContent = days[day];
        //appending month cell to calendarGrid
        calendarGrid.appendChild(monthCell);
    }
    
    

    //-----MAIN DYNAMIC BODY OF CALENDAR------

    //creating empty cells that exists before actual days of the month start
    for(let i=0; i<firstDay.getDay(); i++) {
        //creating div file for empty cell
        const emptyCell = document.createElement('div');
        //adding it to class 'calendar-list'
        emptyCell.classList.add('calendar-cell');
        //appending cell to the calendar grid
        calendarGrid.appendChild(emptyCell);
    }

    //creating cells to insert the numbering of actual days of the month
    for(let day=1; day<=lastDay.getDate(); day++) {
        //creating div file for cells to insert day value
        const cell = document.createElement('div');
        //adding it to class 'calendar-list'
        cell.classList.add('calendar-cell');

        //for the cell of the today's date, defining a different class called 'current-month-cell' to highlight it
        if(day === constantCurrentDate.getDate() && month === constantCurrentDate.getMonth() && year === constantCurrentDate.getFullYear()) {
            cell.classList.add('current-month-cell');
        }

        //inserting day to the cell
        cell.textContent = day;
        //appending the cell to the calendar grid
        calendarGrid.appendChild(cell);
    }

    //empty cells at the end
    for(let i=0; i<(42 - (firstDay.getDay() + lastDay.getDate())); i++) {
        //creating div file for empty cell
        const emptyCell = document.createElement('div');
        //adding it to class 'calendar-list'
        emptyCell.classList.add('calendar-cell');
        //appending cell to the calendar grid
        calendarGrid.appendChild(emptyCell);
    }
    
}
//-----DEFINING BUTTON FUNCTIONS-----

//defining the functionality of previous button when clicked
prevMonthButton.addEventListener('click', () => {
    //decreases current date's month value by 1
    //then passes this new current month value to generateCalendar function to generate calendar for that month of the year
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
})

//defining the functionality of next button when clicked
nextMonthButton.addEventListener('click', () => {
    //increases current date's month value by 1
    //then passes this new current month value to generateCalendar function to generate calendar for that month of the year
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
})



//initially when starting the app, runs the generateCalendar function to display the calendar
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());




//CONTENTS section

// function for displaying current date for the first time when loading the page
function updateContentContainer(selectedDay, selectedMonth, selectedYear) {
    contentDate.textContent = `${selectedDay}/${selectedMonth}/${selectedYear}`;
}

// Function to update the checked_status in the database
async function updateTaskStatus(taskId, checkedStatus) {
    try {
        const csrftoken = getCookie('csrftoken'); // Get the CSRF token

        const response = await fetch(`/DailyDiary1/update_task/${taskId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken, // Include the CSRF token in the headers
            },
            body: JSON.stringify({ checked_status: checkedStatus }),
        });

        if (!response.ok) {
            console.error('Error updating task status:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating task status:', error);
    }
}

// Function to delete a task from the database
async function deleteTask(taskId) {
    try {
        const csrftoken = getCookie('csrftoken'); // Get the CSRF token

        const response = await fetch(`/DailyDiary1/delete_task/${taskId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken, // Include the CSRF token in the headers
            },
        });

        if (!response.ok) {
            console.error('Error deleting task:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Function to retrieve CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Function to fetch and display tasks for a specific date
async function updateTasksForDate(year, month, day) {
    try {
        const response = await fetch(`/get_tasks/${year}/${month}/${day}/`);
        const data = await response.json();

        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML = ''; // Clear previous tasks

        if (data.tasks.length > 0) {
            const taskList = document.createElement('ul');
            taskList.classList.add('task-list');

            data.tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.textContent = task.task_detail;
            
                // Add a class based on the checked status
                taskItem.classList.add(task.checked_status ? 'completed' : 'not-completed');
            
                // Add click event listener to toggle line-through effect and update checked status
                taskItem.addEventListener('click', async () => {
                    taskItem.classList.toggle('completed');
                    
                    task.checked_status = !task.checked_status;
            
                    // Update the checked_status in the database
                    await updateTaskStatus(task.id, task.checked_status);
                    
                });
            
                // Add double click event listener to delete the task
                taskItem.addEventListener('dblclick', async () => {
                    // Delete the task from the database
                    await deleteTask(task.id);
            
                    // Remove the task item from the DOM
                    taskItem.remove();
                    
                });
            
                taskList.appendChild(taskItem);
            });

            tasksContainer.appendChild(taskList);
        } else {
            // Display a message when there are no tasks
            tasksContainer.textContent = 'No tasks for this date.';
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// when a calendar cell is clicked:
calendarGrid.addEventListener("click", async (event) => {
    const clickedCell = event.target;
    if (clickedCell.classList.contains("calendar-cell")) {
        if (clickedCell.textContent !== '') {
            const selectedDay = clickedCell.textContent;
            const selectedMonth = currentDate.getMonth() + 1; // Adding 1 because months are 0-based
            const selectedYear = currentDate.getFullYear();

            console.log('Clicked on:', selectedYear, selectedMonth, selectedDay);

            updateContentContainer(selectedDay, selectedMonth, selectedYear);

            await updateTasksForDate(selectedYear, selectedMonth, selectedDay);

        }
    }
});

// To ensure that when the page is loaded, by default, present date and present date's tasks are displayed
document.addEventListener("DOMContentLoaded", () => {
    const presentDay = currentDate.getDate();
    const presentMonth = currentDate.getMonth() + 1; // Adding 1 because months are 0-based
    const presentYear = currentDate.getFullYear();

    updateTasksForDate(presentYear, presentMonth, presentDay);

    updateContentContainer(presentDay, presentMonth, presentYear);
});



//For todo list section

const addTaskButton = document.getElementsByClassName('plus')[0];
const taskList = document.getElementById('task-list');

    function addTask() {
        const taskContent = prompt('Enter task:');

         // Check if the user clicked OK
        if (taskContent === null) {
            // User clicked Cancel or closed the prompt
            console.log("Prompt canceled.");
        } else {
            // User clicked OK, reload the page
            location.reload();
        }

//        if(taskContent){
//           const taskElement = document.createElement('li');
//            taskElement.innerText = taskContent;
//            taskElement.classList.add('task');
//            taskElement.addEventListener('click', toggleTaskStatus);
//            taskList.appendChild(taskElement);
//        }

        if (taskContent) {
            const selectedDay = contentDate.textContent.split('/')[0];
            const selectedMonth = contentDate.textContent.split('/')[1];
            const selectedYear = contentDate.textContent.split('/')[2];

            const data = {
                user_id: USER_ID,
                date: `${selectedYear}-${selectedMonth}-${selectedDay}`,
                task_detail: taskContent,
                checked_status: false
            };

            fetch('/add_task/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    function toggleTaskStatus(event) {
        const taskElement = event.currentTarget;
        //if double clicked, delete the task, if single clicked, mark it as completed
        if (event.detail === 2) { // Check if it's a double-click
        // Remove the task
        taskElement.remove();
        } else {
        // Toggle the completed class for single-click
        taskElement.classList.toggle('completed');
    }
    }

    addTaskButton.addEventListener('click', addTask);

