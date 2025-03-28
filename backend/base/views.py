from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Note , PostClass
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework import status


from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken

from .serializers import NoteSerializer, UserRegisterSerializer, UserSerializer,ClassSerializer, GetClassSerializer

from datetime import datetime, timedelta


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            seriliazer = UserSerializer(request.user, many=False)

            res = Response()

            res.data = {'success':True}

            res.set_cookie(
                key='access_token',
                value=str(access_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key='refresh_token',
                value=str(refresh_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.data.update(tokens)
            return res
        
        except Exception as e:
            print(e)
            return Response({'success':False})


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)
            
            tokens = response.data
            access_token = tokens['access']

            res = Response()

            res.data = {'refreshed': True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='None',
                path='/'
            )
            return res

        except Exception as e:
            print(e)
            return Response({'refreshed': False})
        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):

    try:
        res = Response()
        res.data = {'success':True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('response_token', path='/', samesite='None')

        return res

    except Exception as e:
        print(e)
        return Response({'success':False})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'authenticated': True})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_class(request):
    if request.method == 'POST':
        data = request.data.copy()
        data['owner'] = request.user.id
        serializer = ClassSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def get_classes(request):
    classes = PostClass.objects.all().order_by('-id')   
    serializer = GetClassSerializer(classes, many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_class(request, class_id):
    try:
        class_instance = PostClass.objects.get(id=class_id, owner=request.user)
        class_instance.delete()
        return Response({'success': True}, status=status.HTTP_204_NO_CONTENT)
    except PostClass.DoesNotExist:
        return Response({'error': 'Class not found or not authorized'}, status=status.HTTP_404_NOT_FOUND)