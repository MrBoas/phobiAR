# importar para o servidor
importLocal:
	mongoimport --db=phobiAR -c sessions --file sessions.out
	mongoimport --db=phobiAR -c phobias --file phobias.out
	mongoimport --db=phobiAR -c markers --file markers.out

# exportar do meu pc
exportLocal:
	mongoexport --db=phobiAR -c sessions -o sessions.out
	mongoexport --db=phobiAR -c phobias -o phobias.out
	mongoexport --db=phobiAR -c markers -o markers.out