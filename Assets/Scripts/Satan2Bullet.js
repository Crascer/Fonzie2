var speed : float = 1;
var move : Vector3 = Vector3.zero;
var player : Transform;
var rot : boolean = false;
var angle : float;
var defined : boolean = false;

var run : int=0;

function Start () {
	player=GameObject.FindGameObjectWithTag("Player").transform;
	move = Vector3((player.transform.position.x)-transform.position.x, player.transform.position.y-transform.position.y, 0);
}

// Update is called once per frame
function Update () {
	var controller : CharacterController = GetComponent(CharacterController);
	if(rot && !defined){
		move = Vector3(Mathf.Cos(angle), Mathf.Sin(angle),0);
		defined = true;
	}
	
	if(run>=200)
		Erase();
	
	move.Normalize();
	move *= speed;
	
	controller.Move(move * Time.deltaTime);
	
	run++;
}


function Erase(){
	Destroy(this.gameObject);
}