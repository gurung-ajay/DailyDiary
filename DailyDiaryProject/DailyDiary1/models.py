from django.db import models
from django.contrib.auth.models import User

# Create your models here.
    
#class todo(models.Model):
#    user = models.ForeignKey(User, on_delete=models.CASCADE)
#    date = models.DateField()
#    todo_info = models.CharField(max_length=200)
#    completed = models.BooleanField(default=False)
    
class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)    # automatically access id from user column
    date = models.DateField()
    task_detail = models.TextField()
    checked_status = models.BooleanField(default=False)
    