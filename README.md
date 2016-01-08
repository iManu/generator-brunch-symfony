Brunch Symfony - Symfony2
=========================

## Intro

Initialy forked from [generator-joli-symfony](https://github.com/jolicode/generator-joli-symfony) by Laurent Brunet <lbrunet@jolicode.com> 👍

* Remove grunt and gulp, only brunch can survive !
* Add post-css & browserSync
* Add Foundation Sites & Knacss as alternatives to Bootstrap Sass
* Overwrite basic html.twig files after Sensio zip download

I remove too much things to pretend this project can be pull-requested, so it is not forked anymore on my github account.
Anyway, big thanks to initiator's guys. Now this project live on it's own. It was make for a very special and limited purpose, so I cannot say if it will be updated frequently.

## What it does

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

* Front-end framework:
  * [Bootstrap-sass-official](https://github.com/twbs/bootstrap-sass)
  * [Foundation Sites](http://foundation.zurb.com/sites/docs/)
  * [KNACSS](https://github.com/alsacreations/KNACSS/)

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

### Yeoman

Install all the stuff with Yo generator.

- Install: `npm install -g yo bower grunt-cli gulp`
- Install: `npm install -g generator-brunch-symfony`

In the working dir you want :

- Run: `yo brunch-symfony --force`

Now all the files and folders are alive.

### Symfony

In your working folder root previoulsy generated :

- Run: `php bin/console server:run`

Now Symfony is running on it's own server (localhost:8000)

### Brunch

- Run (same folder, in other terminal window) : `brunch watch`

Now BrowserSync is alive, open browser tab on the local port BS running (:3000 by default)

## Front-end ?

I am not a Back-end engineer. I have poor knowledge of Symfony (just that the Front engineer need to know about, that's all), but I know Twig templating engine and I love it.
This project is Front-end oriented, because as you surely know IRL the client has already made his choice : Symfony or burst !
Here we can work in -almost- real environment. Maybe, if communication is enabled between Back and Front guy's (Hello Slack) then we can work on same repo ? 🎏 Dreams are not so unreal…

* Frontend stuff is located in **app/Resources/[js, scss, views, assets]**.
* Brunch auto generate builded assets to web/[js, css] and copy app/Resources/assets/ content directly in web folder root.
* BrowserSync watch any modifications in web/[js, css] & app/Resources/views, auto inject or reload page according to the case.

In sum, this not the place to experienced advanced Javascript stuffs. As I know, Symfony is a really good performer to do complex things even it's in server side because of it's fabulous cache systems modules addons. So you can experienced strong and modern CSS, improve HTML5 wellformed architecture, etc. but don't expect to walk on the moon 👽 with JS here, I think.

## Contribution

Feel free to fork, or clone for a new start. I really don't know if I can maintain this project for weeks and weeks.
Initially it was made for a very special limited case and obviously for testing myself.


