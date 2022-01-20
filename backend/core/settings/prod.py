import os
import dj_database_url
from core.settings.base import *

ROOT_DIR = BASE_DIR.parent.parent

SECRET_KEY = os.getenv('SECRET_KEY')

ALLOWED_HOSTS = [os.getenv("PROD_HOST")]

DEBUG = False

CORS_ALLOW_ALL_ORIGINS = False

INSTALLED_APPS.extend(["whitenoise.runserver_nostatic"])

MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

TEMPLATES[0]["DIRS"] = [os.path.join(ROOT_DIR, "frontend", "build")]

STATICFILES_DIRS = [os.path.join(ROOT_DIR, "frontend", "build", "static")]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

STATIC_ROOT = os.path.join(ROOT_DIR, "staticfiles")

STATIC_URL = "/static/"

WHITENOISE_ROOT = os.path.join(ROOT_DIR, "frontend", "build", "root")

DATABASE_URL = os.getenv('DATABASE_URL')

db_from_env = dj_database_url.config(
    default=DATABASE_URL, conn_max_age=500, ssl_require=True
)

DATABASES = {
    'default': db_from_env
}

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
