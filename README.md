#Chess Manager Application

This Django/React App is aiming to help people create and manage chess 
tournaments for 8 players  and is based on the swiss chess tournament playing 
system.

##Developpment setup (without Docker)

Clone this rep on your local machine with `git clone https://github.com/Louack/chess-manager.git`

###Backend folder

- Create a virtual environement: `py -3 -m venv venv`
- Activate the virtual env: `venv/scripts/activate`
- Install the required packages: `pip install -r requirements.txt`
- Create `.env` file with postgres variables:
```
DB_NAME=<my db name>
DB_USER=<my username>
DB_PASSWORD=<my password>
DB_HOST=localhost
```
- Make and run first migrations: `py manage.py makemigrations` and 
`py manage.py migrate`
- Install the fixtures: `py fixtures_installation.py`
- Run the development server (available by default at `http://127.0.0.1:8000`): 
`py manage.py runserver`

###Frontend folder

- Create `.env` file with proxy variable:
```
REACT_APP_PROXY_HOST=<your backend host, by default http://127.0.0.1:8000>
```
- Install node dependencies: `npm install`
- Run the development server (available by default at `http://127.0.0.1:3000`): 
`npm start` 

##Developpment setup (with Docker)

Clone this rep on your local machine with `git clone https://github.com/Louack/chess-manager.git`

Docker-compose file is set with volumes in order to apply modifications inside 
the containers in real-time. Images must be rebuilt when installing new packages.

!!! For the `.sh` files located in `/backend/scripts/` ensure that the line 
separator is set to `LF` in order to launch correctly the backend container !!!

- Build images and launch containers: `docker-compose up`
- Backend will run at `http://127.0.0.1:8000` and frontend at `http://127.0.0.1:3000`
- Enter the backend bash and install the database fixtures: `docker exec -it backend python fixtures_installation.py`

The user installed with the fixtures is a superuser:
```
username: test_user
password: test_password
```


