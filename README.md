## To Use

```bash
# Clone this repository
git clone https://github.com/ashvin777/pilosolapp
# Go into the repository
cd pilosolapp
# Install dependencies and run the app
npm install && npm run clean && npm start
```

## TL:DR - building runtimes

On OSX you can run `./buildall` to build binaries of "everything"... maybe...

Run `npm run pack` to create packages for all platforms - these are the files required to run, they are not binary installers.

Builds are created in the `build` directory. Runtimes are created in the `../electron-bin` directory.

**Note**: this was written to work on a Mac... other tools may/will be needed on other platforms.

## Packaging your application

If you want to distribute executables of this project, the easiest way is to use electron-packager:

```
sudo npm install -g electron-packager

# build for OSX 64 bits
electron-packager . app --icon=app.icns --platform=darwin --arch=x64 --out=build --overwrite

# build for Windows 64 bits
electron-packager . app --icon=app.icns --platform=win32 --arch=x64  --out=build --asar=true --overwrite --win32metadata.CompanyName='IBM Corp.' --win32metadata.ProductName='app Electron'

# build for Linux 64 bits
electron-packager . app --icon=app.icns --platform=linux --arch=x64 --out=build --overwrite
```

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).


### To package as a dmg

`npm run build:osx`

    sudo npm install -g appdmg

    appdmg appdmg.json ~/Desktop/app.dmg


### To package as a deb

`npm run build:linux64` or `npm run build:linux32` - for Intel Linux

    fpm -s dir -t deb -f -n app-electron -v 0.16.2 -m your-email@example.com -a i386 app-linux-ia32/
    fpm -s dir -t deb -f -n app-electron -v 0.16.2 -m your-email@example.com -a x86_64 app-linux-x64/

Use **sudo dpkg -i ...*** to install the correct deb for your architecture.

Use `app` command to run. Flows are stored in `~/.app`.


### To package as an exe

`npm run build:win32` - to build for 32-bit Windows.

`npm run build:win64` - to build for 64-bit Windows.

**Note**: This project was built to run on Mac OSX - To build for windows on other platforms you may need to use other tools.
