# Mapa das Feiras Orgânicas de Curitiba

Página que lista as feiras orgânicas de Curitiba em um mapa. Mais informações,
diretamente na página:
[turicas.info/feiras-organicas-curitiba](http://turicas.info/feiras-organicas-curitiba).

Template usado como base:
[startbootstrap-freelancer](https://github.com/BlackrockDigital/startbootstrap-freelancer),
por [BlackrockDigital](https://github.com/BlackrockDigital/).


## Rodar localmente

No diretório raiz do repositório, execute:

    python3 -m http.server

Necessida do interpretador Python 3 instalado. Daí basta acessar:
http://localhost:8000/


## Atualizar Planilha

No diretório raiz do repositório, execute:

    ./scripts/atualiza_dados.py

Necessita das seguintes bibliotecas Python:

- [geopy](https://github.com/geopy/geopy)
- [requests](https://github.com/kennethreitz/requests)
- [rows](https://github.com/turicas/rows)

Para instalá-las, execute:

    pip install geopy requests rows[detect]
