Brunch Symfony - Symfony2
=========================

Initialy forked from [generator-joli-symfony](https://github.com/jolicode/generator-joli-symfony) by Laurent Brunet <lbrunet@jolicode.com> 👍

* Remove grunt and gulp, only brunch can survive !
* Add post-css & browserSync
* Overwrite basic html.twig files after Sensio zip download

generator-brunch-symfony is a [Yeoman Generator](http://yeoman.io/generators/) to scaffold Symfony2 projects with sensible defaults, common bundles and frontend tools.

It will create a new Symfony project, remove Assetic and replace it with Brunch.

## Dependencies

Mandatory dependencies :

- [npm](http://nodejs.org/)
- [yo](http://yeoman.io/)
- [brunch](http://brunch.io/)

## What you can choose

* Symfony 2 Standard Edition:
 * The list of versions of symfony is available [here](https://symfony.com/versions.json)

* Brunch:
 * [sass-brunch](https://github.com/brunch/sass-brunch)
 * [postcss-brunch](https://github.com/iamvdo/postcss-brunch) *postcss is coming with autoprefixer & csswring*
 * [uglify-js-brunch](https://github.com/brunch/uglify-js-brunch)
 * [babel-brunch](https://github.com/babel/babel-brunch)
 * [browser-sync-brunch](https://github.com/ocombe/browser-sync-brunch)
* Bootstrap-sass-official

## Default workflow

* Installs Symfony
* Removes Assetic for versions lower than 2.8
* Starts the automatic execution of `bower` and `npm` after scaffolding has finished.

## Assets location

Assets are stored in the **app/Resources/** folder :

* app/Resources/scss
* app/Resources/assets/fonts
* app/Resources/...

## Getting Started

- Install: `npm install -g yo`
- Install: `npm install -g generator-brunch-symfony`
- Run: `yo brunch-symfony --force`

