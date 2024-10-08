from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers


UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'  # ['username', 'email', 'password']

    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(email=clean_data['email'], username=clean_data['username'], password=clean_data['password'])  # , username=clean_data['username'])
        # user_obj.username = clean_data['username']
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise Exception("User not found")
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        # fields = ('email', 'username')
        fields = '__all__'
