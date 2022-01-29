# Chess Manager Application

This Django/React desktop app is aiming to help people create and manage chess 
tournaments for 8 players  and is based on the swiss chess tournament playing 
system.
This is also my very first React app as a python backend developper.

## Developpment setup (without Docker)

Clone this rep on your local machine with `git clone https://github.com/Louack/chess-manager.git`

### Backend folder

- Create a virtual environement: `py -3 -m venv venv`
- Activate the virtual env: `venv/scripts/activate`
- Install the required packages: `pip install -r requirements.txt`
- Create `.env` file:
```
DB_NAME=<my postgres db name>
DB_USER=<my postgres username>
DB_PASSWORD=<my postgres password>
TEST_DATA_REQUIRED= <1> or <true>, if you want to install test data when a new user is created
```
- Make and run first migrations: `py manage.py makemigrations` and 
`py manage.py migrate`
- Run the development server (available by default at `http://127.0.0.1:8000`): 
`py manage.py runserver`
- Optional: Create a supersuser: `py manage.py createsuperuser`

### Frontend folder

- Create `.env` file with proxy variable:
```
REACT_APP_PROXY_HOST=<your backend host, by default http://127.0.0.1:8000>
```
- Install node dependencies: `npm install`
- Run the development server (available by default at `http://127.0.0.1:3000`): 
`npm start` 

## Developpment setup (with Docker)

Clone this rep on your local machine with `git clone https://github.com/Louack/chess-manager.git`

Docker-compose file is set with volumes in order to apply modifications inside 
the containers in real-time. Images must be rebuilt when installing new packages.

!!! For the `.sh` files located in `/backend/scripts/` ensure that the line 
separator is set to `LF` in order to launch correctly the backend container !!!

- Build images and launch containers: `docker-compose up`
- Backend will run at `http://127.0.0.1:8000` and frontend at `http://127.0.0.1:3000`
- Optional: Enter the backend bash and create a superuser: `docker exec -it backend python manage.py createsuperuser`
- Optional: in the linked backend volume, you can add a `.env` file with:
```
TEST_DATA_REQUIRED=<1> or <true>, if you want to install test data when a new user is created
```
## First use

Once on the homepage, you can register a new user by chosing a username and a password.
If the registration succeeds, you can then log into the site. Once logged in, you will find 
a link opening the app user guide inside the footer.

If you chose to install test data, ten players and two tournaments will be directly available.
## Testing / Coverage

At the time being, testing / coverage are only available for the backend part.

!!! Ensure that the "TEST_DATA_REQUIRED" env variable is set to false !!!

Depending on your development setup, enter the backend directory / the backend container bash.
### Testing only
```
python manage.py test apps
```
OR
```
pytest apps
```

### Coverage
```
coverage run --source='apps' manage.py test apps
coverage report
coverage html
```

HTML coverage reports are stored in htmlcov folder, in the backend root directory.

## PEP8

PEP8 compliance can be checked at the backend level, with the command: `flake8` 

Non-compliant files will be displayed.

## First Deployment

This app can be deployed on Heroku with the heroku CLI and by using the Dockerfile 
located at the project root directory.
You also need to create a sentry project (https://sentry.io) in order to get a 
Data Source Name (DSN) to be linked to the app as an env variable later on.
- Log into heroku: `heroku container:login`
- Create a new heroku app: `heroku create <app name>`
- Create a Heroku postgres add-on: `heroku addons:create heroku-postgresql:hobby-dev`
- Set your env variables:
```
heroku config:add DJANGO_SETTINGS_MODULE=core.settings.prod --app=<app name>
heroku config:add PROD_HOST=<app name>.herokuapp.com --app=<app name>
heroku config:add REACT_APP_PROXY_HOST=<app name>.herokuapp.com --app=<app name>
heroku config:add SECRET_KEY=<your secret key> --app=<app name>
heroku config:add SENTRY_DSN=<your DSN> --app=<app name>
heroku config:add TEST_DATA_REQURED=<true> --app=<app name>, if you want test data
```

- Push and release your app:
```
heroku container:push web --app=<app name>
heroku container:release web --app=<app name>
```

You can access the app bash by running: `heroku run bash --app=<app name>`

## Continuous Integration & Continuous Development (CI/CD)

CI and CD are performed with CircleCI (https://app.circleci.com/)
- Log into CircleCI with your GitHub account
- Inside projects tab, click on "Set Up Project" in order to link your repo with CircleCI
- In the project settings, enter the following env variables, later used in the `config.yml` file:
```
APP_NAME=<your app name>
HEROKU_API_KEY=<your heroku API key>
```

The workflow is built as follows:
- a backend test part, executed at each commit
- a deployment part, if the backend test part succeeds, executed at each commit on the master branch





