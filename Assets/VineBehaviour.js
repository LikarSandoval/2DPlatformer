private var canClimb = false;
private var climbSpeed : float = 0.05;
private var playerObject : GameObject;
      
function Start () {    
	playerObject = gameObject.FindWithTag("player");
}
      
function OnTriggerEnter2D(collider : Collider2D){
	if(collider.tag.Equals("character")) {
		canClimb = true;
	}
}
      
function OnTriggerExit2D(collider : Collider2D){
	if(collider.tag.Equals("character")) {
		canClimb = false;
	}
}
     
function Update () {
	if(canClimb) {
		playerObject.GetComponentInParent(Rigidbody2D).gravityScale = 0;
		if(Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.UpArrow)) {
			playerObject.transform.Translate(Vector2(0, climbSpeed));
		}	
		
		if(Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.DownArrow)) {
			playerObject.transform.Translate(Vector2(0, -climbSpeed));
		}	
	} else {
		playerObject.GetComponentInParent(Rigidbody2D).gravityScale = 1;
	}
}