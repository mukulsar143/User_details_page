from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserPages(models.Model):
    
    username = models.ForeignKey(User, on_delete=models.CASCADE, blank = True, related_name = 'user')
    company_name = models.CharField(max_length=50)
    role = models.CharField(max_length=50)
    date_of_joining = models.DateField(auto_now=False, auto_now_add=False)
    last_date = models.DateField(auto_now=False, auto_now_add=False)
    
    def __str__(self) -> str:
        return self.company_name
