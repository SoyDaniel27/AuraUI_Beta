import 'package:flutter/material.dart';
class AuraText extends StatelessWidget {
  final dynamic data; 
  
  
  const AuraText({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    return Text(
      data['text'],
      //Estilos rescatados del JSON
      style:TextStyle(
        color: Color.fromRGBO(data['color'][0], data['color'][1], data['color'][2], data['color'][3].toDouble()),
        fontSize: data['fontsize'].toDouble()
      ),
      softWrap: true, //Ajuste multilinea
      maxLines: null, //Permite líneas infinitas
      overflow: TextOverflow.clip
    );
  }
}