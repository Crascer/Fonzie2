#pragma strict

var controller : Transform;
var fireball : Transform;

var player : boolean = false;

function OnTriggerEnter(hit : Collider){
	if(hit.transform.tag == "Player" && ! player){
		player = true;
		Application.LoadLevel(Application.loadedLevel);
	} else if(hit.transform.tag == "Bullet"){
		Debug.Log("Hello!");
		Destroy(hit.gameObject);
		Instantiate(fireball, hit.transform.position, Quaternion.Euler(0,0,0));
	}
}