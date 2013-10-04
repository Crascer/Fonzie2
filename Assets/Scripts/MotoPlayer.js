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
 
//Action Booleans
var talking : boolean = false;
var action : boolean = false;
var guiUpdate : boolean = false;
var shielded : boolean = false;
 
//Movement Booleans
private var idle : boolean;
private var jump : boolean;
private var walk : boolean;
var inFlight : boolean;
var hit : boolean = false;

//Power Booleans
var isRocketBall : boolean;
var isAvalanche : boolean;
private var canShoot : boolean = true;
 
//Power Bullets
var rocketSock : Transform;
var rocketBullet : Transform;
var avalancheSocket : Transform;
var avalancheBullet: Transform;
 
//Power Setup
var shootSpeed : float = 1.0;
private var shootCounter : float;

//Shield
var boltShield : Transform;
var isShield : boolean = false;
var shieldTime : float = 4.0;
 
//Audio Clips
var walkSound : AudioClip;
var jumpSound : AudioClip;
var ouchSound : AudioClip;
var landSound : AudioClip;
 
function Start (){
        shootCounter = shootSpeed;
       
        curHealth = maxHealth;
        controller = transform.GetComponent(CharacterController);
}
 
function Update () {
       
        if(!talking){
       
                getState();
                //SSSPlaySound();
               
               	if(isShield){
                	ShieldTime();
                	isShield = false;
                }
               
                //Movement
                //Prendo le assi
               if(!hit)
                	move = Vector3(Input.GetAxis("Horizontal")*-1, 0, 0);
          
            	
            	if(hit){
            		move = Vector3(2, 0, 0);
                }
                
                if(transform.position.x >=7 && move.x <0){
                	move.x = 0;
                }
                if(transform.position.x <=-7 && move.x > 0){
                	move.x = 0;
                }
                
                //Normalizzo in modo da avere sempre la stessa velocità
                move.Normalize();
                
                move = transform.TransformDirection(move);
                
                //Trasformo la direzione da spaziale a locale
                move *= walkSpeed; //Applico la velocità
                
                if(!controller.isGrounded){
                    gravity += Physics.gravity * Time.deltaTime*1.5;
                                           
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
                                gravity.y = jumpSpeed;
                                jump = false;
                                inFlight = true;
                        }
                        jump = false;
                }
                
                //Muovo
                move += gravity;
                controller.Move(move * Time.deltaTime);
	}
}

function getState(){
		
		var aniPlay = GetComponent(aniSprite);
 
        if(!Input.anyKey && !inFlight && !jump){
        	walk = false;
        	aniPlay.aniSprite(3,2,0,0,1,12);
        }
       
     
		//PC Comandi
		if(Input.GetButtonDown("Jump") && controller.isGrounded){
				walk = false;
				jump = true;
				aniPlay.aniSprite(3,2,0,1,3,12);
		}
				
		if(Input.GetAxis("Fire1")  && isRocketBall && canShoot){
			if(ammo > 0){
				canShoot = false;
				ammo--;
				Instantiate (rocketBullet, rocketSock.position, rocketSock.rotation);
				InvokeRepeating("ShootTime", 0, 0.5);
				}
			guiUpdate = true;
		}
				
		if(Input.GetAxis("Fire2") && isAvalanche && canShoot){
			if(ammo>0){
				canShoot = false;
				ammo--;
				Instantiate (avalancheBullet, avalancheSocket.position, avalancheSocket.rotation);
				InvokeRepeating("ShootTime", 0, 0.5);
				}
			guiUpdate = true;
		}
				
		if(Input.GetAxis("Action"))
			guiUpdate = true;
			
        
		if(move.x != 0 && !jump && !inFlight){//se sono in movimento ma non corro
			 aniPlay.aniSprite(3,2,0,0,1,12);
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

function OnGUI(){
	GUI.Label(Rect(0,0,100,100), ""+move+" " + controller.velocity);
}