#pragma strict
 
/*La classe di base per il Player, divisione modulare di classi*/
 
@script RequireComponent(CharacterController)
 
//Engine Variables
private var controller : CharacterController;
private var move : Vector3 = Vector3.zero;
private var gravity : Vector3 = Vector3.zero;
 
//GamePlay Variables
var cash : int = 0;
private var cashLimit : int = 9999;
var maxHealth : float = 10;
private var curHealth : int;
private var dead : boolean = false;
var maxAmmo : int = 20;
var ammo : int = 0;
 
//Variables Movement
var walkSpeed = 3;
var jumpSpeed = 7;
var doubleSpeed = 5;
 
//Action Booleans
var talking : boolean = false;
var action : boolean = false;
var guiUpdate : boolean = false;
var shielded : boolean = false;
 
//Movement Booleans
private var idle : boolean;
private var jump : boolean;
private var doubleJump : boolean;
private var canDouble : boolean;
private var walk : boolean;
var inFlight : boolean;
var hit : boolean = false;

//Power Booleans
var isVinyl : boolean;
var isBazooka : boolean;
private var canShoot : boolean = true;
 
//Power Bullets
var vinylSockR : Transform;
var vinylSockL : Transform;
var vinylBullet : Transform;
var bazookaSocket : Transform;
var bazookaBullet: Transform;
 
//Power Setup
var shootSpeed : float = 1.0;
private var shootCounter : float;

//Shield
var boltShield : Transform;
var isShield : boolean = false;
var shieldTime : float = 4.0;

//Test direction
var lastDir : float = -1;
var fps : int = 10;

//Audio Clips
var walkSound : AudioClip;
var jumpSound : AudioClip;
var ouchSound : AudioClip;
var landSound : AudioClip;
 
function Start (){
        shootCounter = shootSpeed;
       lastDir = 1;
        curHealth = maxHealth;
        controller = transform.GetComponent(CharacterController);
}
 
function Update () {
		transform.position.z = 0; //Forzare la posizione Z
        if(!talking){       
                getState();
                //PlaySound();
               
               	if(isShield){
                	ShieldTime();
                	isShield = false;
                }
               
                //Movement
                //Prendo le assi
               if(!hit)
                	move = Vector3(Input.GetAxis("Horizontal")*-1, 0, 0);
                if(move.x != 0)
                	lastDir = move.x;
          			
            	
            	if(hit){
            		move = Vector3(2, 0, 0);
                }
                
                //Normalizzo in modo da avere sempre la stessa velocità
                move.Normalize();
                
                move = transform.TransformDirection(move);
                
                //Trasformo la direzione da spaziale a locale
                move *= walkSpeed; //Applico la velocità
                
                if(!controller.isGrounded){
                    if(doubleJump){
                    	gravity.y = doubleSpeed;
                    	doubleJump = false;
                    	Debug.Log("Double");
                    }
                    gravity += Physics.gravity * Time.deltaTime*2;
                       
                } else {
                	if(hit) hit = false;
                	//Questo previene il flickering dell'isGrounded.
                	gravity.y = -controller.stepOffset * Time.deltaTime;
                	
                	if(inFlight){
                		transform.audio.PlayOneShot(landSound,0.7);
                		inFlight = false;
                	}
                	
                        //Imposto il salto
                        if(jump){
                        	Debug.Log("Normal");
                                gravity.y = jumpSpeed;
                                jump = false;
                                inFlight = true;
                        }
                        jump = false;
                        canDouble = true;
                }
                
                //Muovo
                move += gravity;
                controller.Move(move * Time.deltaTime);
	}
}

function FixedUpdate(){
	//Anisprite
		var aniPlay = GetComponent(aniSprite);
	
	if(jump || move.y>=0){
		if(move.x>0 || lastDir<0){
					aniPlay.aniSprite(3,4,0,2,3,5);
		} else if(move.x <0 || lastDir>0) {
					aniPlay.aniSprite(3,4,0,3,3,5);
		}
	} else {
		if(lastDir<0){
					aniPlay.aniSprite(3,4,1,0,1,5);
		} else if(lastDir>0) {
					aniPlay.aniSprite(3,4,1,1,1,5);
		}
	}
}

