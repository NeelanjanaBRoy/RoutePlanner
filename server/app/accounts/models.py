import uuid

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.core import validators
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

# from app.audits.models import Audit
# from app.audits.views import get_new_audit
from common.util import util


class UserManager(BaseUserManager):
    def _create_user(self, email, password, first_name, last_name, is_superuser, **extra_fields):
        now = timezone.now()
        email = self.normalize_email(email)

        user = self.model(email=email, last_login=now, username=email, first_name=first_name, last_name=last_name,
                          is_superuser=is_superuser, **extra_fields)

        if not util.is_empty_str(password):
            user.set_password(password)

        user.save(using=self._db)
        # user.audit = get_new_audit(user=user)
        user.save()
        return user

    def create_user(self, email=None, password=None, first_name=None, last_name=None, **extra_fields):
        is_superuser = False if util.is_empty(dict=extra_fields, key='is_superuser') else extra_fields['is_superuser']
        return self._create_user(email=email, password=password, is_superuser=is_superuser, first_name=first_name,
                                 last_name=last_name, **extra_fields)

    def update_user(self, user, email=None, password=None, first_name=None, last_name=None, **extra_fields):
        if not user:
            return None
        if password:
            user.set_password(password)
        if email:
            user.email = email
            user.username = email
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        user.save()
        user.audit.updated_at = timezone.now()
        user.audit.is_deleted = False
        user.audit.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self._create_user(email=email, password=password, is_superuser=True, **extra_fields)
        user.is_staff = True
        user.email_confirmed = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # audit = models.ForeignKey(Audit, on_delete=models.CASCADE, blank=True, null=True)
    email = models.EmailField(max_length=255, unique=True,
                              validators=[validators.EmailValidator(message='Provide a valid email')])
    username = models.EmailField(max_length=255, unique=True,
                                 validators=[validators.EmailValidator(message='Provide a valid email')])
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    jwt_secret = models.UUIDField(default=uuid.uuid4, editable=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    def __unicode__(self):
        return self.email

    def __str__(self):
        return self.__unicode__()


def jwt_get_secret_key(self_model):
    return self_model.jwt_secret
