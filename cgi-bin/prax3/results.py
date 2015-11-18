#!/usr/bin/python
# coding=utf-8
import cgitb
import csv
import cgi
from datetime import datetime
from string import Template
import tempfile

html = '''
<html>
<head>
<title>Results</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="http://dijkstra.cs.ttu.ee/~Mehis.Kont/prax3/assets/css/style.css">
</head>
<body>
<div class="container">
    <table class="results-table">
        <tr>
            <td colspan="3" class="header-btn">
                 <a href="http://dijkstra.cs.ttu.ee/~Mehis.Kont/cgi-bin/prax3/results.py">reset settings</a>
            </td>
             <td colspan="3" class="header-btn">
                 <a href="http://dijkstra.cs.ttu.ee/~Mehis.Kont/prax3/">back to bombing</a>
            </td>
        </tr>
        <tr>
            <td class="text-center">
                <form action="results.py" method="get">
                    <input type="hidden" name="reverse" value="$reverse">
                    <input type="hidden" name="nameFilter" value="$filter">
                    <input type="submit" name="sort_by" value="start_time">
                </form>
            </td>
            <td class="text-center">
                <form action="results.py" method="get">
                    <input type="hidden" name="reverse" value="$reverse">
                    <input type="hidden" name="nameFilter" value="$filter">
                    <input type="submit" name="sort_by" value="player1_name">
                </form>
            </td>
            <td class="text-center">
                <form action="results.py" method="get">
                    <input type="hidden" name="reverse" value="$reverse">
                    <input type="hidden" name="nameFilter" value="$filter">
                    <input type="submit" name="sort_by" value="player2_name">
                </form>
            </td>
            <td class="text-center">
                <form action="results.py" method="get">
                    <input type="hidden" name="reverse" value="$reverse">
                    <input type="hidden" name="nameFilter" value="$filter">
                    <input type="submit" name="sort_by" value="player1_points">
                </form>
            </td>
            <td class="text-center">
                <form action="results.py" method="get">
                    <input type="hidden" name="reverse" value="$reverse">
                    <input type="hidden" name="nameFilter" value="$filter">
                    <input type="submit" name="sort_by" value="player2_points">
                </form>
            </td>
            <td class="text-center">
                <form action="results.py" method="get">
                    <input type="hidden" name="reverse" value="$reverse">
                    <input type="hidden" name="nameFilter" value="$filter">
                    <input type="submit" name="sort_by" value="game_time">
                </form>
            </td>
        </tr>
        $results
    </table>
    <br/>
    <form action="results.py" method="get" class="filtering">
        <input type="text" name="nameFilter">
        <input type="submit" Value="Filter results by Player 1 name"></form>
</div>
</body>

'''

cgitb.enable()
web_base = ''
csv_location = tempfile.gettempdir() + '/database-mehiskont.csv'

column_map = dict(
    start_time=0,
    player1_name=1,
    player2_name=2,
    player1_points=3,
    player2_points=4,
    game_time=5,
)


def save_results(form):
    start_time = form.getfirst('start_time')
    player1_name = form.getfirst('player1_name')
    player2_name = form.getfirst('player2_name', default='Computer')
    player1_points = form.getfirst('player1_points')
    player2_points = form.getfirst('player2_points')
    game_time = form.getfirst('game_time')

    with open(csv_location, 'a') as fp:
        csv_writer = csv.writer(fp)
        csv_writer.writerow(
            [
                datetime.fromtimestamp(float(start_time)),
                player1_name,
                player2_name,
                float(player1_points),
                float(player2_points),
                int(game_time),
            ]
        )


def convert_to_datetime(datetime_string):
    return datetime.strptime(datetime_string, '%Y-%m-%d %H:%M:%S')         ##  sisse tuleb string , converditakse date-time objektiks


def lowercase(s):
    return s.lower()


def show_results(form):
    results = ''

    # Read data from csv file into list of rows
    with open(csv_location) as fp:
        reader = csv.reader(fp)
        rows_from_file = [row for row in reader]

    # Filter by player1_name
    rows = []
    player1_name_filter = form.getfirst('nameFilter', default=' ')
    if player1_name_filter and player1_name_filter.strip():
        for row in rows_from_file:
            name_in_file = row[column_map.get('player1_name')].lower()

            name_from_filter = player1_name_filter.lower()


            if name_from_filter in name_in_file:
                rows.append(row)

    else:
        rows = rows_from_file

    # Sort
    sort_by = form.getfirst('sort_by', default='player1_name')
    reverse_str = form.getfirst('reverse', default='False')
    reverse = bool(reverse_str == 'True')

    # reverse the "reverse" variable value
    reverse_str = 'False' if reverse else 'True'

    # put a function to list to the same position as the corresponding column (veerg).
    sort_funcs = [convert_to_datetime, lowercase, lowercase, float, float, int]

    # get the number of column which will be used for ordering
    col_nr = column_map.get(sort_by)

    # Like this: rows.sort(key=lambda row: lowercase(row[1]), reverse=reverse)
    rows.sort(key=lambda row: sort_funcs[col_nr](row[col_nr]),reverse=reverse)   ## kui true : descending, false : ascnending


    for row in rows:                                                                            ## %s stringityyypi muutujua
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
    print Template(html).substitute(results=results, reverse=reverse_str, filter=player1_name_filter)



def game_server():

    form = cgi.FieldStorage()
    if not form or not form.has_key('op'):
        show_results(form)
    else:
        save_results(form)
        show_results(form)


game_server()