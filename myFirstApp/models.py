from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Pengguna(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    poin_keaktifan = models.IntegerField(default=0)
    @property
    def is_special_admin(self):
        return self.username == 'Admin RIO'

class DaftarKunjungan(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField()
    image = models.ImageField(upload_to='daftar_kunjungan_images/')
    description = models.TextField()

    def __str__(self):
        return self.title
    
class UserDaftarKunjungan(models.Model):
    user = models.ForeignKey(Pengguna, on_delete=models.CASCADE)
    daftar_kunjungan = models.ForeignKey(DaftarKunjungan, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']  # Default ordering by creation time

    def __str__(self):
        return f'{self.user.username} - {self.daftar_kunjungan.title}'
    
class Admin(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)

class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class Question(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    author = models.ForeignKey(Pengguna, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Reply(models.Model):
    question = models.ForeignKey(Question, related_name='replies', on_delete=models.CASCADE)
    author = models.ForeignKey(Pengguna, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Reply by {self.author} on {self.question}'
    

class Article(models.Model):
   title = models.CharField(max_length=200)
   image = models.ImageField(upload_to='daftar_artikel_images/')
   description = models.TextField()

