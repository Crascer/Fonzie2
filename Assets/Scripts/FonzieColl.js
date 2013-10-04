#pragma strict

function OnTriggerEnter(other : Collider){
	Debug.Log("Test");
	
	if(other.transform.name.Contains("Focus")){
		Destroy(other.transform.parent.gameObject);
	}
	
}