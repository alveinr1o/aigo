from django import forms
from .models import Pengguna

class ProfilePictureForm(forms.ModelForm):
    class Meta:
        model = Pengguna
        fields = ['profile_picture']

