"""
Definition of urls for www_project_xion.
"""

from django.conf.urls import url, include
from django.urls import path
from django.contrib import admin

import project_xion_2018.views

urlpatterns = [
    path('admin@cms/', admin.site.urls),
    url(r'^', include('project_xion_2018.urls', )),
]