
var maxX,minX,midX,maxY,minY,midY;
var viewAngle = 75;
var aspectRatio = window.innerWidth / window.innerHeight;
var near = 0.01;
var far = 1000000;
var camera = new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far);
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var cube;
var group;
var sphere;
var pointLight = new THREE.PointLight(0xFFFFFF);
var mouseX = 0;
var mouseY = 0;
var fov=0;


function init(){
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.body.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
  window.addEventListener('resize',onWindowResize,false);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  pointLight.position.x = 10;
  pointLight.position.y = 1000;
  pointLight.position.z = 200;

  var xcor = [];
  var ycor = [];

  for (var i = 0; i < data.length; i++) {

    if(data[i].X > 0 && data[i].Y >0){
      xcor.push(data[i].X);
      ycor.push(data[i].Y);
    }

  }

  //removing non numeric elements
  xcor = xcor.filter(function(e) {
    return e.length && e==+e;
  });

  ycor = ycor.filter(function(e) {
    return e.length && e==+e;
  });

  maxX = Math.max(...xcor);
  minX = Math.min(...xcor);
  maxY = Math.max(...ycor);
  minY = Math.min(...ycor);
  midX = maxX - minX;
  midY = maxY - minY;
  createSpheres(40,20,10);
  scene.add(group);
  scene.add(pointLight);
  camera.position.set(0,0,40000);
  camera.lookAt(new THREE.Vector3(0,0,0));
  scene.add(camera);
}

function createLoc(){
  var geometry = new THREE.SphereGeometry( 300, 32, 32 );
  var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe:false
  });
  var sphere = new THREE.Mesh(geometry,material);
  sphere.position.x = ((myX - minX) - midX/2)/2 - maxX/4.85;
  sphere.position.y = ((myY - minY) - midY/2)/2 - maxY/5;
  scene.add(sphere);

}



function createSpheres(rad,seg,rings){
  var createSphere = function(){
    var newSphere = new THREE.SphereGeometry()
  };

  var radius = rad;
  var segments = seg;
  var rings = rings;
  var sphereMaterial = new THREE.MeshBasicMaterial(
    {
      color: 0xFFFFFF,
      wireframe: true
    });
    var sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);
    group = new THREE.Object3D();
    for(var i =0;i<data.length;i++){
      sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

      sphere.position.x = ((data[i].X - minX) - midX/2)/2-maxX/5;
      sphere.position.y =((data[i].Y - minY) - midY/2)/2 - maxY/7;

      group.add(sphere);
    }
  }



  function animatedRender(){
    requestAnimationFrame(animatedRender);
    createLoc();
    //group.rotation.x +=-0.08*input/1000;
    //group.rotation.y +=-0.04*input/1000;
    //group.rotation.z +=0.015*input/1000;

    renderer.render(scene,camera);

    //set background color
    // bgColor = new THREE.Color(0,0,0);
    // renderer.setClearColor(bgColor,1);
  }



  function onDocumentMouseMove(event){
    mouseX = (event.clientX - window.innerWidth/2);
    mouseY = (event.clientY -window.innerHeight/2);
  }

  function onDocumentMouseWheel(event)
  {
    camera.position.z -= event.wheelDeltaY * 5;
  }


  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  }

  init();
  animatedRender();
