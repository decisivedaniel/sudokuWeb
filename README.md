# Sudoku Game
Complete sudoku application running entirely client side in your browser using Angular v.11 now updating to version 18.

Version 11 work done under my old github account, new work is done under my new github account.

To play go to: Re-implementing this with automatic flows

# What I learned
- Angular routing
- Separation of angular components
- Code based testing UI with angular forms 
- How to deploy to github pages 
- Updating through many versions in Angular

# Improvements
Just open an issue and I will consider it.

# Build Local
1. Pull Repo
2. Install Node.js
3. Install Angular/cli
4. Open Local copy in favorite ide (like Visual Studio Code)
5. Install needed packages with `npm install`
6. Run `ng serve` into the terminal

# Deployment to Github Pages
1. Pull the repository
2. Install Node.js
3. Build using Angular: `ng build --prod --output-path docs --base-href /sudokuWeb/`
4. In `/docs` copy `index.html` and rename the copy `404.html` for GitHub Pages
