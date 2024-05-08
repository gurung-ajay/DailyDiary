from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Task
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_POST, require_http_methods
from django.contrib.auth.decorators import login_required

# Create your views here.
def home(request):
    return render(request, 'home.html') 

def my_login(request):
    return render(request, 'login.html') 

def login_submit(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if email and password:
            user = authenticate(request, username=email, password=password)

            if user is not None:
                login(request, user)
                return redirect('diary')  # Redirect to the diary page upon successful login
            else:
                # Authentication failed; display an error message
                error_message = "Incorrect email or password."
        else:
            error_message = "Please enter both email and password."

    return render(request, 'login.html', {'error_message': error_message if 'error_message' in locals() else ''})

def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')

def register_submit(request):
    if request.method == 'POST':
        # Get data from the form
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        # Create a new User instance and save it to the database
        user = User.objects.create_user(username=email, first_name=first_name, last_name=last_name, email=email, password=password)
        
        return render(request, 'login.html')

@login_required
def diary(request):
    user_info = {   # for displaying user specific details in web page
        'user_id': request.user.id,
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
        'email': request.user.email,
    }
    return render(request, 'diary.html', {'user_info': user_info})


@login_required
def user(request):
    user_info = {   # for displaying user specific details in web page
        'user_id': request.user.id,
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
        'email': request.user.email,
        'password': request.user.password
    }
    return render(request, 'user.html',  {'user_info': user_info})



@csrf_exempt
def add_task(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data['user_id']
        date = data['date']
        task_detail = data['task_detail']
        checked_status = data['checked_status']

        user = User.objects.get(id=user_id)

        task = Task.objects.create(
            user=user,
            date=date,
            task_detail=task_detail,
            checked_status=checked_status
        )

        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error'})
    
def get_tasks_for_date(request, year, month, day):
    selected_date = f"{year}-{month}-{day}"
    tasks = Task.objects.filter(date=selected_date, user=request.user)
    task_list = [{'id': task.id, 'task_detail': task.task_detail, 'checked_status': task.checked_status} for task in tasks]
    return JsonResponse({'tasks': task_list})


@require_POST
def update_task(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    
    try:
        # Retrieve JSON data from the request body
        request_data = json.loads(request.body.decode('utf-8'))

        # Extract the checked_status value
        checked_status = request_data.get('checked_status', False)

        # Update the task's checked_status
        task.checked_status = checked_status
        task.save()

        return JsonResponse({'message': 'Task updated successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@require_http_methods(["DELETE"])
def delete_task(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    
    try:
        task.delete()
        return JsonResponse({'message': 'Task deleted successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)