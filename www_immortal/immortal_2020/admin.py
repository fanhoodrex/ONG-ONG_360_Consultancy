from django.contrib import admin
from . import models

# register models to admin
#declare a iterable object for models
myModels = [models.Project,models.Project_Type_List,models.Disclaimer,models.Group_Company,models.Header_Title_Keyword_Setting,models.Office,models.Pdpa,models.Service_Scope_List,models.Setting,models.Social_Media,models.Trend,models.Trend_Content]

admin.site.register(myModels) # register multiple models through iteration
