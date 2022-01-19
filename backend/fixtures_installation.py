import os

commands_list = [
    'python manage.py loaddata fixtures/test_data_users.json',
    'python manage.py loaddata fixtures/test_data_profiles.json',
    'python manage.py loaddata fixtures/test_data_players.json',
    'python manage.py loaddata fixtures/test_data_tournaments.json',
    'python manage.py loaddata fixtures/test_data_participants.json',
    'python manage.py loaddata fixtures/test_data_rounds.json',
    'python manage.py loaddata fixtures/test_data_matches.json'
]

for command in commands_list:
    os.system(command)
