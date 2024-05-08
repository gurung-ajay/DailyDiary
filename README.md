# Daily Diary App with Django

## About the app
The "Daily Diary" web application created using django, represents a focused effort to streamline individual task management through a to-do list style feature. The app allows users to effortlessly create, mark as done, or delete tasks using a straightforward calendar interface. Throughout this endeavor, the primary goal has been to enhance personal organizational efficiency, providing a seamless and intuitive experience for users in their daily quest to stay organized.

## Installation
To install the app, follow the steps below:
1. Clone the repository
2. Install the dependencies for running the app. These are included in the file DailyDiaryProject/requirements.txt as:
   asgiref==3.7.2
   Django==4.2.5
   sqlparse==0.4.4
   typing_extensions==4.9.0
   tzdata==2023.3
   For installing run the command below in terminal:
   * pip install -r requirements.txt
3. Now run this file DailyDiaryProject/manage.py by running this command on terminal:
   * py manage.py runserver
 

## App Demonstration
### Register account / Login into the app
1. When user opens the app, they will be greeted with this home page:

   ![image](https://github.com/gurung-ajay/DailyDiary/assets/135496373/4fa47aa9-d103-4b72-adfc-bf45032c470a)
 
2. From home page, user can click on the ‘Login’ button to go into login page for authentication. This is what login page looks like:

   ![image](https://github.com/gurung-ajay/DailyDiary/assets/135496373/2860732b-0f00-478d-844f-797b3cee477a)

3. If the user does not have an account, they can click ‘Sign Up’ button to register new account. This is what register page looks like:
 
   ![image](https://github.com/gurung-ajay/DailyDiary/assets/135496373/6b7fecf3-eee6-4380-bd54-cfd5ef8c1835)

4. The user is then required to fill the form and press ‘Submit’ button. Once they presses the button, he will be redirected back to the login page where they can enter their credentials to log in.
 
   ![image](https://github.com/gurung-ajay/DailyDiary/assets/135496373/4bcd276e-f129-4e00-a6ae-ee408fa7bed1)

5. If the credentials are valid, they will be logged into the app and they can view their diary.
 
   ![image](https://github.com/gurung-ajay/DailyDiary/assets/135496373/9ff78c2b-077b-4fd4-aa1e-2985d7fa9130)

6. Once logged in, to view the user details the user can click on the user icon located at the top left corner of the screen. Once they click it, they will see this page:
 
   ![image](https://github.com/gurung-ajay/DailyDiary/assets/135496373/0cb8be96-2d8f-40fb-8d41-08f67c24d2ee)


### Create a new task
1. To create a new task in to-do list, user has to click on the diary icon to open the diary. It will go back to the diary interface.
2. From this interface, the user has to first click on the date from calendar. Then on the right page, the selected date along with the tasks created for that date will be displayed.

   ![image](https://github.com/gurung-ajay/DailyDiary/assets/135496373/9ff78c2b-077b-4fd4-aa1e-2985d7fa9130)

4. Then they have to click on the ‘+’ icon at the bottom right corner of the page. It will open up a prompt pop up at the top of the page saying ‘Enter task:’
5. On the prompt, the user has to enter the task, for e.g. ‘Study for exam’, and press enter.
 
   ![image](https://github.com/gurung-ajay/DailyDiary/assets/135496373/1d655d55-5313-4079-904e-85cd93922d00)

6. The new task ‘Study for exam’ will now appear on the right page. 
 
   ![image](https://github.com/gurung-ajay/DailyDiary/assets/135496373/442a7022-d29b-4755-85a0-a5ee03e0e063)

### To mark task as done
1. To mark a task a task as done, the user simply has to click once on the task and it will be crossed. Here, I have clicked the task ‘Study for exam’

   ![image](https://github.com/gurung-ajay/DailyDiary/assets/135496373/ad4fa7d5-a1d2-436e-8395-4e5af3a89174)


### To Delete a task
1. Tasks can be deleted by double clicking on them. They will then be deleted from database and disappear from screen. Here, I have deleted the task ‘Study for exam’ by double clicking on it.
 
   ![image](https://github.com/gurung-ajay/DailyDiary/assets/135496373/42091a2d-c0f1-4223-bd6a-9b5462770d08)

