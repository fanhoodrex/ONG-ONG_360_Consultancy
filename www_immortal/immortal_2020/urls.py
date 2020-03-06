from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include, url
from immortal_2020 import views
from django.contrib import admin

urlpatterns = [
    url(r'^index/$', views.IndexView.as_view()),
    url(r'^main/$', views.IndexView.as_view()),
    url(r'^home/$', views.IndexView.as_view()),
    url(r'^$', views.IndexView.as_view()),
    url(r'^pdpa/$', views.PdpaView.as_view()),
    url(r'^disclaimer/$', views.DisclaimerView.as_view()),

    url(r'^works/(?P<slug>[-\w]+)/$', views.ProjectDetailView.as_view()),
    url(r'^trends/(?P<slug>[-\w]+)/$', views.TrendView.as_view()),

    url(r'^scope/$', views.ScopeView.as_view()),
    url(r'^contact/$', views.OfficeView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

"""
Works:
{
toomato: https://www.immortal.com.sg/works/toomato
CANAREEF RESORTS MALDIVES: https://www.immortal.com.sg/works/canareef-resorts-maldives
321 CLEMENTI: https://www.immortal.com.sg/works/321-clementi
ONE°15 MARINA CLUB: https://www.immortal.com.sg/works/one-15-marina-club
}
"""


"""
{
home: https://www.immortal.com.sg/
trends: https://www.immortal.com.sg/trends
works: https://www.immortal.com.sg/works
scope: https://www.immortal.com.sg/scope
contact: https://www.immortal.com.sg/contact
}
"""