from rest_framework import serializers
from .models import *


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = UserPages
        fields = ['id', 'company_name', 'role', 'date_of_joining', 'last_date']
        
        
        def validate(self, data):
            if not UserPages.objects.filter(username = data['username']).exists():
                raise serializers.ValidationError("Not Athorized user")
            print(data)
            
            return data

