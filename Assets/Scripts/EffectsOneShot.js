#pragma strict

function Start () {

}

function Update () {
	if(!transform.particleSystem.IsAlive()){
		Destroy(this.gameObject);
	}
}