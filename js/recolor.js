function recolor(){
    mesh.traverse( function ( child ) {
        if ( child.isMesh ) {
            child.material.map = texture;
        };
    });
    color = cycle();
    texture = textureLoader.load( 'models/textures/' + color + '.png' );
    texture.flipY = false;
    setTimeout(recolor,5000);
}

function cycle(){
    for(var i=0;i<colors.length;i++){
        if(i==colors.length-1){
            return colors[0];
        }
        if(colors[i]==color){
            return colors[i+1];
        }
    }
}

colors = ['red','grey','blue'];