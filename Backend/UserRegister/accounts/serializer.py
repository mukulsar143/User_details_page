from rest_framework import serializers
from django.contrib.auth.models import User
from .models import * 
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth import password_validation


class users(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserRegSerializer(serializers.Serializer): 
    
    username = serializers.CharField()
    first_name = serializers.CharField(max_length = 50)
    last_name = serializers.CharField(max_length = 50)
    password = serializers.CharField(max_length = 15)
    confirm_password = serializers.CharField(max_length=15, write_only=True, required=True)       
       
    
    def validate(self, data):
        user = User.objects.all()
        
        if user.filter(username = data['username']).exists():
            raise serializers.ValidationError('username already exists..')
        
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("passwrord didn't match")
        
        return data
        
    def create(self, data):
        user = User.objects.create(
            username = data['username'],
            first_name = data['first_name'],
            last_name = data['last_name'],
        )
        user.set_password(data['password'])        
        user.save()
        
        return data
    
class Login(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
  
        if not User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError('Username not found')
        
        return data

    def get_token(self, validated_data):
        
        user = authenticate(username=validated_data['username'], password=validated_data['password'])
        
    
        if not user:
            raise serializers.ValidationError("Invalid credentials")  
        
        token, _ = Token.objects.get_or_create(user = user)
              
        return {'success' : True, 'token' : str(token.key)}
        
    
        
        
        