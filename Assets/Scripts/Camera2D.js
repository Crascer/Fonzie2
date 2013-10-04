#pragma strict
var cameraTarget : Transform;

//Camera Variables
var smoothing : float = 0;

function Start () {

}

function Update () {

	if(cameraTarget){
			
			if(smoothing == 0){
				
				transform.position.x = cameraTarget.position.x;
				transform.position.y = cameraTarget.position.y;
			
			} else {
				
				transform.position.x = Mathf.Lerp(transform.position.x, cameraTarget.position.x, Time.deltaTime * smoothing);
				transform.position.y = Mathf.Lerp(transform.position.y, cameraTarget.position.y, Time.deltaTime * smoothing);
				
			}
		
		}
	
}