import 'package:auraui/widgets/button.dart';
import 'package:auraui/widgets/image.dart';
import 'package:auraui/widgets/text.dart';
import 'package:flutter/material.dart';
class AuraRow extends StatelessWidget {
  final dynamic data; 
  final Function(String) onPageChange;
  
  
  const AuraRow({super.key, required this.data, required this.onPageChange});

  @override
  Widget build(BuildContext context) {
    final flex = 12/data['columns']; //Obtain the flex of the division 12/(Number of columns) - Obtener el flex de la division 12/(Numero de columnas)
    final slots = data['slots']; //Obtain the Row slots - Obtener los slots del Row
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        for ( var slot in slots)
        Expanded(
          flex: flex.toInt(),
          child: Padding(padding: const EdgeInsets.all(10.0),
            child: Container(
              //Slot style
              //Estilos del slot
              color: Color.fromRGBO(slot['backgroundColor'][0], slot['backgroundColor'][1], slot['backgroundColor'][2], slot['backgroundColor'][3].toDouble()),
              height: data['height'].toDouble() ?? 50.toDouble(),
              child: Center( //Focused content - Contenido centrado
                child: buildWidget(slot['widget'][0], onPageChange), //Invocador del constructor
              )
            ),
          )
        )
      ],

    );
  }
}

//Function to know which widget will be built inside the slot
//Funcion para saber que widget se va a construir dentro del slot
Widget buildWidget (Map<String, dynamic> data, Function(String) onPageChange) {
  if (data['type'] == 'text') {
    return AuraText(data: data);
  } else if (data['type'] == 'image'){
    return AuraImage(data: data);
  }
  else if (data['type'] == 'button'){
    return AuraButton(data: data, onPageChange: onPageChange);
  }
  return(Text(data['type']));
}
