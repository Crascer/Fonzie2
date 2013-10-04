#pragma strict

function OnGUI(){
	GUI.Label(Rect(Screen.width/2-Screen.width/4, Screen.height/2-Screen.height/3, Screen.width/4, Screen.height/6),"HAI VINTO..... NERD!!!");
	
	if(GUI.Button(Rect(Screen.width/2-Screen.width/4, Screen.height/2-Screen.height/6, Screen.width/4, Screen.height/6), "Rigioca")){Application.LoadLevel("Arena");}
	if(GUI.Button(Rect(Screen.width/2-Screen.width/4, Screen.height-Screen.height/3, Screen.width/4, Screen.height/6), "Chiudi")){Application.Quit();}
}