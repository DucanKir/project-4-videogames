from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import AuthenticationFailed

from django.contrib.auth.models import User
from django.conf import settings
import jwt

class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):

        header = request.headers.get('Authentication')

        if not header:
            return None #this request is not authenticated

        if not header.startswith('Bearer'):
            raise AuthenticationFailed({'message': 'Invalid Authorization header'})

        token = header.replace('Bearer ', '') #get the token from the headers

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise AuthenticationFailed({'message': 'Invalid Token'})
        except User.DoesNotExist:
            raise AuthenticationFailed({'message': 'Invalid Subject'})

        return (user, token) #returns tuple
