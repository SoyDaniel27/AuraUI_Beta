import 'package:auraui/widgets/row.dart';
import 'package:flutter/material.dart';
import 'functions/request.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aura UI Beta',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'Aura UI Beta'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late Future<dynamic> _data;
  String currentPage = 'Page 1'; // Default value - Valor por defecto

  @override
  void initState() {
    super.initState();
    _data = requestJSON(); // Call to the server - LLamada al servidor
  }

  //Promise to refresh the page
  //Saving the current page and requesting the information from the server again
  
  //Promesa para hacer el refresh en la pagina
  //Guardando en que pagina estamos y volviendo a solicitar la informacion al sevidor
  Future<void> _handleRefresh() async {
    setState(() {
      currentPage = currentPage;
      _data = requestJSON();
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text("Beta Aura UI"),
      ),
      body: FutureBuilder(future: _data, 
      builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot){
        if (snapshot.connectionState == ConnectionState.waiting) {
          return CircularProgressIndicator(); //Waiting for a response - Espera de la respuesta
        }
        else if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}'); //Communication error - Error en la comunicacion
        }
        else if (snapshot.hasData) {
          final data = snapshot.data;
          var datapage = data[currentPage];
          return RefreshIndicator(
            onRefresh: _handleRefresh, 
            child: ListView(
              children: [
                for ( var row in datapage) 
                //Creacion de las row dentro de una ListView
                  AuraRow(data: row,
                    onPageChange: (String newPage) {
                      setState(() {
                        currentPage = newPage; // This refreshes FutureBuilder with the new page - Esto refresca el FutureBuilder con la nueva página
                      });
                    },
                  )
            ],
          ));
        }
        return CircularProgressIndicator();
      })
    );
  }
}
