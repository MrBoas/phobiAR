# usar .exe se tiver na WSL

# comandos a nao esquecer
# mongo --port 10202

# importar para o servidor
importLocal:
	# para corrigir o erro que aparece sempre no servidor
	export LC_ALL=C
	mongoimport --port 10202 --db=phobiAR -c sessions --file sessions.out
	mongoimport --port 10202 --db=phobiAR -c phobias --file phobias.out
	mongoimport --port 10202 --db=phobiAR -c markers --file markers.out

# exportar do meu pc
exportLocal:
	mongoexport --db=phobiAR -c sessions -o sessions.out
	mongoexport --db=phobiAR -c phobias -o phobias.out
	mongoexport --db=phobiAR -c markers -o markers.out