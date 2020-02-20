from django.contrib import admin



# Basic / Setting
#-------------------------------------------------------------
from .models import Setting
class Setting_Admin(admin.ModelAdmin):
    list_display = ('name', 'description', 'publish')
admin.site.register(Setting, Setting_Admin)

from .models import List_Type
class List_Type_Admin(admin.ModelAdmin):
    list_display = ('title', 'sorting', 'publish',)
admin.site.register(List_Type, List_Type_Admin)

from .models import Social_Media
class Social_Media_Admin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'sorting', 'publish')
admin.site.register(Social_Media, Social_Media_Admin)

from .models import Group_Company
class Group_Company_Admin(admin.ModelAdmin):
    list_display = ('name', 'image', 'sorting', 'publish',)
admin.site.register(Group_Company, Group_Company_Admin)

from .models import Pdpa
class Pdpa_Admin(admin.ModelAdmin):
    list_display = ('name', 'url', 'publish',)
admin.site.register(Pdpa, Pdpa_Admin)

from .models import Disclaimer
class Disclaimer_Admin(admin.ModelAdmin):
    list_display = ('name', 'publish',)
admin.site.register(Disclaimer, Disclaimer_Admin)


#-------------------------------------------------------------
from .models import Icons_Class
class Icons_Class_Admin(admin.ModelAdmin):
    list_display = ('name', 'icon_class', 'publish',)
admin.site.register(Icons_Class, Icons_Class_Admin)
#-------------------------------------------------------------
