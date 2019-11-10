import os
from enum import Enum

from route_planner import settings

API_ERROR = 'error'
API_SUCCESS = 'success'


class APIMethods(Enum):
    POST = 1
    PUT = 2
    GET = 3
    DELETE = 4


TEST_USER_EMAIL = 'test_user_email@company.com'
TEST_USER_PASSWORD = 'test_user_PASSW0Rd!'
TEST_USER_NEW_PASSWORD = 'test_user_new_PASSW0Rd!'
