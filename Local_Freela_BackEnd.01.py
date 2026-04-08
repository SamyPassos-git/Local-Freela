from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Local Freela rodando"

#====="BANCO" TEMPORÁRIO (em memória)=====

usuarios = []
habilidades = []
solicitacoes = []

user_id_counter = 1
hab_id_counter = 1
sol_id_counter = 1

#=====CADASTRO=====

@app.route('/cadastro', methods=['POST'])
def cadastro():
    global user_id_counter

    data = request.json

    usuario = {
        "id": user_id_counter,
        "nome": data['nome'],
        "email": data['email'],
        "senha": data['senha'],
        "bio": data.get('bio', ''),
        "tokens": 0
    }

    usuarios.append(usuario)
    user_id_counter += 1

    return jsonify({"msg": "Usuário criado!", "user": usuario})

#=====LOGIN=====

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    for u in usuarios:
        if u['email'] == data['email'] and u['senha'] == data['senha']:
            return jsonify({"msg": "Login OK", "user": u})

    return jsonify({"msg": "Credenciais inválidas"}), 401

#=====CRIAR HABILIDADE=====

@app.route('/habilidades', methods=['POST'])
def criar_habilidade():
    global hab_id_counter

    data = request.json

    habilidade = {
        "id": hab_id_counter,
        "user_id": data['user_id'],
        "titulo": data['titulo'],
        "descricao": data['descricao'],
        "categoria": data['categoria'],
        "preco": data['preco']
    }

    habilidades.append(habilidade)
    hab_id_counter += 1

    return jsonify({"msg": "Habilidade criada", "habilidade": habilidade})

#=====LISTAR / BUSCAR HABILIDADES=====

@app.route('/habilidades', methods=['GET'])
def listar_habilidades():
    termo = request.args.get('q', '').lower()

    if termo:
        resultado = [
            h for h in habilidades
            if termo in h['titulo'].lower() or termo in h['descricao'].lower()
        ]
        return jsonify(resultado)

    return jsonify(habilidades)

#=====CRIAR SOLICITAÇÃO=====

@app.route('/solicitacoes', methods=['POST'])
def criar_solicitacao():
    global sol_id_counter

    data = request.json

    solicitacao = {
        "id": sol_id_counter,
        "habilidade_id": data['habilidade_id'],
        "solicitante_id": data['solicitante_id'],
        "mensagem": data['mensagem'],
        "status": "PENDENTE"
    }

    solicitacoes.append(solicitacao)
    sol_id_counter += 1

    return jsonify({"msg": "Solicitação enviada", "solicitacao": solicitacao})

#=====ACEITAR / REJEITAR=====

@app.route('/solicitacoes/<int:id>/status', methods=['PUT'])
def atualizar_status(id):
    data = request.json

    for s in solicitacoes:
        if s['id'] == id:
            s['status'] = data['status']
            return jsonify({"msg": "Status atualizado", "solicitacao": s})

    return jsonify({"msg": "Solicitação não encontrada"}), 404

#=====RODAR=====

if __name__ == '__main__':
    app.run(debug=True)
