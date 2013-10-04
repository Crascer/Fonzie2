#pragma strict

function OnTriggerEnter(other : Collider){
	if(other.transform.tag == "Player"){
		yield WaitForSeconds(2);
		Application.LoadLevel(Application.loadedLevel);
	}
}