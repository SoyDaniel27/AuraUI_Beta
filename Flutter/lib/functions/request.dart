import 'dart:convert';
import 'package:http/http.dart' as http;

//Funcion que hace la peticion hacia Python

Future<dynamic> requestJSON() async{
  final url = Uri.parse("http://IP/project/load"); //Modificar la IP a la direccion que da Python con host 0.0.0.0
  try {
    final response = await http.get(url);

    if (response.statusCode == 200) {
      // Éxito: decodifica el JSON de la respuesta
      var data = jsonDecode(response.body);
      return data;
    } else {
      // Error del servidor (404, 500)
      print('Error del servidor: ${response.statusCode}');
    }
  } catch (e) {
    // Error de conexión (sin internet)
    print('Error de red: $e');
  }
}