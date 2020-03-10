import os,random,re,sys

from django.contrib import messages
from django.db.models import Aggregate, CharField, Prefetch, Q
from django.http import Http404, HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from immortal_2020 import custom_function


# Home
#-------------------------------------------------------------
class IndexView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Project
            projects = Project.objects.filter(publish__exact='1',show_on_main = "1").values('title','slug','project_type','thumbnail').order_by('id') # return a list of dictionaries.
            Header_Title = Header_Title_Keyword_Setting.objects.get(pk=1) # Impactful strategies for brand success. Big title

            return render(
                    request,
                    'index.html',
                    context={ 
                            'page_title':"Index",
                            'project_title':projects, #list comprehension to iterate each title value in each dictionary
                            'slug': projects
                            'project_type':projects,
                            'thumbnail':projects,
                            'setting':Header_Title['name']     
                    })
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404("Unable to access the project")
#-------------------------------------------------------------
class ProjectContentView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Project_Content
            projects = Project.objects.filter(publish__exact='1').values('title','project_type','keyword','thumbnail').order_by('id') # return a list of dictionaries.
            projects_content = Project_Content.objects.filter(publish__exact='1').values('left_body_text','right_body_text').order_by('id') # only two field have data in DB

            return render(
                    request,
                    'project.html',
                    context={ 
                            'page_type':"Index",
                            "slug":projects,
                            "Country":projects,
                            "keyword":projects,
                            "thumbnail":projects,
                            'left_title':projects_content,
                            'left_image':projects_content,
                            'left_body_text':projects_content,
                            'right_title':projects_content,
                            'right_image':projects_content,
                            'right_body_text':projects_content
                            }
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
            raise Http404()

# Disclaimer
#-------------------------------------------------------------
class DisclaimerView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Disclaimer
            disclaimer = Disclaimer.objects.filter(publish__exact='1').values('name','body_text').order_by('id')
            
            return render(
                    request,
                    'disclaimer.html',
                    context={ 
                            'page_type':disclaimer,
                            'page_name':disclaimer,
                            'body_text':disclaimer
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404

# Pdpa
#-------------------------------------------------------------
class PdpaView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Pdpa
            pdpa = Pdpa.objects.filter(publish__exact='1').values('name','body_text').first() # alway access the first object in db return

            if pdpa['body_text'] and len(pdpa['body_text']) > 10: # If body_text exist and string length longer than 10 
                return render(
                        request,
                        'pdpa.html',
                        context={ 
                                'page_type':pdpa,
                                'page_name':pdpa,
                                'body_text':pdpa
                                },
                        )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        return redirect('http://www.group.ong-ong.com/pdpa')

#-------------------------------------------------------------
class OfficeView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Office
            Office = Office.objects.filter(publish__exact='1').values('title','slug','address','phone','email','google_map').order_by('id')

            return render(
                    request,
                    'contact.html',
                    context={ 
                            'page_type':Office,
                            'page_title':Office,
                            'body_text':Office,
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404

class ServiceScopeView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Service_Scope_List
            Service_Scope = Service_Scope_List.objects.filter(publish__exact='1').values('title').order_by('id')
            Header_Title = Header_Title_Keyword_Setting.objects.get(pk=2) # Get the single object, Impactful strategies for brand success. Big title

            return render(
                    request,
                    'scope.html',
                    context={ 
                            'page_type':Service_Scope,
                            'page_title':Service_Scope,
                            'body_text':Service_Scope,
                            'setting':Header_Title['name']
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404

class TrendView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Trend
            Trend = Trend.objects.filter(publish__exact='1').values('title','thumbnail','thumbnail_font_hex_color','date','keyword','short_description').order_by('id')

            return render(
                    request,
                    'trend.html',
                    context={ 
                            'page_type':Trend,
                            'page_title':Trend,
                            'date':Trend,
                            'keyword':Trend,
                            'short_description':Trend,
                            'thumbnail':Trend,
                            'thumbnail_font_hex_color':Trend
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404

class TrendContentView(TemplateView):
    def get(self, request, **kwargs):
        try:
            from .models import Trend_Content,Trend
            Trend = Trend.objects.filter(publish__exact='1').values('title','thumbnail').order_by('id')
            Trend_Content = Trend_Content.objects.filter(publish__exact='1').values('left_title','left_image','left_body_text','right_title','right_image','right_body_text').order_by('id')

            return render(
                    request,
                    'trend-content.html',
                    context={
                            'Trend':Trend_Content,
                            'page_type':Trend_Content,
                            'left_title':Trend_Content,
                            'left_image':Trend_Content,
                            'left_body_text':Trend_Content,
                            'right_title':Trend_Content,
                            'right_image':Trend_Content,
                            'right_body_text':Trend_Content
                            },
                    )
        except:
            custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), className = self.__class__.__name__, fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        raise Http404
