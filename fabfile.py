import os

from fabric.api import task

from fabric.operations import local

@task
def run(server=True, prep=False, make=False):
    if true(prep):
        install()
    if true(make):
        build()
    if true(server):
        serve()

@task
def serve():
    local('cd %s && python pooltime/app.py' % os.path.dirname(__file__))

@task
def install():
    local('cd %s && npm install && bower install' % os.path.join(os.path.dirname(__file__), 'pooltime/client'))

@task
def build():
    local('cd %s && grunt' % os.path.join(os.path.dirname(__file__), 'pooltime/client'))
    local('rm -rf %s' % os.path.join(os.path.dirname(__file__), 'pooltime/static'))
    local('mv %s %s' % (os.path.join(os.path.dirname(__file__), 'pooltime/client/dist/static'), os.path.join(os.path.dirname(__file__), 'pooltime')))
    local('mv %s %s' % (os.path.join(os.path.dirname(__file__), 'pooltime/client/dist/index.html'), os.path.join(os.path.dirname(__file__), 'pooltime/templates')))

def true(o):
    return o in ['True', 'true', True]
