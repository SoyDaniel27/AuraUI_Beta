# AuraUI_Beta ENG
# 🚀 AuraUI: Server-Driven UI (SDUI) Micro - Framework

**AuraUI** is a development ecosystem designed for the dynamic creation and rendering of user interfaces. This project allows you to visually design components in an administrative panel, distribute them through an API, and display them natively in a mobile application without needing to recompile the client code.

---

## 🏗️ System Architecture

The project implements a circular data flow divided into three independent technology layers:

1. **CMS (React + JS):** A "No-Code" visual editor for managing rows, slots, and widgets. It generates the logical structure in JSON format.
2. **Server (Python):** A backend layer responsible for receiving configurations from the editor and serving them via a REST API.
3. **Renderer (Flutter):** A mobile client that dynamically consumes JSON and builds the interface using native components.

---

## Technology Stack

| Componente | Carpeta | Tecnologías Principales |
| :--- | :--- | :--- |
| **Frontend / Builder** | `/CMS` | React, JavaScript, CSS Modules, React-Colorful |
| **API / Backend** | `/Server` | Python, Flask |
| **Mobile Client** | `/Flutter` | Dart, Flutter SDK, HTTP Client |

---

## Installation and Configuration

### 1. Admin Panel (React)
Navigate to the editor's folder to install dependencies and run the development server:
```bash
cd CMS
npm install
npm run dev
```

### 2. Server (Python)
```
cd Server
pip install -r requirements.txt
python app.py
```

### 3. Render (Flutter)
```
cd Flutter
flutter pub get
flutter run
```

**## Sample JSON Contract**
```
{
  "id": "row_unique_123",
  "columns": 2,
  "height": 150,
  "slots": [
    {
      "id": 1711314560,
      "backgroundColor": [255, 255, 255, 255],
      "widget": [
        {
          "type": "text",
          "text": "Bienvenidos a AuraUI",
          "fontsize": 20,
          "color": [0, 0, 0, 255]
        }
      ]
    }
  ]
}
```
---

## Contributions and Feedback

Contributions are more than welcome! This is a constantly evolving project, and any suggestions for improving the architecture, optimizing the code, or adding new features are greatly appreciated.

If you have ideas about:
- **Performance improvements** in Flutter rendering.

- **New Widget types** for the CMS.

- **API optimization** in Python.

- **Any "Clean Code"** you consider necessary.

All constructive criticism helps me improve as a developer.

---



# AuraUI_Beta ESP
# 🚀 AuraUI: Server-Driven UI (SDUI) Framework

**AuraUI** es un ecosistema de desarrollo diseñado para la creación y renderizado dinámico de interfaces. Este proyecto permite diseñar componentes visualmente en un panel administrativo, distribuirlos a través de una API y visualizarlos de forma nativa en una aplicación móvil sin necesidad de recompilar el código del cliente.

---

## 🏗️ Arquitectura del Sistema

El proyecto implementa un flujo de datos circular dividido en tres capas de tecnología independientes:

1.  **CMS (React + JS):** Editor visual "No-Code" para la gestión de *rows*, *slots* y *widgets*. Genera la estructura lógica en formato JSON.
2.  **Server (Python):** Capa de backend encargada de recibir las configuraciones del editor y servirlas mediante una API REST.
3.  **Renderer (Flutter):** Cliente móvil que consume el JSON dinámicamente y construye la interfaz utilizando componentes nativos.

---

## Stack Tecnológico

| Componente | Carpeta | Tecnologías Principales |
| :--- | :--- | :--- |
| **Frontend / Builder** | `/CMS` | React, JavaScript, CSS Modules, React-Colorful |
| **API / Backend** | `/Server` | Python, Flask |
| **Mobile Client** | `/Flutter` | Dart, Flutter SDK, HTTP Client |

---

## Instalación y Configuración

### 1. Panel de Administración (React)
Entra en la carpeta del editor para instalar las dependencias y ejecutar el servidor de desarrollo:
```bash
cd CMS
npm install
npm run dev
```

### 2. Servidor (Python)
```
cd Server
pip install -r requirements.txt
python app.py
```

### 3. Render (Flutter)
```
cd Flutter
flutter pub get
flutter run
```

**## Muestra del contrato JSON**
```
{
  "id": "row_unique_123",
  "columns": 2,
  "height": 150,
  "slots": [
    {
      "id": 1711314560,
      "backgroundColor": [255, 255, 255, 255],
      "widget": [
        {
          "type": "text",
          "text": "Bienvenidos a AuraUI",
          "fontsize": 20,
          "color": [0, 0, 0, 255]
        }
      ]
    }
  ]
}
```
---

##  Contribuciones y Feedback

¡Las aportaciones son más que bienvenidas! Este es un proyecto en constante evolución y cualquier sugerencia para mejorar la arquitectura, optimizar el código o añadir nuevas funcionalidades es de gran ayuda.

Si tienes ideas sobre:
- **Mejoras de rendimiento** en el renderizado de Flutter.
- **Nuevos tipos de Widgets** para el CMS.
- **Optimización de la API** en Python.
- **Cualquier "Clean Code"** que consideres necesario.

Toda crítica constructiva me ayuda mejorar como desarrollador

---
Demo


https://github.com/user-attachments/assets/eab742ab-3da2-4769-8f93-812fbf7a75aa


