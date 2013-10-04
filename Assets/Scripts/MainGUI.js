#pragma strict
var scrollPosition : Vector2;

function OnGUI(){

	//GUI.Window (0, Rect((Screen.width/2)-(Screen.width/3.5),0,Screen.width/2,Screen.height), SelectWindow, "Tragic Days: Fonzie's speed trip to Hell");
	//now adjust to the group. (0,0) is the topleft corner of the group.
	//GUILayout.BeginGroup (Rect (Screen.width/2-Screenwidth/4,0,Screen.width/4,Screen.height));
	GUILayout.BeginHorizontal();
	GUILayout.Space(Screen.width/5.5);
	GUILayout.BeginVertical();
	GUILayout.Space(Screen.width/5.5);
	if(GUILayout.Button("Start")){
		Application.LoadLevel(1);
	}
	GUILayout.Space(Screen.width/500);
	
	if(GUILayout.Button("Esci")){
		Application.Quit();
	}
	
	GUILayout.Space(Screen.width/2.7);
	GUILayout.Label("Team Captain/Music/Programming - Tommaso \"Jester\" Bello");
	GUILayout.Label("Music/Programming - Marco \"Overflow\" Ferraioli");
	GUILayout.Label("Art/Blood/Souls - Erika \"Asphodel\" Di Paolo");
	GUILayout.Label("This game was developed as part of Indie Speed Run 2013 (www.indiespeedrun.com).");
	
	GUILayout.EndVertical();
	//GUILayout.EndGroup ();
	GUILayout.EndHorizontal();
}