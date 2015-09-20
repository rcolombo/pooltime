import os
import datetime
import time

from fabric.api import task

from fabric.operations import local

from pooltime import scrape as scrapers

class TaskHelper:
    @staticmethod
    def serve():
        local('cd %s && python pooltime/app.py' % os.path.dirname(__file__))

    @staticmethod
    def install():
        local('cd %s && npm install && bower install' % os.path.join(os.path.dirname(__file__), 'pooltime/client'))

    @staticmethod
    def build():
        local('cd %s && grunt build' % os.path.join(os.path.dirname(__file__), 'pooltime/client'))
        local('rm -rf %s' % os.path.join(os.path.dirname(__file__), 'pooltime/static'))
        local('mv %s %s' % (os.path.join(os.path.dirname(__file__), 'pooltime/client/dist/static'), os.path.join(os.path.dirname(__file__), 'pooltime')))
        local('mv %s %s' % (os.path.join(os.path.dirname(__file__), 'pooltime/client/dist/index.html'), os.path.join(os.path.dirname(__file__), 'pooltime/templates')))


@task
def run(serve=True, install=False, build=False):
    if true(install):
        TaskHelper.install()
    if true(build):
        TaskHelper.build()
    if true(serve):
        TaskHelper.serve()

@task
def serve():
    TaskHelper.serve()

@task
def install():
    TaskHelper.install()

@task
def build():
    TaskHelper.build()

@task
def scrape(week, scores=True, lines=False):
    if true(scores):
        scrapers.LiveScoresScraper().scrape(week)
    if true(lines):
        scrapers.LinesScraper().scrape(week)

@task
def backup(dir_name=os.path.join(os.path.dirname(__file__), 'db')):
    file_name = ''.join(['pooltime_', current_timestamp(), '.sql'])
    local('pg_dump -o pooltime > %s' % os.path.join(dir_name, file_name))

@task
def restore(backup):
    local('psql pooltime < %s' % backup)


def current_timestamp():
    ts = time.time()
    return datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%dT%H:%M:%S')

def true(o):
    return o in ['True', 'true', True]
