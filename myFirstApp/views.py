from django.shortcuts import render, redirect
from .models import Pengguna
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .forms import ProfilePictureForm
from django.contrib.auth.decorators import login_required
from .models import DaftarKunjungan, Question, Tag
from .models import UserDaftarKunjungan, Reply, Article
from django.db.models import Count
from django.utils.text import slugify

def index(request):
    return render(request, 'index.html')

def register(request):
    return render (request, 'register.html')

def formregister(request):
    usernamevar = request.POST['username']
    passwordvar = request.POST['password']
    emailvar = request.POST['email']
    firstnamevar = request.POST['firstname']
    confirm_password = request.POST['confirm_password']

    user = Pengguna.objects.create_user(usernamevar, emailvar, passwordvar)
    user.first_name = firstnamevar

    if passwordvar != confirm_password:
            # Passwords don't match, handle this accordingly (e.g., show an error message)
            return render(request, 'register.html', {'error_message': 'Passwords salah, harap ulangi kembali!'})

    user.save()
    return render (request, 'index.html')

def formlogin(request):
     usernamevar = request.POST['username']
     passwordvar = request.POST['password']

     user = authenticate(username = usernamevar, password = passwordvar)
     if user is not None:
        login(request, user)
        return redirect('homepage')
     else:
        messages.error(request, 'Username atau Password yang anda masukkan salah')
        return redirect('index')

def homepage(request):
    user = request.user
    context = {
        'user' : user
    }
    return render (request, 'homepage.html', context)
    
from django.db.models import Count

def forumdiskusi(request):
    user = request.user
    # Annotate each question with the count of replies
    questions_with_reply_count = Question.objects.annotate(reply_count=Count('replies')).order_by('-created_at')
    top_users = Pengguna.objects.order_by('-poin_keaktifan')[:3]
    context = {
        'user': user,
        'questions_with_reply_count': questions_with_reply_count,
        'top_users': top_users
    }
    return render(request, 'forumdiskusi.html', context)

def pertanyaan(request, id_question):
    question = Question.objects.get(id = id_question)
    reply = Reply.objects.filter(question = question)
    context = {
        'question': question,
        'user': request.user,
        'reply': reply
    }
    return render (request, 'pertanyaan.html', context)

def tags(request):
    top_users = Pengguna.objects.order_by('-poin_keaktifan')[:3]
    tags = Tag.objects.all()
    context = {
        'top_users' : top_users,
        'tags': tags
    }
    return render (request, 'tags.html', context)

def userrank(request):
    top_users = Pengguna.objects.order_by('-poin_keaktifan')[:3]
    alphabet_users = Pengguna.objects.order_by('username')[:9]
    context = {
        'top_users' : top_users,
        'alphabet_users': alphabet_users 
    } 
    return render (request,'userrank.html', context)

def userprofile(request):
    user = request.user
    context = {
        'user' : user
    }

    if request.user.is_special_admin:
        return redirect('adminprofil')
    return render(request, 'userprofile.html', context)

def daftarkunjungan(request):
    user = request.user
    kunjungan_pengguna = UserDaftarKunjungan.objects.filter(user=user)
    context = {
        'user' : user,
        'kunjungan_pengguna': kunjungan_pengguna
    }
    return render (request, 'daftarkunjungan.html', context)

def artikel(request):
     return render (request, 'artikel.html')

def editprofile(request):
    if request.method == 'POST':
        usernamevar = request.POST.get('username')
        passwordvar = request.POST.get('password')
        emailvar = request.POST.get('email')
        firstnamevar = request.POST.get('firstname')
        
        user = request.user

        if usernamevar:
            user.username = usernamevar
        if emailvar:
            user.email = emailvar
        if firstnamevar:
            user.first_name = firstnamevar
        if passwordvar:
            user.set_password(passwordvar)

        user.save()
        messages.success(request, 'Profil berhasil diupdate!')
        return redirect('userprofile')  

    else:
        return render(request, 'userprofile.html')  # Render the edit profile page

def hapusakun(request):
    user = request.user
    user.delete()
    return render(request, 'index.html')


def upload_profile(request):
    if request.method == 'POST':
        form = ProfilePictureForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('userprofile')
    else:
        form = ProfilePictureForm(instance=request.user)
    return render(request, 'userprofile.html', {'form': form})

def buatDaftarKunjungan(request):
    if request.method == 'POST':
        user = request.user

        title = request.POST.get('judul')
        date = request.POST.get('date')
        image = request.FILES.get('upload')
        description = request.POST.get('deskripsi')

        kunjungan_baru = DaftarKunjungan(
            title=title,
            date=date,
            image=image,
            description=description
        )

        kunjungan_baru.save()
        UserDaftarKunjungan.objects.create(user=user, daftar_kunjungan=kunjungan_baru)
        return redirect('daftarkunjungan')
 
def add_question(request):
    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST['description']
        tags_str = request.POST.get('tags')  # Use request.POST.get() to safely get the value of 'tags'

        # Split the tags string by space
        tag_names = tags_str.split()

        question = Question(title=title, description=description, author=request.user)
        question.save()

        request.user.poin_keaktifan += 25
        request.user.save()

        # Iterate through each tag name and create Tag objects
        for tag_name in tag_names:
            # Ensure the tag name is unique (e.g., remove any special characters)
            tag_slug = slugify(tag_name)
            # Check if the tag already exists
            tag, created = Tag.objects.get_or_create(name=tag_slug)
            # Add the tag to the question
            question.tags.add(tag)

    return redirect('forumdiskusi')  # Redirect after successful POST

def balas_pertanyaan(request, id_question):
    content = request.POST['content']
    question = Question.objects.get(id = id_question)
    reply = Reply(content = content, question = question, author = request.user)
    reply.save()

    request.user.poin_keaktifan += 3
    request.user.save()

    return redirect('/pertanyaan/' + id_question + '/')


def tagset(request):
    tags = Tag.objects.all()
    context = {
        'tags': tags
    }
    return render(request, 'tagset.html', context)

def adminprofil(request):
    user = request.user
    context = {
        'user': user
    }
    return render (request, 'adminprofil.html', context)

def buatartikel(request):
    return render(request, 'buatartikel.html')

def tambahartikel(request):
    if request.method == 'POST':
        title = request.POST.get('judul')
        image = request.FILES.get('upload')
        description = request.POST.get('deskripsi')

        artikel_baru = Article(
            title=title,
            image=image,
            description=description
        )

        artikel_baru.save()
        return redirect('artikel')




    

        
       