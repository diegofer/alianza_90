from fabric.api import * 
from fabric.contrib.console import confirm
from fabric.colors import green, red, yellow

import os
import re

try:
    import private # llamamos un private file con variables estaticas = HOST1
except ImportError:
    print 'no se encuentran los datos privados'
    pass 

RUTA_PROYECTO = os.path.join(os.path.dirname(os.path.abspath(__file__)))
env.hosts = [private.HOST1]

####################################################
##              SERVIDOR DE DESARROLLO            ##
####################################################
CSS_PATH     = 'source/css'
STYLUS_FILE  = 'source/css/stylus/style.styl'

def init_dev():        # Todo antes de empezar a escribir codigo
	stylus_build()

def build_local():
	local('node tools/r.js -o tools/build.js')

def stylus_build():
	local('stylus -w -o %s %s' %(CSS_PATH, STYLUS_FILE))