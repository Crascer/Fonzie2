
#pragma strict

@script RequireComponent(CharacterController)
public var walkSpeed : float = 5.0;
var flySpeed : float = 7.0;
var jumpSpeed : float = 4.0;

public var maxHit : int = 3;
var currentHit : int;
private var isDeath : boolean = false;
public var distanceAttack : float = 3.0;
var recoveryDistance : float = 2.0;

private var player : Transform; //Posizione del player
public var detectionDistance : float = 4.0; //Distanza di rilevamento
private var realDistance : float;

private var moveDirection : Vector3 = Vector3.zero;
private var gravity : Vector3 = Vector3.zero;
private var controller : CharacterController;

var delay : float = 3;
var bullet : Transform;
var shooting : boolean = false;

var enemyDie : Transform;

enum EnemyType {Walking, Walking2, Flying, FireHead}

var Type : EnemyType;

function Start () {
	controller=GetComponent(CharacterController);
  	currentHit=maxHit;
 	player=GameObject.FindGameObjectWithTag("Player").transform;
}

function Update () {
	
	realDistance = Vector3.Distance(this.transform.position, player.transform.position);
	
	if(!isDeath){
		if(realDistance <= detectionDistance)
			switch(Type){
				case EnemyType.Walking:
					Attack_Walk();
				break;
				case EnemyType.Walking2:
					Attack_Walk2();
				break;			
				case EnemyType.Flying:
					Attack_Fly();
				break;
				case EnemyType.FireHead:
					transform.collider.enabled = false;
					if(!shooting)
						Attack_Head();
				break;
			}
	}else {
		Instantiate(enemyDie, transform.position, transform.rotation);
		Destroy(this.gameObject);
	}
	
}

function Hit(){
	currentHit--;
	if(currentHit <= 0)
		isDeath=true;
}

function Attack_Walk(){
	var anim = transform.GetComponent(aniSprite);
	if(!controller.isGrounded)
		gravity+=Physics.gravity * Time.deltaTime *1.5;
	
	moveDirection = (player.position-transform.position);
	moveDirection.x *=-1;
	moveDirection.Normalize();
	moveDirection.y=0;
	moveDirection.z=0;
	moveDirection = transform.TransformDirection(moveDirection);
	moveDirection *= walkSpeed;
	moveDirection += gravity;
	controller.Move(moveDirection * Time.deltaTime);
	if(moveDirection.x>0 || moveDirection.x<0){
		anim.aniSprite(3,1,0,0,3,7);
	}
	if(realDistance <= distanceAttack){
		//Animazione attacco + istanziazione oggetto usato per l'attacco
	}
}

function Attack_Walk2(){
	var anim = transform.GetComponent(aniSprite);
	if(!controller.isGrounded)
		gravity+=Physics.gravity * Time.deltaTime *1.5;
	
	moveDirection = (player.position-transform.position);
	moveDirection.x *=-1;
	moveDirection.Normalize();
	moveDirection.y=0;
	moveDirection.z=0;
	moveDirection = transform.TransformDirection(moveDirection);
	moveDirection *= walkSpeed;
	moveDirection += gravity;
	controller.Move(moveDirection * Time.deltaTime);
	if(moveDirection.x>0 || moveDirection.x<0){
		anim.aniSprite(3,1,0,0,3,7);
	}
	if(realDistance <= distanceAttack){
		//Animazione attacco + istanziazione oggetto usato per l'attacco
	}
}

function Attack_Fly(){
	var anim = transform.GetComponent(aniSprite);
	moveDirection = (player.position-transform.position);
	moveDirection.x *= -1;
	moveDirection.Normalize();
	moveDirection.z=0;
	moveDirection = transform.TransformDirection(moveDirection);
	moveDirection *= flySpeed;
	controller.Move(moveDirection * Time.deltaTime);
	if(moveDirection.x>0 || moveDirection.x<0){
		anim.aniSprite(3,1,0,0,3,7);
	}
	if(realDistance <= distanceAttack){
		//Animazione attacco + istanziazione oggetto usato per l'attacco
		if(realDistance < recoveryDistance){
			
		} else {
		controller.Move(moveDirection*-1 * Time.deltaTime);
		}
	}
}

function Attack_Head(){
	shooting = true;
	Instantiate(bullet, transform.position-Vector3(0,0,2), transform.rotation);
	yield WaitForSeconds(delay);
	shooting = false;
}

function OnControllerColliderHit(hit : ControllerColliderHit){
	switch(Type){
		case EnemyType.Walking:
			Debug.Log("" + hit.normal.x);
			 if(hit.normal.x <0 || hit.normal.x >0){
		   	if(controller.isGrounded)
		   		gravity.y = jumpSpeed;
		   
		   }
		  break;
		 
		case EnemyType.Flying:
			Debug.Log("Coll");
		break;
   }
   
   if(hit.transform.tag == "Bullet")
   		Hit();
}