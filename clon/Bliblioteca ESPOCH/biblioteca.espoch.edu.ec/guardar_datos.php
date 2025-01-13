<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
// guardar_datos.php

// Configura tu conexión a la base de datos
$servername = "localhost"; // Usualmente es localhost
$username = "root";        // Nombre de usuario de la base de datos (por defecto en localhost es "root")
$password = "";            // Contraseña de la base de datos (dejar en blanco en local, o agregarla si tiene contraseña)
$dbname = "cloning";   // Nombre de la base de datos que creaste

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos enviados por AJAX
$data = json_decode(file_get_contents('php://input'), true);

$userid = $data['userid'];
$password = $data['password'];

// Aquí deberías usar password_hash() para almacenar las contraseñas de manera segura
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Preparar la consulta para insertar los datos en la tabla 'usuarios'
$stmt = $conn->prepare("INSERT INTO usuarios_biblioteca_fisica (userid, password) VALUES (?, ?)");
$stmt->bind_param("ss", $userid, $hashed_password);

// Ejecutar la consulta
if ($stmt->execute()) {
    // Si la inserción es exitosa, enviar una respuesta de éxito
    echo json_encode(['success' => true]);
} else {
    // Si ocurre un error, enviar una respuesta de error
    echo json_encode(['success' => false]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
