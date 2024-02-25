from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from rest_framework import status
from django.contrib.auth import authenticate



# Create your views here.

# Sigin and Login api Logics

class UserRegister(APIView):
    def post(self, request):
        try:
            data = request.data
            serializer = UserRegSerializer(data = data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data' : serializer.data, 'success' : True}, status=status.HTTP_201_CREATED)
            
            return Response({'errors' : serializer.errors, 'message' : 'Invalid Details'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({'status' : 500, 'message' : 'something went wrong' })
    
class LoginUser(APIView):
    def post(self, request):
        try:
            data = request.data
            serializer = Login(data = data)
            if serializer.is_valid():
                responce = serializer.get_token(data)        
                return Response(responce, status=status.HTTP_202_ACCEPTED) 
                        
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)   
         
        except Exception as e:
            return Response({'status' : 500, 'message' : 'something went wrong' })