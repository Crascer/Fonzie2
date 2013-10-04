#pragma strict
public var speed : float = 7.0;
public var teleportActive : int = 20 ;
public var maxHealth : int = 20;
private var currentHealth : int;
private var isDead : boolean = false;
var canShoot : boolean = true;
var shooting : boolean = false;

private var isNormal : boolean = false;
private var isTeleport : boolean = false;
private var isExplosion : boolean = false;
private var isRepairing : boolean = false;
private var attackStarted : boolean = false;

private var player : Transform;

private var controller : CharacterController;

private var gravity : Vector3 = Vector3.zero;

var ball : Transform;

var hit : boolean;

var spawns : Transform[];

var mode : int = 0;

function Start () {
	controller=GetComponent(CharacterController);
  	currentHealth=maxHealth;
 	player=GameObject.FindGameObjectWithTag("Player").transform;
 	ChangeBehaviour();
}

function Update () {
	if(!isDead){
		if(player){
			if(isNormal){
				if (!attackStarted){
					attackStarted = true;
					NormalBehaviour();
				}
			}
			if (isTeleport){
				if(!attackStarted){
					attackStarted = true;
					Teleport();
					}
			}
			if(isExplosion){
				if(!attackStarted){
					attackStarted = true;
					Explosion();
				}
			}
			if(isRepairing){
			
			}
		}		
		if(!controller.isGrounded){
			gravity += Physics.gravity*Time.deltaTime*2;
			
			controller.Move(gravity*Time.deltaTime);
		}
	}else {
		Destroy(this.gameObject);
	}
	
}

function Hit(){
	currentHealth--;
	hit = true;
	if(currentHealth <= 0)
		isDead=true;
}

function NormalBehaviour(){
	while(attackStarted){
		if(!hit){
		if(canShoot && !shooting){
			shooting = true;
			Instantiate(ball, transform.Find("GameObject").transform.position, transform.Find("GameObject").transform.rotation);
			canShoot = false;
		}	
		yield WaitForSeconds(2);
		canShoot = true;
		shooting = false;
		} else {
			Random.seed = Time.time;
			var teleport : int = Random.Range(0,spawns.Length);
			transform.position = spawns[teleport].position;
			hit = false;
			
		}
		if(currentHealth<=15)
			ChangeBehaviour();
	}
}

function Teleport(){
	while(attackStarted){
	var teleport : int = Random.Range(0,spawns.Length);
	var numberOfRandomTeleport :  int = Random.Range(1,9);
	var i : int = 0;
	for(i=0; i<=numberOfRandomTeleport ; i++){
		teleport = Random.Range(0,spawns.Length);
		transform.position = spawns[teleport].position;	
		yield WaitForSeconds(0.2);
		}
		transform.position = spawns[teleport].position;	
		Instantiate(ball, transform.Find("GameObject").transform.position, transform.Find("GameObject").transform.rotation);
		yield WaitForSeconds(2);
		
		Random.seed = Time.time;
		
		if(currentHealth<10)
			ChangeBehaviour();
	}
}

function Explosion(){
	while(attackStarted){
		
		var angle : float = 0;
		
		while(angle<= 360){
			var rotating : Transform = Instantiate(ball, transform.Find("GameObject").transform.position, transform.Find("GameObject").transform.rotation);
			rotating.transform.GetComponent(Satan2Bullet).rot = true;
			rotating.transform.GetComponent(Satan2Bullet).angle = angle;
			yield WaitForSeconds(0.1);
			angle += 45;
		}
		
		yield WaitForSeconds(1.5);
		Random.seed = Time.time;
		var teleport : int = Random.Range(0,spawns.Length);
		transform.position = spawns[teleport].position;	
		
		
	}
}

function ChangeBehaviour(){
	attackStarted = false;
	if(!isRepairing){
		if(currentHealth >= 15){
			isNormal=true;
			mode = 0;
		}
			//attacco con palle di fuoco
		if(currentHealth <= 15 && currentHealth >= 10){
		isTeleport=true;
		mode = 1;
		}
		//attacco con teletrasporto
		if(currentHealth < 10 ){
			isExplosion=true;
			mode = 2;
		}
	}
}

function Attack(){
	
}