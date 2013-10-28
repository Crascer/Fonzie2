#pragma strict

var run : int = 0;
var controller : CharacterController;


function Start () {
}

function Update () {
	var controller : CharacterController = GetComponent(CharacterController);
	if(run>=200)
			Erase();
		
		controller.Move(Vector3(0,15,0) * Time.deltaTime);
		
		run++;
}

function Erase(){
	Destroy(this.gameObject);
}