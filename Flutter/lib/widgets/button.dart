import 'package:flutter/material.dart';
class AuraButton extends StatelessWidget {
  final dynamic data; 
  final Function(String) onPageChange;
  
  const AuraButton({super.key, required this.data, required this.onPageChange});

  @override
  Widget build(BuildContext context) {
    //Funcion que rescata el valor GoTo del JSON en el widget button
    return ElevatedButton(onPressed: (){
      onPageChange(data['GoTo']);
    },
      //Estilos del boton (color del boton)
      style: ElevatedButton.styleFrom(
        backgroundColor: Color.fromRGBO(data['backgroundColor'][0], data['backgroundColor'][1], data['backgroundColor'][2], data['backgroundColor'][3].toDouble())
      ), 
      //Texto y color del texto del boton
    child: Text(
      data['text'],
      style: TextStyle(
        color: Color.fromRGBO(data['textColor'][0], data['textColor'][1], data['textColor'][2], data['textColor'][3].toDouble())
        ),
      )
    );
  }
}