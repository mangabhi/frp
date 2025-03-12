from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    name = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='note')
    
class PostClass(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField()
    
