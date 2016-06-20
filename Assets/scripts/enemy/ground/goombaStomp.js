#pragma strict
var animator : Animator;
var movement : movement;
var thisEnemy : GameObject;
var character : GameObject;
var top : GameObject;

function OnCollisionEnter2D(Collider: Collision2D) {
	if (Collider.gameObject.tag.Equals("player")){
		animator.SetBool('isDead', true);
		movement.isDead = true;
		Destroy(thisEnemy, 3);
		Destroy(character.GetComponent.<Collider2D>());
		Destroy(top.GetComponent.<Collider2D>());
	}
}