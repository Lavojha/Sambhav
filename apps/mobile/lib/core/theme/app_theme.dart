import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData get light {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,

      colorScheme: ColorScheme.fromSeed(
        seedColor: Colors.indigo,
      ),

      scaffoldBackgroundColor:
          const Color(0xFFF7F7F8),

      inputDecorationTheme:
          const InputDecorationTheme(
        border: OutlineInputBorder(),
      ),
    );
  }
}
