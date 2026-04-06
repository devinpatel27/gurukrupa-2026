@echo off
if not exist public mkdir public
if not exist public\product-images mkdir public\product-images
copy logo.svg public\logo.svg
copy "C:\Users\BAPS\.gemini\antigravity\brain\50415c64-aa8e-49e7-a17f-f8dcb09b4dc8\*.png" public\product-images\
echo Assets deployed successfully.
