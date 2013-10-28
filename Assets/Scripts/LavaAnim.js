#pragma strict

var anim : boolean = false;

function Update () {
	
	if(!anim){
		Anima();
	}
	
}

function Anima(){
	anim = true;
	var test : float = transform.renderer.material.GetTextureOffset("_MainTex").x;
	if(test>=1)
		transform.renderer.material.SetTextureOffset("_MainTex", Vector2(0,0));
	else
		transform.renderer.material.SetTextureOffset("_MainTex", Vector2(test+0.1,0));
	
	yield WaitForSeconds(0.1);
	anim = false;
}