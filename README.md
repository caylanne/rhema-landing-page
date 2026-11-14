
# Rhema – Landing page

## 1. Back-end (Django)

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations site_rhema
python manage.py migrate
python manage.py loaddata testemunhos
python manage.py createsuperuser
python manage.py runserver
```

Abra http://localhost:8000/admin e preencha:

- **Configuração da página:** link da pré-matrícula e WhatsApp.
- **Testemunhos:** nome do aluno, título e link do vídeo.

A API fica em http://localhost:8000/api/landing/

## 2. Front-end (React Native + Expo, versão web)

```bash
cd frontend
npm install
npx expo start --web
```

Ajuste `API_URL` em `frontend/src/config.js` quando o Django estiver em outro endereço.

Para publicar o site, gere a versão web de produção:

```bash
npx expo export -p web
```
