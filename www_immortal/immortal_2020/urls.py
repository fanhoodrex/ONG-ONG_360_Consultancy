from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include, url
from immortal_2020 import views

urlpatterns = [
    url(r'^pdpa/$', views.PdpaView.as_view()),
    url(r'^disclaimer/$', views.DisclaimerView.as_view()),

  
    url(r'^index/$', views.IndexView.as_view()),
    url(r'^main/$', views.IndexView.as_view()),
    url(r'^home/$', views.IndexView.as_view()),
    url(r'^$', views.IndexView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

