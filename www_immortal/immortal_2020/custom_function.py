import sys, os
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

def logger(name, info, inspect=[], className="", fileName=""):
    msg = ''
    if len(inspect) == 0:
        msg = "---! Unexpected Error On File "+fileName+" ; Function "+className+"."+name+" @ Line : "+str(info[-1].tb_lineno), info, " !---"
    else:
        msg = "---! Unexpected Error On File "+fileName+" ; Function "+className+"."+name+" @ Line : "+str(info[-1].tb_lineno), info, " ; Caller File : "+str(st[1])+" ; Function : "+str(st[3])+" ; Line : "+str(st[2]) + " !---"

    from django.conf import settings
    if settings.DEBUG:
        print (msg);
    else :
        print (msg);
        f = open( r'/var/log/nginx/www_project_innovation/py_error.log', 'w+' )
        f.write(str(msg))
        f.close()

class ImageProcessor():
    def get_resize_aspect_ratio_resolution(self, image, image_type):
        try:
            if 'thumbnail' in image_type :
                max_pixel = 400
            elif 'people' in image_type :
                max_pixel = 600
            elif 'header' in image_type :
                max_pixel = 1800
            else:
                max_pixel = 1000

            if image:
                width = int(image.width)
                height = int(image.height)
                re_width = int(width)
                re_height = int(height)

                if width > height:
                    #Landscape Mode Image
                    if width > max_pixel:
                        ratio_rate = float(width/max_pixel)
                        re_width = int(width/ratio_rate)
                        re_height = int(height/ratio_rate)
                else:
                    #Portrait Mode Image
                    if height > max_pixel:
                        ratio_rate = float(height/max_pixel)
                        re_width = int(width/ratio_rate)
                        re_height = int(height/ratio_rate)

                return (re_width,re_height)
        except:
            logger(sys._getframe().f_code.co_name, sys.exc_info(), fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        pass

    def image_resizer(self, image, filename, image_type):
        try:
            if image:
                im = Image.open(image)
                output = BytesIO()
                im = im.convert('RGB')
                im = im.resize( self.get_resize_aspect_ratio_resolution(im, image_type) , Image.ANTIALIAS)
                im.save(output, format='JPEG', quality=85)

                output.seek(0)

                filename = filename.split('.')[0]
                if 'thumbnail' in image_type :
                    filename = filename + '.thumbnail'
                elif 'header' in image_type :
                    filename = filename + '.header'

                return InMemoryUploadedFile(output,'ImageField', "%s.jpg" %filename, 'image/jpeg', sys.getsizeof(output), None)
        except:
            logger(sys._getframe().f_code.co_name, sys.exc_info(), fileName=os.path.split(sys._getframe().f_code.co_filename)[1])
        pass

