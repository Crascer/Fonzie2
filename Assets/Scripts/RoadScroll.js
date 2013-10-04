#pragma strict

var crater : Transform;

function Update () {
	
	transform.position.x -= 0.5;
	
	if(transform.position.x <= -20){
	Random.seed = Time.time;
	var alert : int = Random.Range(0,51);
	
	if(alert >17 && alert<22 && !GameObject.FindGameObjectWithTag("Crater")){
		Instantiate(crater, Vector3(40,-3.5,0), transform.rotation);
		transform.position.x = 60;
	}else if(GameObject.FindGameObjectWithTag("Crater")){
		transform.position.x = 60;
	}else
		transform.position.x =40;
	}
	
}