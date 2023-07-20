import random 
from django.urls import reverse
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login 
from django.shortcuts import render , redirect , get_object_or_404
from django.contrib import messages ,  auth
from django.contrib.auth.models import User  
from .models import Contact , Profile , Categorie , Product , Feedback , FAQ , CommentProcdut , Favorie, Commande , Panier , CommandeForm
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator , PasswordResetTokenGenerator
from django.template.loader import render_to_string
from django.contrib import messages
import base64
from .utils import password_reset_token


# Create your views here.
def home(request):
    last_products = Product.objects.filter(vendu=False)[0:1] or None
    products = Product.objects.filter(vendu=False ,categorieProduit='TELEPHONES')
    accessoire_products = Product.objects.filter(vendu=False, categorieProduit='ACCESSOIRES')
    categories = Categorie.objects.all()
    
    best_feedbacks = Feedback.objects.filter(is_best=True)[:3] 
    faqs = FAQ.objects.all()
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')
    context = {
        'last_products':last_products,
        'products':products,
        'best_feedbacks': best_feedbacks,
        'faqs': faqs,
        'categories':categories,
        'accessoire_products': accessoire_products,
    }
    return render(request,'home.html', context)


def login_view(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('/')  
        else:
            error_message = 'email ou mot de pass est fausse'
            return render(request, 'login.html', {'error_message': error_message})
    else:
        return render(request, 'login.html')

def logout(request):
    auth.logout(request)
    return render(request, 'login.html')

def register(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    if request.method == 'POST':
        username = request.POST['Username']
        email = request.POST['email']
        first_name = request.POST['nom']
        last_name = request.POST['prenom']
        password = request.POST['mdp']
        password2 = request.POST['confmdp']

        if password == password2:
            if User.objects.filter(email=email).exists() :
                messages.error(request,' Email aleardy used ')
                return redirect('Register')
            elif User.objects.filter(username=username).exists():
                messages.error(request,'this username aleardy used')
                return redirect('Register')
            else:
                user = User.objects.create_user(username=username , email=email , password=password, first_name=first_name,last_name=last_name)
                user.save()
                #create a profile object for the new  user
                user_model = User.objects.get(username=username) 
                new_profile = Profile.objects.create(user=user_model)
                
                return redirect('succes')
        else:
            messages.error(request,'password not the same')
            return redirect('Register')
    

        #create a profile object for the new  user

        user_model = User.objects.get(username=username) 
        new_profile = Profile.objects.create(user=user_model)
        

        return redirect('succes')
    else:        
        return render(request,'Registre.html')
    

@login_required(login_url='login')    
def settings(request, username):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    user = User.objects.get(username=username)
    user_profile = Profile.objects.get(user=user)
    
    if request.method == 'POST':
        if 'nom' in request.POST:
            user.first_name = request.POST['nom']
        
        if 'prenom' in request.POST:
            user.last_name = request.POST['prenom']
        
        if 'email' in request.POST:
            user.email = request.POST['email']
        
        if request.FILES.get('image'):
            user_profile.profileimg = request.FILES.get('image')
        
        current_password = request.POST['password-actu']
        password = request.POST['password-nouv']
        password1 = request.POST['password-conf']
        if current_password and user.check_password(current_password) and password == password1:
            user.set_password(password)
        
        user.save()
        user_profile.save()
        return redirect('parameter',username=username)
    
    context = {
        'user': user,
        'user_profile': user_profile,
    }
    return render(request, 'parameter.html', context)

@login_required(login_url='login')
def passer_commande(request, product_id):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    product = Product.objects.get(id=product_id)
    if request.method == 'POST':
        quantite = int(request.POST['quantite'])
        if product.vendu:
            messages.error(request, f"Le produit {product.nom} est déjà vendu!")
            return redirect('produits')
        if quantite > product.quantite:
            messages.error(request, f"Quantité indisponible pour le produit {product.nom}")
            return redirect('produits')
        commande = Commande(product=product, user=request.user, quantite=quantite)
        commande.save()
        product.quantite -= quantite
        if product.quantite == 0:
            product.vendu = True
        product.save()
        messages.success(request, f"La commande du produit {product.nom} a été placée avec succès!")
        return redirect('commandes')
    else:
        return render(request, 'panier.html', {'product': product})

@login_required(login_url='login')
def mescommandes(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    commandes = Commande.objects.filter(user=request.user)
    if commandes:
        last_commande = commandes.first()
        other_commandes = commandes[1:]
        context = {
            'last_commande': last_commande,
            'commandes': other_commandes,
        }
        template = 'commandes.html'
    else:
        last_commande = None
        other_commandes = None
        template = 'commande-vide.html'
        context = {}

    return render(request, template, context)


def commandeForm(request):
    if request.method == 'POST':
        nom = request.POST.get('nom')
        prenom = request.POST.get('prenom')
        email = request.POST.get('email')
        tel = request.POST.get('tel')
        addresse = request.POST.get('addresse')
        commune = request.POST.get('commune')
        message = request.POST.get('message')
        teltwo = request.POST.get('teltwo')
        wilaya = request.POST.get('wilaya')
        commande = CommandeForm.objects.create(
            phone_1=tel,
            adresse=adresse,
            commune=commune,
            user=request.user,
            message=message,
            phone_2=teltwo,
            wilaya=wilaya,
            command=commande
        )
        # You can redirect to any page you want after the form is submitted.
        return redirect('erreur')

    return render(request, 'command.html')

def confCommande(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')
        
    return render (request, 'confCommande.html')

def products(request):
    query = request.GET.get('query', '')
    categorie_id = request.GET.get('categorie', 0)
    categories = Categorie.objects.all()
    products = Product.objects.filter(vendu=False)

    if categorie_id:
        products = products.filter(categorie_id=categorie_id)

    if query:
        products = products.filter(Q(nom__icontains=query) | Q(description__icontains=query))
    search_results = False
    if query:
        search_results = True

    context = {
        'products': products,
        'query': query,
        'categories': categories,
        'categorie_id': int(categorie_id)
    }
    return render(request, 'produits.html', context)


@login_required(login_url='login')
def favorie(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    favories = Favorie.objects.filter(user=request.user)
    if favories :
        template = 'favorie.html'
    else:
        template = 'favorie_vide.html'
    return render(request, template , {'favories': favories})

def addFavorie(request, product_id):
    product = get_object_or_404(Product, id=id)

    
    # Get or create the user's panier
    favorie, created = Favorie.objects.get_or_create(user=request.user)

    favorie.products.add(product)
    
    # Redirect to the product page
    referer = request.META.get('HTTP_REFERER')
    if 'detail' in referer:
        # Redirect to the product detail page
        return redirect('detail', id=id)
    else:
        # Redirect to the products page
        return redirect(reverse('products') + '?added=true')

def remove_from_favorie(request, id):
    product = get_object_or_404(Product, id=id)
    favorite = Favorie.objects.filter(user=request.user, product=product).first()
    if favorite:
        favorite.delete()
    return redirect('product_detail', id=id)

@login_required(login_url='login')
def detail(request, id):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    if request.method == 'POST':
        user = request.user
        comment = request.POST['message']
        user_profile = Profile.objects.get(user=request.user)

        # Create a new Comment for Product
        comment = CommentProcdut(user=user, comment=comment)
        comment.save()
        user_profile = Profile.objects.get(user=request.user)
        comment.profile.add(user_profile)
        return redirect('detail', id=id) 
    else:
        user_profile = Profile.objects.get(user=request.user)
        first_name = request.user.first_name
        last_name = request.user.last_name
        comments = CommentProcdut.objects.all()
        context = {
            'comments':comments,
            'user_profile': user_profile,
            'first_name': first_name,
            'last_name': last_name,
        }

    product =Product.objects.get(id=id)
    context['id'] = id
    context['product'] = product
    return render(request, 'produit.html',context)

@login_required(login_url='login')
def add_to_panier(request, id):
    # Get the product object
    product = get_object_or_404(Product, id=id)
    
    # Get or create the user's panier
    panier, created = Panier.objects.get_or_create(user=request.user)
    
    # Add the product to the panier
    panier.products.add(product)
    
    # Redirect to the product page
    referer = request.META.get('HTTP_REFERER')
    if 'detail' in referer:
        # Redirect to the product detail page
        return redirect('detail', id=id)
    else:
        # Redirect to the products page
        return redirect(reverse('products') + '?added=true')

@login_required(login_url='login')
def panier(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    cart, created = Panier.objects.get_or_create(user=request.user)
    products = cart.products.all()
    if request.method == "POST":
        product_id = request.POST.get("product_id")
        product = Product.objects.get(id=product_id)
        cart.products.add(product)
        cart.save()
        return redirect("panier")

    context = {
        "products": products,
        }
    if products :
        template = 'panier.html'
    else:
        template = 'panier_vide.html'
    return render(request, template , context )


def delete_product(request, product_id):
    cart, created = Panier.objects.get_or_create(user=request.user)
    product = Product.objects.get(id=product_id)
    cart.products.remove(product)
    return redirect("panier")
    
password_reset_token = PasswordResetTokenGenerator()
User = get_user_model() 
def forgot_password(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    if request.method == 'POST':
        email = request.POST.get('email')
        try:
            user = User.objects.get(email=email)
            token = password_reset_token.make_token(user)
            uidb64 = base64.urlsafe_b64encode(str(user.pk).encode()).decode()
            reset_url = request.build_absolute_uri('/modifie/') + uidb64 + '/'  + token + '/'
            email_subject = 'Password Reset Request'
            email_body = render_to_string('reset_password_email.html', {
                'user': user,
                'reset_url': reset_url
            })
            send_mail(email_subject, '', '06Mobileestin@gmail.com', [email], html_message=email_body)
            messages.success(request, 'A password reset link has been sent to your email.')
            return redirect('recuperation')
        except User.DoesNotExist:
            messages.error(request, 'No user found with the provided email address.')
            return redirect('recuperation')

    return render(request, 'recuperation.html')


def reset_password(request, uidb64, token):
    try:
        uid = base64.urlsafe_b64decode(uidb64).decode()
        user = User.objects.get(pk=uid)
        if request.method == 'POST':
            password = request.POST['motDePasse']
            password1 = request.POST['confirmationMotDePasse']
            if password == password1:
                user.set_password(password)
                user.save()
                return redirect('succes1')
            else:
                messages.error(request, 'Password confirmation does not match.')
                return redirect('modifie/uib64/token')
                
        return render(request, 'modifie.html', {'token': token})
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        messages.error(request, 'Invalid password reset link.')
        return redirect('recuperation')


def about(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    return render(request , 'about.html')

@login_required(login_url='login')
def profile(request , pk):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    user_object = User.objects.get(username=pk)
    user_profile = Profile.objects.get(user=user_object)
    context = {
        'pk':pk,
        'user_object': user_object,
        'user_profile': user_profile,
    }
    return render(request, 'profile.html' , context)

def succes(request):
    return render(request, 'succes.html')

def succes1(request):
    return render(request, 'succes1.html')

def condition(request):
        if request.method == 'GET':
           query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

        return render(request, 'condition.html')

def contact(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    if request.method=="POST":
        nom = request.POST.get('nom', '')
        email = request.POST.get('email', '')
        message = request.POST.get('message', '')
        cntct = Contact(nom=nom, email=email, message=message)
        cntct.save()
        messages.success(request, 'Your message has been sent')

    return render(request, 'contact.html')

def erreur(request):
    return render(request,erreur.html)

@login_required(login_url='login')
def feedback(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        if query:
            products = Product.objects.filter(Q(nom__icontains=query) | Q(description__icontains=query))
            return redirect(f'/products?query={query}')

    if request.method == 'POST':
        user = request.user
        comment = request.POST['message']
        profile = get_object_or_404(Profile, user=user)
        # Create a new Feedback object
        feedback = Feedback(user=user, comment=comment , profile=profile)
        feedback.save()
        messages.success(request, 'Commentaire soumis avec succès. Merci!')
        return redirect('feedback') 
    else:
        user_profile = Profile.objects.get(user=request.user)
        first_name = request.user.first_name
        last_name = request.user.last_name
        feedbacks = Feedback.objects.all()
        context = {
            'feedbacks':feedbacks,
            'user_profile': user_profile,
            'first_name': first_name,
            'last_name': last_name,
        }
        return render(request, 'feedback.html',context)
