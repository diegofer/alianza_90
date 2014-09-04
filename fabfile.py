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
#env.hosts = [private.HOST1]

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
	local('stylus -u nib -w -o %s %s' %(CSS_PATH, STYLUS_FILE))




####################################################
##              SERVIDOR DE PRODUCCION            ##
####################################################
env.hosts = ['alianza@web348.webfaction.com']

ROOT_PATH   = '/home/alianza/produccion/alianza_90'
NODE_EXEC  = '/home/alianza/webapps/alliance_node/bin/node'


def deploy():
	print(green('agregando archivos al repositorio local'))
	local('git add .')

	with settings(warn_only=True):
		msg = prompt("mensaje del commit: ")
		result = local('git commit -a -m %s' % msg, capture=True)
	if result.failed:
		abort(red("Abortando. No hay nada para hacer commit"))

	print(green('Actualizando repositorio central...'))
	local('git push -u origin master')
	
	print(green('Actualizando repositorio de produccion...'))
	with cd(ROOT_PATH):
		run('git pull')

	print(green('Compilando archivos para deploy'))
	build()



def build():
	print(green('Compilando alianza_90'))
	with cd(ROOT_PATH):
		run('%s tools/r.js -o tools/build.js' % NODE_EXEC)




def git_status():
	with cd(ROOT_PATH):
		run('git log')




