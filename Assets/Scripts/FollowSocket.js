#pragma strict

var player : Transform;

function Start () {
	player = GameObject.FindGameObjectWithTag("Player").transform;
}

function Update () {
	lookAt();
	Debug.Log("" + transform.rotation);
}

function lookAt(){
	if(player){
		var rotation = Quaternion.LookRotation(player.transform.position - transform.position);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotation, 0);
		
	}
}