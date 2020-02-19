from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse, Http404, JsonResponse
from django.views.generic import TemplateView
from django.db.models import Prefetch, Q, Aggregate, CharField
from django.contrib import messages
import re, random, sys, os

from immortal_2020 import custom_function


# Home
#-------------------------------------------------------------
class IndexView(TemplateView):
    def get(self, request, **kwargs):
        try:
            return render(
                    request,
                    'index.html',
                    context={ 
                            'page_type':"Index",
                            'page_title':"",
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404
#-------------------------------------------------------------

# Disclaimer
#-------------------------------------------------------------
class DisclaimerView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Disclaimer
            disclaimer = Disclaimer.objects.filter(publish__exact='1').order_by('id').values('name','body_text').last()

            return render(
                    request,
                    'blank.html',
                    context={ 
                            'page_type':disclaimer['name'],
                            'page_title':disclaimer['name'],
                            'body_text':disclaimer['body_text'],
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404
#-------------------------------------------------------------

# Pdpa
#-------------------------------------------------------------
class PdpaView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Pdpa
            pdpa = Pdpa.objects.filter(publish__exact='1').order_by('id').values('name','body_text').last()

            if pdpa['body_text'] and len(pdpa['body_text']) > 10:
                return render(
                        request,
                        'blank.html',
                        context={ 
                                'page_type':pdpa['name'],
                                'page_title':pdpa['name'],
                                'body_text':pdpa['body_text'],
                                },
                        )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        return redirect('http://www.group.ong-ong.com/pdpa')
#-------------------------------------------------------------


def index(request):
    try:
        from .models import index
        return render(
            request,
            "templates/index.html",
            context = {
                
            }
        )
    except:
        pass

def category(request):
    try:
        from .models import category
        return render(
            request,
            "templates/category.html",
            context = {
                
            }
        )
    except:
        pass

def contact():
    try:
        from .models import contact
        return render(
            request,
            "templates/contact.html",
            context = {
                
            }
        )
    except:
        pass

def project():
    try:
        from .models import project
        return render(
            request,
            "templates/project.html",
            context = {
                
            }
        )
    except:
        pass

def scope():
    try:
        from .models import scope
        return render(
            request,
            "templates/scope.html",
            context = {
                
            }
        )
    except:
        pass

def trend_content():
    try:
        from .models import trend_content
        return render(
            request,
            "templates/trend_content.html",
            context = {
                
            }
        )
    except:
        pass

def trend():
    try:
        from .models import trend
        return render(
            request,
            "templates/trend.html",
            context = {
                
            }
        )  
    except:
        pass
