from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name='home'),
    path('login', views.my_login, name='login'),
    path('login/submit/', views.login_submit, name='login_submit'),
    path('register', views.register, name='register'),
    path('register/submit/', views.register_submit, name='register_submit'),
    path('diary', views.diary, name='diary'),
    path('add_task/', views.add_task, name='add_task'),
    path('get_tasks/<int:year>/<int:month>/<int:day>/', views.get_tasks_for_date, name='get_tasks_for_date'),
    
    # URL for updating task
    path('DailyDiary1/update_task/<int:task_id>/', views.update_task, name='update_task'),
    
    # URL for deleting a task
    path('DailyDiary1/delete_task/<int:task_id>/', views.delete_task, name='delete_task'),

    path('user', views.user, name='user'),
]

