import 'dart:convert';
import 'package:http/http.dart' as http;

//Function that makes the request to Python
//Funcion que hace la peticion hacia Python

Future<dynamic> requestJSON() async{
  final url = Uri.parse("http://IP/project/load"); //Modify the IP address to the address given by Python with host 0.0.0.0 - Modificar la IP a la direccion que da Python con host 0.0.0.0
  try {
    final response = await http.get(url);

    if (response.statusCode == 200) {
      // Success: Decode the JSON response
      // Éxito: decodifica el JSON de la respuesta
      var data = jsonDecode(response.body);
      return data;
    } else {
      // Server error (404, 500)
      // Error del servidor (404, 500)
      print('Error del servidor: ${response.statusCode}');
    }
  } catch (e) {
    // Connection error (without internet)
    // Error de conexión (sin internet)
    print('Error de red: $e');
  }
}
