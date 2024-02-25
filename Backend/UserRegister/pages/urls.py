from django.urls import path
from .views import *

urlpatterns = [
    path('get-user/', UserPage.as_view()),
    path('get-user/<id>/', UserPage.as_view())
]
