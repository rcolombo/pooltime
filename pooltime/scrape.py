import requests
import html5lib
from bs4 import BeautifulSoup
from models.game import Game
import re

def main():
    #r = requests.get('http://www.cbssports.com/nfl/odds')
    print get_week_num()

def get_week_num():
    r = requests.get('http://espn.go.com/nfl/lines')
    soup = BeautifulSoup(r.text, "html5lib")
    week = soup. \
            html. \
            body. \
            find('div', {'class': 'bg-elements'}). \
            find('div', {'id': 'subheader'}). \
            find('div', {'id': 'content-wrapper'}). \
            find('div', {'id': 'content'}). \
            find('div', {'class': 'span-6'}). \
            h1.text
    wn = re.search('[0-9]+', week)
    return int(wn.group(0))

if __name__ == '__main__':
    main()
