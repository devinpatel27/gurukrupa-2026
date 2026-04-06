@echo off
set SRC=C:\Users\BAPS\.gemini\antigravity\brain\50415c64-aa8e-49e7-a17f-f8dcb09b4dc8
set DEST=D:\xampp\htdocs\gurukrupa

echo --- STARTING FINAL DEPLOYMENT ---

if not exist "%DEST%\public" mkdir "%DEST%\public"
if not exist "%DEST%\public\product-images" mkdir "%DEST%\public\product-images"

echo Deploying logo...
copy /Y "%DEST%\src\logo.svg" "%DEST%\public\logo.svg"

echo Deployed favicon placeholder...
echo. > "%DEST%\public\favicon.ico"

echo Deploying PNG images...
copy /Y "%SRC%\*.png" "%DEST%\public\product-images\"

echo Initializing Git...
cd /d "%DEST%"
git init
git add .
git commit -m "Repaired assets and repository"

echo --- VERIFICATION ---
dir /a "%DEST%\.git"
dir /s "%DEST%\public"

echo --- DONE ---
