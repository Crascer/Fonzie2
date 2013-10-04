#pragma strict

function Update () {
	
	transform.position.x -= 0.5;
	
	if(transform.position.x <= -20){
		Destroy(this.gameObject);
	}
	
}