import 'package:flutter/material.dart';
class AuraImage extends StatelessWidget {
  final dynamic data; 
  
  
  const AuraImage({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    return Image.network(
      //This refreshes FutureBuilder with the new page//Get the image link (web only)
      //Obtener el link de la imagen (unicamente en web)
      data['source'],
      fit: BoxFit.cover, //Fit the image in the parent container - Acomodar la imagen en el contenedor padre
      //In case of error
      //En caso de error
      errorBuilder: (context, error, stackTrace) {
         return Container( //Return a container - Retornar un container 
          color: Colors.grey[300],
          child: const Icon(
            Icons.broken_image,
            color: Colors.grey,
            size: 50,
          ),
        );
      },
    );
  }
}
