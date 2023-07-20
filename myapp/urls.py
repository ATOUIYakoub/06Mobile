from django.urls import path
from myapp import views


urlpatterns = [
    path('',views.home , name="home"),
    path('contact', views.contact , name='contact'),
    path('feedback', views.feedback , name='feedback'),
    path('login', views.login_view , name='login'),
    path('logout', views.logout , name='logout'),
    path('Register', views.register , name='Register'),
    path('succes', views.succes , name='succes'),
    path('succes1', views.succes1 , name='succes1'),
    path('condition', views.condition , name='condition'),
    path('panier', views.panier , name='panier'),
    path('datail/<int:id>', views.add_to_panier, name='add_to_panier'),
    path('about', views.about , name='about'),
    path('products',views.products , name="products"),
    path('commande',views.mescommandes, name="commande"),
    path('confCommande',views.confCommande, name="confCommande"),
    path('command',views.commandeForm, name="command"),
    path('favorie', views.favorie, name="favorie"),
    path('datail/<int:id>', views.addFavorie, name='addFavorie'),
    path('datail/<int:id>', views.remove_from_favorie, name='remove_from_favorie'),
    path('detail/<int:id>',views.detail,name='detail'),
    path('profile/<str:pk>', views.profile , name='profile'),
    path('parameter/<str:username>/', views.settings , name='parameter'),
    path('recuperation', views.forgot_password , name='recuperation'),
    path('modifie/<str:uidb64>/<str:token>/', views.reset_password, name='modifie'),
    path('erreur', views.erreur , name='erreur'),
    path('delete_product/<int:product_id>/', views.delete_product, name='delete_product'),
]