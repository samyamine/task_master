from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone


# Create your models here.
class AppUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('L\'adresse email doit être fournie')
        if not username:
            raise ValueError('Le nom d\'utilisateur doit être fourni')
        if not password:
            raise ValueError('Le mot de passe doit être fourni')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.is_active = True
        user.save()
        return user

    def create_superuser(self, email, username, password=None):
        if not email:
            raise ValueError('L\'adresse email doit être fournie')
        if not username:
            raise ValueError('Le nom d\'utilisateur doit être fourni')
        if not password:
            raise ValueError('Le mot de passe doit être fourni')
        user = self.create_user(email, username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True)
    level = models.IntegerField(default=1)  # Niveau de l'utilisateur
    xp = models.IntegerField(default=0)  # Points d'expérience de l'utilisateur
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AppUserManager()

    def __str__(self):
        return self.email

    def add_xp(self, points):
        """Ajouter de l'XP et ajuster le niveau si nécessaire"""
        self.xp += points
        while self.xp >= self.level_up_threshold():
            self.level += 1
            self.xp -= self.level_up_threshold()
        self.save()

    def level_up_threshold(self):
        """Définir le seuil de passage au niveau suivant (par exemple, 100 XP par niveau)"""
        return 100
