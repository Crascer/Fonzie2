#pragma strict



function Update () {

	transform.position.x -= 0.5;
	
	if(transform.position.x <=15){
		var falling : Component[] = transform.GetComponentsInChildren(Rigidbody);
		for(var i : Rigidbody in falling)
			Crush(i);		
	}
	
	if(transform.position.x <= -20){
		Destroy(this.gameObject);
	}
}

function Crush( i : Rigidbody){
	i.useGravity = true;
	yield WaitForSeconds(0.4);
}