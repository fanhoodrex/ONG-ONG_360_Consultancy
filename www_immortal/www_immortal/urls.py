"""
Definition of urls for www_immortal.
"""

from django.conf.urls import url, include
from django.urls import path
from django.contrib import admin

import immortal_2020.views

urlpatterns = [
    path('admin@cms/', admin.site.urls),
    url(r'^', include('immortal_2020.urls', )),
]