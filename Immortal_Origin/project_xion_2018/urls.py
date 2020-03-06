from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include, url
from project_xion_2018 import views

urlpatterns = [
    url(r'^pdpa/$', views.PdpaView.as_view()),
    url(r'^disclaimer/$', views.DisclaimerView.as_view()),

    url(r'^feedback/$', views.FeedbackView.as_view()),
    
    url(r'^about/$', views.AboutView.as_view()),

    url(r'^location/$', views.LocationView.as_view()),
    url(r'^office/$', views.LocationView.as_view()),
    url(r'^offices/$', views.LocationView.as_view()),
    
    url(r'^project/search$', views.ProjectSearch.search_filter),
    url(r'^project/$', views.ProjectView.as_view()),
    url(r'^projects/$', views.ProjectView.as_view()),
    url(r'^project/(?P<slug>[-\w]+)/$', views.ProjectDetailView.as_view()),
    
    url(r'^search/$', views.SearchView.as_view()),
    url(r'^index/$', views.IndexView.as_view()),
    url(r'^main/$', views.IndexView.as_view()),
    url(r'^home/$', views.IndexView.as_view()),
    url(r'^$', views.IndexView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)