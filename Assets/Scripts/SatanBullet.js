#pragma strict

function OnTriggerEnter(other : Collider){
	if(other.transform.tag == "Player"){
		Debug.Log("Hit!");
	}
	
	if(other.transform.tag != "Boss" && other.transform.tag != "BossBullet" ){
		Debug.Log(other.transform.tag);
		transform.parent.transform.GetComponent(Satan2Bullet).Erase();
	}
}