#!/usr/bin/python
# coding=utf-8
import cgitb
import csv
import cgi
from datetime import datetime
import tempfile

from template_engine import TemplateEngine

cgitb.enable()
web_base = ''
csv_location = tempfile.gettempdir() + '/database-mehiskont.csv'

row_map = dict(
    start_time=0,
    player1_name=1,
    player2_name=2,
    player1_points=3,
    player2_points=4,
    game_time=5,
)


def show_results(form):
    results = ''

    # read data into list of rows from csv file
    with open(csv_location) as fp:
        reader = csv.reader(fp)
        rows = [row for row in reader]

    # sorting
    sort_by = form.getfirst('sort_by', default='player1_name')
    reverse_str = form.getfirst('reverse', default='False')
    reverse = reverse_str == 'True'

    # reverse the variable value
    reverse_str = 'False' if reverse else 'True'

    sort_by_row_nr = row_map.get(sort_by) or 1
    rows.sort(key=lambda k: k[sort_by_row_nr], reverse=reverse)

    for row in rows:
        results += '''
        <tr>
            <td>%s</td>
            <td>%s</td>
            <td>%s</td>
            <td>%s</td>
            <td>%s</td>
            <td>%s</td>
        </tr>
        ''' % tuple(row)
    print "Content-type: text/html"
    print
    print TemplateEngine('results_table', results=results, reverse=reverse_str)


def results_saving_failed():
    print "Content-type: text/html"
    print
    print TemplateEngine(
        'plain',
        title='Saving results failed',
        content='Saving results failed due to invalid form data!')


def save_results(form):
    start_time = form.getfirst('start_time')
    player1_name = form.getfirst('player1_name')
    player2_name = form.getfirst('player2_name', default='Computer')
    player1_points = form.getfirst('player1_points')
    player2_points = form.getfirst('player2_points')
    game_time = form.getfirst('game_time')
    op = form.getfirst('op')
    # if not (start_time and player1_name and player1_points and player2_points and game_time and op):
    #     results_saving_failed()
    #     return
    sanitized_name = player1_name.replace(',', ' ').replace('"', ' ')
    with open(csv_location, 'a') as fp:
        csv_writer = csv.writer(fp)
        csv_writer.writerow([
            datetime.fromtimestamp(float(start_time)),
            sanitized_name,
            player2_name,
            player1_points,
            player2_points,
            int(game_time),
        ])


def game_server():
    # cgitb.enable(display=0, logdir="/path/to/logdir")
    form = cgi.FieldStorage()
    if not form or not form.has_key('op'):
        show_results(form)
    else:
        save_results(form)
        show_results(form)


game_server()
