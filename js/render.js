function render() {
    //===Rotate===
    //mesh.rotation.x+=0.01;
    mesh.rotation.y+=0.05;
    //===Move===
    mesh.position.x = bounce_x;
    mesh.position.y = bounce_y;
    bounce_x+= speed*direction_x;
    bounce_y+= speed*direction_y;
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