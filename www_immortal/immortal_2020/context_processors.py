from django.core.cache import cache
from django.http import HttpResponseServerError
import sys, os
from immortal_2020 import custom_function


def get_social_media(request):
    try:
        if cache.get('social_media') is None:
            from .models import Social_Media, Icons_Class
            social_media = Social_Media.objects.filter(publish__exact='1').select_related('icon').order_by('sorting','name')
            cache.set('social_media', social_media)
        else:
            social_media = cache.get('social_media')

        return {'social_media': social_media}
    except:
        custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
    return {'social_media': []}

def get_group_company(request):
    try:
        if cache.get('group_company') is None:
            from .models import Group_Company
            group_company = Group_Company.objects.filter(publish__exact='1').order_by('sorting','name')
            cache.set('group_company', group_company)
        else:
            group_company = cache.get('group_company')

        return {'group_company': group_company}
    except:
        custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
    return {'group_company': []}

def get_pdpa_content(request):
    try:
        if cache.get('pdpa_title_model') is None or cache.get('pdpa_content_model') is None or cache.get('pdpa_model') is None:
            from .models import Setting, Pdpa
            pdpa_title_model = Setting.objects.filter(name__exact='pdpa_title', publish__exact='1').last()
            pdpa_content_model = Setting.objects.filter(name__exact='pdpa_content', publish__exact='1').last()
            pdpa_model = Pdpa.objects.filter(publish__exact='1').last()
            
            cache.set('pdpa_title_model', pdpa_title_model)
            cache.set('pdpa_content_model', pdpa_content_model)
            cache.set('pdpa_model', pdpa_model)
        else:
            pdpa_title_model = cache.get('pdpa_title_model')
            pdpa_content_model = cache.get('pdpa_content_model')
            pdpa_model = cache.get('pdpa_model')


        if pdpa_model and len(pdpa_model.url)>0:
            pdpa_url = pdpa_model.url
        else:
            pdpa_url = '/pdpa'

        return {
            'pdpa_title':pdpa_title_model.value,
            'pdpa_content':pdpa_content_model.value,
            'pdpa_url':pdpa_url,
        }
    except:
        custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
    return {
            'pdpa_title': 'PERSONAL DATA PROTECTION POLICY',
            'pdpa_content': 'In line with the Personal Data Protection Act 2012, by submitting this form, I hereby give my consent to ONG&amp;ONG Group and its subsidiaries to collect, use and disclose my personal data for the purpose of facilitating and contacting me regarding my request(s) via calls, text messages and emails. For the full Personal Data Protection Act, please click <a href="/pdpa" target="\&quot;feedback_pdpa_url\&quot;">here</a>.<br>I am aware that I may update the personal data and/or withdraw the consent provided to me at any time by contacting the Data Protection Officer via this form.',
            'pdpa_url': 'http://www.group.ong-ong.com/pdpa',
            }

def get_website_content(request):
    try:
        from .models import Setting

        if cache.get('web_setting_json') is None:
            obj_web_setting = Setting.objects.filter(name__contains='web_setting_', publish__exact='1').values('name', 'value').all()
            web_setting_json = {}
            if obj_web_setting and len(obj_web_setting) > 0: 
                for item in obj_web_setting:
                    web_setting_json[item['name']] = item['value']
                cache.set('web_setting_json', web_setting_json)
        else:
            web_setting_json = cache.get('web_setting_json')

        if cache.get('web_logo_json') is None:
            obj_web_logo_all = Setting.objects.filter(name__contains='web_logo', publish__exact='1').values('name', 'image').all()
            web_logo_json = {}
            if obj_web_logo_all and len(obj_web_logo_all) > 0: 
                for item in obj_web_logo_all:
                    web_logo_json[item['name']] = item['image']
                cache.set('web_logo_json', web_logo_json)
        else:
            web_logo_json = cache.get('web_logo_json')

        return {
            'web_setting_json': web_setting_json,
            'web_logo_json': web_logo_json,
        }
    except:
        custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
    raise HttpResponseServerError

def get_website_header(request):
    try:
        from .models import Header_Slideshow_Image

        if cache.get('website_header') is None:
            obj_website_header = Header_Slideshow_Image.objects.filter(publish__exact='1').exclude(page__exact='Feedback').all().order_by('page', 'sorting', 'title')
            website_header = {}
            if obj_website_header and len(obj_website_header) > 0: 
                website_header = obj_website_header
                cache.set('website_header', website_header)
        else:
            website_header = cache.get('website_header')

        return {
            'website_header': website_header,
        }
    except:
        custom_function.logger(sys._getframe().f_code.co_name, sys.exc_info(), fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
    raise HttpResponseServerError