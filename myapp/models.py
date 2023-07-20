from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin




# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',  
        blank=True,
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',  
        blank=True,
        verbose_name='user permissions'
    )

    def __str__(self):
        return self.email


class Contact(models.Model):
    msg_id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50)
    email = models.CharField(max_length=88 , default="")
    message = models.CharField(max_length=500, default="")

    def __str__(self):
        return self.nom

class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE ,default=1)
    is_best = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username}'

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question


User = get_user_model()
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profileimg = models.ImageField(upload_to='profile_images' , default='blank-profile-picture-g2175b7fdd_1280.png')
    def __str__(self):
        return self.user.username
@receiver(user_logged_in)
def create_profile(sender, user, request, **kwargs):
    try:
        profile = Profile.objects.get(user=user)
    except Profile.DoesNotExist:
        # There is no existing profile, so create a new one
        profile = Profile(user=user)
        profile.save()
    except Profile.MultipleObjectsReturned:
        # There are multiple profiles, so delete the extras and keep only one
        profiles = Profile.objects.filter(user=user)
        for p in profiles[1:]:
            p.delete()
        profile = profiles.first()
 

class Favorie(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'product')

class Categorie(models.Model):
    nom = models.CharField(max_length=255)
    def __str__(self):
        return self.nom

class Panier(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField('Product', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user}'s panier"

class Product(models.Model):
    CATEGORIES = (
        ('TELEPHONES', 'Telephones'),
        ('ACCESSOIRES', 'Accessoires'),
    )
    categorieProduit = models.CharField(max_length=255, choices=CATEGORIES, default='PHONE')
    categorie = models.ForeignKey(Categorie, related_name='products', on_delete=models.CASCADE)
    nom = models.CharField(max_length=255)
    id = models.AutoField(primary_key=True)
    description = models.TextField(blank=True, null=True)
    prix = models.FloatField()
    quantite = models.IntegerField(default=0)
    image = models.ImageField(upload_to='products_images')
    image1 = models.ImageField(upload_to='products_images', blank=True, null=True)
    image2 = models.ImageField(upload_to='products_images', blank=True, null=True)
    image3 = models.ImageField(upload_to='products_images', blank=True, null=True)
    vendu = models.BooleanField(default=False)
    cree_par = models.ForeignKey(User, related_name='products', on_delete=models.CASCADE)
    cree_a = models.DateTimeField(auto_now_add=True)
    Ecran = models.CharField(max_length=255, blank=True, null=True)
    Cameras = models.CharField(max_length=255, blank=True, null=True)
    Processeur = models.CharField(max_length=255, blank=True, null=True)
    Batterie = models.CharField(max_length=255, blank=True, null=True)
    Connectivite = models.CharField(max_length=255, blank=True, null=True)
    Fonctionnalites = models.CharField(max_length=255, blank=True, null=True)
    Etat = models.CharField(max_length=255, blank=True, null=True)
    Autre = models.CharField(max_length=255, blank=True, null=True)
    

    def __str__(self):
        return self.nom

class Commande(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantite = models.IntegerField()
    date_commande = models.DateTimeField(auto_now_add=True)
    prix_total = models.FloatField(default=0.0)

    class Meta:
        ordering = ['-date_commande']

    def __str__(self):
        return f"Commande de {self.quantite} x {self.product.nom} par {self.user.username}"

    def calculer_prix_total(self):
        return self.quantite * self.product.prix

    def save(self, *args, **kwargs):
        self.prix_total = self.calculer_prix_total()
        super(Commande, self).save(*args, **kwargs)

class CommandeForm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=200,blank=True,null=True)
    product_quantite = models.PositiveIntegerField(blank=True, null=True)
    email = models.EmailField()
    phone_1 = models.CharField(max_length=20)
    phone_2 = models.CharField(max_length=20, blank=True, null=True)
    code = models.CharField(max_length=20)
    commune = models.CharField(max_length=200)
    wilaya = models.CharField(max_length=200)
    command= models.TextField(blank=True, null=True)
    command_code = models.CharField(max_length=20, blank=True, null=True)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class CommentProcdut(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ManyToManyField(Profile)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username}'





   
