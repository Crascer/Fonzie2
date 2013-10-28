#pragma strict

var delay : float = 3;

var bullet : Transform;

var shooting : boolean = false;

function Start () {

}

function Update () {
	if(!shooting)
		Spara();
}

function Spara(){
	shooting = true;
	Instantiate(bullet, transform.position-Vector3(0,0,2), transform.rotation);
	yield WaitForSeconds(delay);
	shooting = false;
}