from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import * 
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class UserPage(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    def get(self, request):
        try:
            obj = UserPages.objects.filter(username = request.user)
            serializer = PageSerializer(obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Smething went wrong"}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)   

    def post(self, request):
        try:
            data = request.data              
            serializer = PageSerializer(data = data)
            if serializer.is_valid():   
                serializer.validated_data['username'] = request.user            
                serializer.save() 
                return Response(serializer.data, status=status.HTTP_201_CREATED)                
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    def patch(self, request, id):

        try:        
            data = request.data        
            obj = UserPages.objects.filter(id = id)
            if not obj:
                return Response({'Invalid id'})
            
            if not User.objects.filter(username = obj[0].username):
                return Response("invalid user")           

            
            serializer = PageSerializer(obj[0], data = data, partial = True)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            
            return Response({'status' : 400, 'message' : 'internal errors', 'data' : serializer.errors})
        
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    def delete(self, request, id):
        try:
            data = request.data    
            obj = UserPages.objects.filter(id = id)   
            
            if not obj.exists():
                return Response('invalid id') 
            
            if not User.objects.filter(username = obj[0].username):
                return Response('invalid user')
            
            obj[0].delete()
            return Response('successfully deleted')
        
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    