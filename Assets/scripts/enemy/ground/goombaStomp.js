#pragma strict
var animator : Animator;
var movement : movement;
var thisEnemy : GameObject;
var character : GameObject;
var top : GameObject;
var characterTransform : Transform;

function Update(){
	GetComponent.<Transform>().position.x = characterTransform.position.x;
	GetComponent.<Transform>().position.y = characterTransform.position.y;
}

function OnCollisionEnter2D(Collider: Collision2D) {
	if (Collider.gameObject.tag.Equals("player")){
		animator.SetBool('isDead', true);
		movement.isDead = true;
		Destroy(thisEnemy, 3);
		Destroy(character.GetComponent.<Collider2D>());
		Destroy(top.GetComponent.<Collider2D>());
	}
}