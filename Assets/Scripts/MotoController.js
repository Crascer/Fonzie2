#pragma strict

var patterns : Transform[];
var range : int;
var random : int;

var child : Transform;
function Start(){
	range = patterns.Length;
	random = Random.Range(0, range);
	child = Instantiate(patterns[random], Vector3(40, -2.5, 0), transform.rotation);
}

function Update () {
	
	if(!child){
	Random.seed = Time.time;
	random = Random.Range(0, range);
	child = Instantiate(patterns[random], Vector3(40, -2.5, 0), transform.rotation);
	}
	
}