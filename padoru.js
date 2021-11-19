import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';

var scene, mesh, camera;
var ceiling = 1.8, floor = -2.5, rwall = 3.2, lwall= -3.2;
var speed = 0.02;
var bounce_x, bounce_y;
var direction_x = 1, direction_y = 1;
var scale = 2;
var wall_scale = 2;
var renderer;
var width = 7, height = 5;
var color = "red";
var texture, textureLoader;

var colors = ['red','grey','blue'];

function init(){
  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera( width / - 2,
    width / 2,
    height / 2,
    height / - 2,
    1, 1000 );

  camera.position.z = 3;
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor("#031216");
  renderer.setSize(document.body.clientWidth, window.innerHeight);
  console.log(window.innerWidth+ " "+ window.innerHeight);
  console.log(document.body.clientWidth+ " "+ document.body.clientHeight);
  document.body.appendChild(renderer.domElement);

  var loader = new GLTFLoader;

  loader.load( 'models/nero_padoru/nero.gltf',
      function ( gltf ) {
          mesh = gltf.scene;
          scene.add( mesh );
          render();
          recolor(mesh);
      },
      undefined,
      function ( error ) {
          console.error( error );
      }
  );
  //===Light===
  var light = new THREE.PointLight(0xffffff,1,500);
  light.position.set(camera.position.z*2, 0, camera.position.z*5);
  scene.add(light);
  //===Border, Speed, Bounce, Coordinates Variables===
  bounce_x = lwall;
  bounce_y = ceiling;
  //===Recalculates camera angle and borders after window resize===
  window.addEventListener('resize', () => {
      let width = window.innerWidth/200, height = window.innerHeight/200;
      camera.left = width / - 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = - height  / 2;

      renderer.setSize( window.innerWidth, window.innerHeight );
      camera.updateProjectionMatrix();
  });
  //Texture
  textureLoader = new THREE.TextureLoader();

  texture = textureLoader.load( 'models/textures/'+color+'.png' );
  texture.flipY = false;
}

function render() {
    //===Rotate===
    //mesh.rotation.x+=0.01;
    mesh.rotation.y += 0.05;
    //===Move===
    mesh.position.x = bounce_x;
    mesh.position.y = bounce_y;
    // mesh.position.x = 200;
    // mesh.position.y = 500;
    //console.log(mesh.position.x + " " + mesh.position.y);
    bounce_x += speed*direction_x;
    bounce_y += speed*direction_y;
    //===Bounce off the borders===
    if(bounce_x > rwall || bounce_x < lwall){
        direction_x*=-1;
    }
    if(bounce_y > ceiling||bounce_y < floor){
        direction_y*=-1;
    }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function recolor(){
    mesh.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.material.map = texture;
        };
    });
    color = cycleColors();
    texture = textureLoader.load( 'models/textures/' + color + '.png' );
    texture.flipY = false;
    setTimeout(recolor, 5000);
}

function cycleColors(){
    for(var i=0;i<colors.length;i++){
        if(i == colors.length-1){
            return colors[0];
        }
        if(colors[i] == color){
            return colors[i+1];
        }
    }
}

init();
