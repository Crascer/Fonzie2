#pragma strict

var controller : CharacterController;

var move : Vector3 = Vector3.zero;

var speed : float = 5;
var run : int=0;
var maxRun : int = 100;
var hitFX : Transform;

function Start() {
	controller = transform.GetComponent(CharacterController);
	transform.Find("Center").renderer.material.SetColor("_Color",  Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0), Random.Range(0.0,1.0)));
}

function Update() {
	move.Normalize();
	controller.Move(move*speed*Time.deltaTime);
	
	run++;
	
	if(run>=maxRun){
		Destroy(this.gameObject);
	}
	
}

function OnTriggerEnter(other : Collider){
	
	if(other.transform.tag == "Enemy" || other.transform.tag == "Boss"){
		other.transform.SendMessageUpwards("Hit");
	}
	Debug.Log(other.transform.name);
	if(other.transform.tag!="Bullet" && other.transform.tag!= "Player" && other.transform.tag!="Bound"){
		Instantiate(hitFX, transform.position, transform.rotation);
		Destroy(this.gameObject);
	}
}

function OnControllerColliderHit(hit : ControllerColliderHit){
	
	if(hit.transform.tag == "Enemy" || hit.transform.tag == "Boss"){
		hit.transform.SendMessageUpwards("Hit");
	}
	
	Debug.Log(hit.transform.name);
	
	if(hit.transform.tag!="Bullet" && hit.transform.tag!= "Player" && hit.transform.tag!="Bound"){
		Instantiate(hitFX, transform.position, transform.rotation);
		Destroy(this.gameObject);
	}
}

function OnGUI(){
	
}