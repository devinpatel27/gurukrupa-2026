@echo off
set SRC=C:\Users\BAPS\.gemini\antigravity\brain\50415c64-aa8e-49e7-a17f-f8dcb09b4dc8
set PUB=D:\xampp\htdocs\gurukrupa\public
set IMG=%PUB%\product-images

if not exist "%PUB%" mkdir "%PUB%"
if not exist "%IMG%" mkdir "%IMG%"

echo Copying Logo...
copy /Y "D:\xampp\htdocs\gurukrupa\src\logo.svg" "%PUB%\logo.svg"

echo Copying Products...
copy /Y "%SRC%\ro_purifier_1775470141435.png" "%IMG%\"
copy /Y "%SRC%\tabletop_filter_1775470191344.png" "%IMG%\"
copy /Y "%SRC%\under_sink_ro_1775470206804.png" "%IMG%\"
copy /Y "%SRC%\water_dispenser_1775470175127.png" "%IMG%\"
copy /Y "%SRC%\filter_cartridge_1775470221849.png" "%IMG%\"
copy /Y "%SRC%\media__1775468393511.png" "%IMG%\"
copy /Y "%SRC%\media__1775468411478.png" "%IMG%\"
copy /Y "%SRC%\media__1775468423705.png" "%IMG%\"
copy /Y "%SRC%\media__1775468466395.png" "%IMG%\"
copy /Y "%SRC%\media__1775469360494.png" "%IMG%\"
copy /Y "%SRC%\media__1775469815657.png" "%IMG%\"
copy /Y "%SRC%\media__1775469821610.png" "%IMG%\"
copy /Y "%SRC%\media__1775477087885.png" "%IMG%\"
copy /Y "%SRC%\media__1775477976767.png" "%IMG%\"

echo Initializing Git...
cd /d "D:\xampp\htdocs\gurukrupa"
git init
git add .
git commit -m "Repaired assets and repository"

echo Verifying...
dir /a "%PUB%"
dir /a "%IMG%"
dir /a ".git"
