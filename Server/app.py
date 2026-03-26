from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app) 
'''
The POST method that Python uses to receive the JSON contract from the CMS and then save it to a folder on the computer.

Metodo POST que ocupa python para poder recibir el contrato JSON del CMS para que despues lo guarde en 
una carpeta del equipo
'''

@app.route('/project/save', methods=['POST'])
def uplodad():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    with open('./project/project.json', 'w') as json_file:
        json.dump(data, json_file, indent=4) 

    return jsonify({"message": "Project saved", "pages": data}), 201

'''
The GET method that Python uses to send the JSON contract to Flutter for subsequent rendering on the device

Metodo GET que ocupa python para poder mandar el contrato JSON a Flutter para que posterior renderizacion
en el dispositivo
'''
@app.route('/project/load', methods=['GET'])
def load():
    with open('./project/project.json', 'r') as json_file:
        data = json.load(json_file)
        return(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
