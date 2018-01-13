@echo off
echo "NPM"
cd src\rl\
call npm install
echo "Generate static file"
call npm run build
echo "Deploy"
cd ..\..
xcopy %DEPLOYMENT_SOURCE%\src\rl\index.html %DEPLOYMENT_TARGET% /Y /E 
xcopy %DEPLOYMENT_SOURCE%\src\rl\app.bundle.js %DEPLOYMENT_TARGET% /Y /E
xcopy %DEPLOYMENT_SOURCE%\dist\web.config %DEPLOYMENT_TARGET% /Y /E
xcopy %DEPLOYMENT_SOURCE%\src\rl\lib %DEPLOYMENT_TARGET%\lib\ /Y /E /S
xcopy %DEPLOYMENT_SOURCE%\src\rl\music %DEPLOYMENT_TARGET%\music\ /Y /E /S