function getState(){
 		
 		//Anisprite
		var aniPlay = GetComponent(aniSprite);
 		
        if(!Input.anyKey && !inFlight && !jump){
        	walk = false;
        	if(lastDir <0)aniPlay.aniSprite(3,4,1,0,1,fps);
        	else aniPlay.aniSprite(3,4,1,1,1,fps);
        }
       
     
		//PC Comandi
		if(Input.GetButtonDown("Jump")){
				
				if(controller.isGrounded){
				walk = false;
				jump = true;
				} else{
					 if(!doubleJump && canDouble && gravity.y<jumpSpeed/1.5){
					doubleJump = true;
					canDouble = false;
					}
				}
		}
				
		if(Input.GetButtonDown("Fire1") && canShoot){
			var aim : Vector3 = Vector3.zero;
			aim = Vector3(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"),0);
			canShoot = false;
			if(aim.x == 0){
				if(aim.y == 0)
					aim = Vector3(lastDir*-1, 0,0);
				else
					aim = Vector3(lastDir*-1, Input.GetAxis("Vertical"),0);
			}
			if(aim.x>0){
				var bul : Transform = Instantiate(vinylBullet, vinylSockR.position, vinylSockR.rotation);
				bul.GetComponent(Vinyl).move = aim;
				InvokeRepeating("ShootTime", 0, 0.5);
			}
			if(aim.x<0){
				var bul2 : Transform = Instantiate (vinylBullet, vinylSockL.position, vinylSockL.rotation);
				bul2.GetComponent(Vinyl).move = aim;
				InvokeRepeating("ShootTime", 0, 0.5);
			}
			//guiUpdate = true;
		}
				
		if(Input.GetAxis("Fire2") && isBazooka && canShoot){
			if(ammo>0){
				canShoot = false;
				ammo--;
				Instantiate (bazookaBullet, bazookaSocket.position, bazookaSocket.rotation);
				InvokeRepeating("ShootTime", 0, 0.5);
				}
			guiUpdate = true;
		}
				
		if(Input.GetAxis("Action"))
			guiUpdate = true;
			
        
		if(move.x != 0 && !jump && !inFlight){//se sono in movimento ma non corro
			 if(move.x>0){
				walk = true;
				aniPlay.aniSprite(3,4,0,0,3,fps);
        	} else {
				walk = true;
				aniPlay.aniSprite(3,4,0,1,3,fps);
        	}
        }else {
        	walk = false;	
        }
		
}
 
function PlaySound(){
       
        if((walk) && controller.isGrounded && !(audio.isPlaying)){
                audio.clip = walkSound;
                audio.Play();
        }       else if((!walk) && jump)transform.audio.PlayOneShot(jumpSound);
                else if((walk) && jump){
                	transform.audio.Stop();
                	transform.audio.PlayOneShot(jumpSound);}
                else if(!walk && !jump && controller.isGrounded) audio.Stop();
       
}
 
function ShootTime(){
        if(shootCounter <= 0){
                shootCounter = shootSpeed;
                canShoot = true;
                CancelInvoke();
        }
        shootCounter = shootCounter - 0.5;
}
 
function OnControllerColliderHit(hit: ControllerColliderHit){
   if(hit.normal.y == -1){
   	gravity.y = -jumpSpeed;
   }
   
   if(hit.transform.tag.Equals("BossBullet")){
   	Debug.Log("Colpo");
   	Destroy(hit.gameObject);
   }
}
 
function AddCash(sum : int){
        cash +=sum;
               
        if(cash>cashLimit){
                cash = cashLimit;
        }
        
        guiUpdate = true;
       
}

function ShieldTime(){
		var obj : Transform = Instantiate(boltShield, transform.position, transform.rotation);
		obj.parent = this.transform;
		shielded = true;
		yield WaitForSeconds(shieldTime);
		obj.transform.SendMessageUpwards("DestroySelf");
		shielded = false;
}
 
function AddAmmo(given : int){
        ammo += given;
        if(ammo > maxAmmo){
                ammo = maxAmmo;
        }
        
        guiUpdate = true;
       
}
 
function PlayerHit(damage : int){
	if(!shielded){
        curHealth -= damage;
        if(curHealth<=0) {
        	Death();
        }
        move = Vector3(0,1,-1);
        hit = true;
        transform.audio.PlayOneShot(ouchSound, 2);
    }
}
 
function Death(){
	if(!shielded){
       	transform.rotation.y = 180;
        Destroy(this.gameObject);
    }
}