import uuid

from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from app.accounts.models import User
from app.accounts.serializers import UserListDisplaySerializer
from common.constants import constants
from common.constants.api_mandatory_field_lists import APIMandatoryFieldList
from common.util import util


def is_valid_signup_request(data):
    if not data:
        return False, 'payload cannot be empty'

    mandatory_fields = APIMandatoryFieldList.get_mandatory_field_list(key='signup')
    is_missing_mandatory_details, message = util.is_missing_param_in_request(dict=data, key_list=mandatory_fields)
    if is_missing_mandatory_details:
        return False, message

    email = data['email']
    try:
        user = User.objects.get(email=email, audit__is_deleted=False)
        return False, 'Given Email ID {0} is already registered'.format(email)
    except User.DoesNotExist:
        pass

    return True, None


def update_user(data):
    email = data['email']
    password = data['password']
    first_name = data['first_name']
    last_name = data['last_name']
    try:
        try:
            user = User.objects.get(email=email)
            User.objects.update_user(user=user, email=email, password=password, first_name=first_name,
                                     last_name=last_name)
        except User.DoesNotExist:
            User.objects.create_user(email=email, password=password, first_name=first_name, last_name=last_name)
        return True, None
    except Exception as e:
        return False, str(e)


@api_view(['POST'])
@permission_classes((AllowAny,))
@authentication_classes([])
def signup(request):
    """
    {
        "email": "emailone@yopmail.com",
        "password": "password_ONE",
        "first_name": "first_name_one",
        "last_name": "last_name_one",
    }
    """
    data = request.data
    is_valid_request, message = is_valid_signup_request(data=data)
    if not is_valid_request:
        return Response({'status': constants.API_ERROR, 'message': message}, status=status.HTTP_400_BAD_REQUEST)

    is_success, message = update_user(data=data)
    if not is_success:
        return Response({'status': constants.API_ERROR, 'message': message},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'status': constants.API_SUCCESS, 'message': 'Successfully registered new user'},
                    status=status.HTTP_201_CREATED)


def is_valid_login_request(data):
    if data is None or not data:
        return False, 'payload cannot be empty'

    mandatory_fields = APIMandatoryFieldList.get_mandatory_field_list(key='login')
    is_missing_mandatory_details, message = util.is_missing_param_in_request(dict=data, key_list=mandatory_fields)
    if is_missing_mandatory_details:
        return False, message

    email = data['email']
    password = data['password']

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return False, 'EmailID {0} is not registered with system'.format(email)

    if user.audit.is_deleted:
        return False, 'The account has been deactivated'

    user = authenticate(username=email, password=password)
    if not user:
        return False, 'Incorrect password provided'

    return True, None


@api_view(['POST'])
@permission_classes((AllowAny,))
@authentication_classes([])
# @csrf_exempt
def login(request):
    """
    {
        "email": "emailone@yopmail.com",
        "password": "password_ONE"
    }
    """
    data = request.data
    is_valid_request, message = is_valid_login_request(data=data)
    if not is_valid_request:
        return Response({'status': constants.API_ERROR, 'message': message}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=data['email'], password=data['password'])
    user.jwt_secret = uuid.uuid4()
    user.save()
    data = {'user_id': user.user_id, 'jwt': util.get_jwt(user=user)}
    return Response({'status': constants.API_SUCCESS, 'message': 'Successfully logged in', 'data': data},
                    status=status.HTTP_200_OK)


@api_view(['GET'])
def logout(request):
    user = request.user
    user.jwt_secret = uuid.uuid4()
    user.save()
    return Response({'status': constants.API_SUCCESS,
                     'message': 'Successfully logged out user with EmailID {0}'.format(user.email)},
                    status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_details(request):
    user = request.user
    return Response({'status': constants.API_SUCCESS, 'message': 'Successfully retrieved user details',
                     'data': {'user_details': UserListDisplaySerializer(user).data}}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_list(request):
    users = User.objects.filter(audit__is_deleted=False)
    if not len(users):
        return Response({'status': constants.API_SUCCESS, 'message': 'No active users found'},
                        status=status.HTTP_204_NO_CONTENT)

    return Response(
        {'status': constants.API_SUCCESS, 'message': 'Successfully retrieved {0} active users'.format(len(users)),
         'data': UserListDisplaySerializer(users, many=True).data}, status=status.HTTP_200_OK)