from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('formregister/', views.formregister, name='formregister'),
    path('formlogin/', views.formlogin, name= 'formlogin'),
    path('homepage/', views.homepage, name = 'homepage'),
    path('forumdiskusi/', views.forumdiskusi, name = 'forumdiskusi'),
    path('pertanyaan/<str:id_question>/', views.pertanyaan, name='pertanyaan'),
    path('tags/', views.tags, name = "tags"),
    path('userrank/', views.userrank, name ="userrank"),
    path('userprofile/', views.userprofile, name="userprofile"),
    path('daftarkunjungan/', views.daftarkunjungan, name = "daftarkunjungan"),
    path('artikel/', views.artikel, name ="artikel"),
    path('editprofile/', views.editprofile, name ="editprofil"),
    path('hapusakun/', views.hapusakun, name="hapusakun"),
    path('upload_profile/', views.upload_profile, name="upload_profile"),
    path('buat-daftar-kunjungan/', views.buatDaftarKunjungan, name='buatDaftarKunjungan'),
    path('add_question/', views.add_question, name="add_question"),
    path('balas_pertanyaan/<str:id_question>/', views.balas_pertanyaan, name="balas_pertanyaan"),
    path('tagset/', views.tagset, name="tagset"),
    path('adminprofil/', views.adminprofil, name="adminprofil"),
    path('buatartikel/', views.buatartikel, name="buatartikel"),
    path('tambahartikel/', views.tambahartikel, name="tambahartikel")
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
