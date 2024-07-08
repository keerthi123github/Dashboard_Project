# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import DataModel
from .serializers import DataModelSerializer


@api_view(['POST'])
def signup(request):
    data = request.data
    user = User.objects.create_user(
        username=data['email'], email=data['email'], password=data['password'])
    user.save()
    return Response({'message': 'User created successfully'})


@api_view(['POST'])
def login(request):
    data = request.data
    user = authenticate(username=data['email'], password=data['password'])
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
    return Response({'message': 'Invalid credentials'}, status=401)


@api_view(['GET'])
def get_data(request):
    data = DataModel.objects.all()
    serializer = DataModelSerializer(data, many=True)
    return Response(serializer.data)


"""
class DataPointViewSet(viewsets.ModelViewSet):
    queryset = DataPoint.objects.all()
    serializer_class = DataPointSerializer
"""
