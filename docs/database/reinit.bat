@echo off

echo ================================
echo REINITIALISATION DATABASE
echo ================================

REM Configuration
set MYSQL_USER=root
set MYSQL_PASSWORD=
set DB_NAME=glpi_db

REM Chemin mysql.exe
set MYSQL_BIN=D:\xampp\mysql\bin

echo.
echo Suppression de la base...
"%MYSQL_BIN%\mysql.exe" -u %MYSQL_USER% -e "DROP DATABASE IF EXISTS %DB_NAME%;"

echo.glpi_db
echo Creation de la base...
"%MYSQL_BIN%\mysql.exe" -u %MYSQL_USER% -e "CREATE DATABASE %DB_NAME%;"

echo.
echo Importation du fichier SQL...
"%MYSQL_BIN%\mysql.exe" -u %MYSQL_USER% %DB_NAME% < glpi_db_v3.sql

echo.
echo ================================
echo REINITIALISATION TERMINEE
echo ================================

pause